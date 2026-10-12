import { StrictMode } from "react";
import { renderToString } from "react-dom/server";
import { StaticRouter } from "react-router";
import { App } from "./App";
import { preloadAll, pageFileFor } from "./pages/registry";
import { ROUTES, NOT_FOUND_META, getRouteMeta, type RouteMeta } from "./data/routes";
import { headTags, absoluteUrl } from "./lib/seo";
import { SITE_URL, SITE_URL_CONFIGURED } from "./data/site";

/** Resolve every lazily-split page so renderToString produces full HTML. */
export const ready = preloadAll();

/** Render one route to HTML + head tags. Used by scripts/prerender.mjs at build time. */
export function render(url: string) {
  const html = renderToString(
    <StrictMode>
      <StaticRouter location={url}>
        <App />
      </StaticRouter>
    </StrictMode>,
  );
  const meta = url === "/404" ? NOT_FOUND_META : getRouteMeta(url);
  return { html, head: headTags(meta) };
}

export const routes: RouteMeta[] = ROUTES;
export { absoluteUrl, SITE_URL, SITE_URL_CONFIGURED, pageFileFor };
