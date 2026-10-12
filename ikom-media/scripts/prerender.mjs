/**
 * Prerenders every route to static HTML so content, titles, meta tags and structured data
 * are in the initial response for crawlers and for fast first paint.
 * Also writes sitemap.xml, robots.txt and 404.html.
 *
 * Runs after `vite build` (client) and `vite build --ssr` (server).
 */
import fs from "node:fs";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const dist = path.join(root, "dist");
const ssrEntry = path.join(root, "dist-ssr", "entry-server.js");

const template = fs.readFileSync(path.join(dist, "index.html"), "utf8");
const { render, ready, routes, SITE_URL, SITE_URL_CONFIGURED, absoluteUrl, pageFileFor } = await import(pathToFileURL(ssrEntry).href);
await ready;

if (!SITE_URL_CONFIGURED) {
  console.warn(
    "\n⚠  VITE_SITE_URL is not set. Canonical URLs, Open Graph URLs and sitemap.xml use the placeholder " +
      `"${SITE_URL}". Set VITE_SITE_URL to the confirmed production domain before deploying.\n`,
  );
}

// --- Preload hints -------------------------------------------------------
const manifest = JSON.parse(fs.readFileSync(path.join(dist, ".vite", "manifest.json"), "utf8"));
const entryKey = Object.keys(manifest).find((k) => manifest[k].isEntry);

/** All static JS chunks a module needs (excluding dynamic imports like the 3D scene). */
function chunksFor(key, seen = new Set()) {
  const m = manifest[key];
  if (!m || seen.has(key)) return seen;
  seen.add(key);
  for (const i of m.imports ?? []) chunksFor(i, seen);
  return seen;
}
const entryChunks = chunksFor(entryKey);

// Latin subsets of the two variable fonts are needed on every page.
const fonts = fs
  .readdirSync(path.join(dist, "assets"))
  .filter((f) => /^(inter|manrope)-latin-wght-normal-.*\.woff2$/.test(f))
  .map((f) => `<link rel="preload" href="/assets/${f}" as="font" type="font/woff2" crossorigin />`);

function preloadTags(url) {
  const pageKey = pageFileFor(url === "/404" ? "/__not-found__" : url);
  const files = [...chunksFor(pageKey)]
    .filter((k) => !entryChunks.has(k))
    .map((k) => manifest[k].file)
    .filter(Boolean);
  return [...fonts, ...files.map((f) => `<link rel="modulepreload" crossorigin href="/${f}" />`)].join("\n    ");
}

function page(url) {
  const { html, head: meta } = render(url);
  const head = `${meta}\n    ${preloadTags(url)}`;
  if (!template.includes("<!--app-html-->") || !template.includes("<!--head-->")) {
    throw new Error("index.html is missing the <!--head--> or <!--app-html--> placeholder");
  }
  return template.replace("<!--head-->", head).replace("<!--app-html-->", html);
}

let count = 0;
for (const r of routes) {
  const out = r.path === "/" ? path.join(dist, "index.html") : path.join(dist, r.path.slice(1), "index.html");
  fs.mkdirSync(path.dirname(out), { recursive: true });
  fs.writeFileSync(out, page(r.path));
  count++;
}

// 404 page (served by hosts for unknown URLs with a 404 status)
fs.writeFileSync(path.join(dist, "404.html"), page("/404"));

// sitemap.xml
const today = new Date().toISOString().slice(0, 10);
const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${routes
  .filter((r) => !r.noindex)
  .map(
    (r) => `  <url>
    <loc>${absoluteUrl(r.path)}</loc>
    <lastmod>${today}</lastmod>
    <changefreq>${r.changefreq ?? "monthly"}</changefreq>
    <priority>${(r.priority ?? 0.5).toFixed(1)}</priority>
  </url>`,
  )
  .join("\n")}
</urlset>
`;
fs.writeFileSync(path.join(dist, "sitemap.xml"), sitemap);

// robots.txt
fs.writeFileSync(
  path.join(dist, "robots.txt"),
  `User-agent: *
Allow: /
Disallow: /api/

Sitemap: ${SITE_URL}/sitemap.xml
`,
);

fs.rmSync(path.join(root, "dist-ssr"), { recursive: true, force: true });
fs.rmSync(path.join(dist, ".vite"), { recursive: true, force: true });
console.log(`✓ Prerendered ${count} routes + 404.html, wrote sitemap.xml and robots.txt`);
