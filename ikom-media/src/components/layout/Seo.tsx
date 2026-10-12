import { useEffect } from "react";
import { useLocation } from "react-router";
import { getRouteMeta } from "../../data/routes";
import { OG_IMAGE, absoluteUrl, jsonLdString } from "../../lib/seo";
import { trackPageView } from "../../lib/analytics";

function setMeta(selector: string, attr: "name" | "property", key: string, content: string) {
  let el = document.head.querySelector<HTMLMetaElement>(selector);
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute(attr, key);
    document.head.appendChild(el);
  }
  el.content = content;
}

/**
 * Keeps <head> in sync during client-side navigation.
 * The initial HTML for every route is prerendered with the same values (scripts/prerender.mjs),
 * so crawlers never depend on this running.
 */
export function Seo() {
  const { pathname } = useLocation();

  useEffect(() => {
    const meta = getRouteMeta(pathname);
    document.title = meta.title;
    setMeta('meta[name="description"]', "name", "description", meta.description);
    setMeta('meta[property="og:title"]', "property", "og:title", meta.title);
    setMeta('meta[property="og:description"]', "property", "og:description", meta.description);
    setMeta('meta[property="og:url"]', "property", "og:url", absoluteUrl(meta.path));
    setMeta('meta[property="og:image"]', "property", "og:image", absoluteUrl(OG_IMAGE));
    setMeta('meta[name="twitter:title"]', "name", "twitter:title", meta.title);
    setMeta('meta[name="twitter:description"]', "name", "twitter:description", meta.description);

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    let robots = document.head.querySelector<HTMLMetaElement>('meta[name="robots"]');
    if (meta.noindex) {
      canonical?.remove();
      if (!robots) {
        robots = document.createElement("meta");
        robots.name = "robots";
        document.head.appendChild(robots);
      }
      robots.content = "noindex, follow";
    } else {
      robots?.remove();
      if (!canonical) {
        canonical = document.createElement("link");
        canonical.rel = "canonical";
        document.head.appendChild(canonical);
      }
      canonical.href = absoluteUrl(meta.path);
    }

    const ld = jsonLdString(meta);
    let script = document.getElementById("ld-json") as HTMLScriptElement | null;
    if (ld) {
      if (!script) {
        script = document.createElement("script");
        script.type = "application/ld+json";
        script.id = "ld-json";
        document.head.appendChild(script);
      }
      script.textContent = ld;
    } else {
      script?.remove();
    }

    trackPageView(pathname);
  }, [pathname]);

  return null;
}
