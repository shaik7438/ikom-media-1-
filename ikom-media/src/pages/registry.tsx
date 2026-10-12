import { lazy, type ComponentType } from "react";
import { matchPath } from "react-router";
import { SERVICES } from "../data/services";

type Loader = () => Promise<{ default: ComponentType<any> }>;

/**
 * Route-level code splitting that still prerenders and hydrates cleanly:
 * - On the server, `preloadAll()` resolves every page before rendering, so HTML is complete.
 * - In the browser, `preloadRoute(location)` resolves the current page *before* hydration,
 *   so the first render matches the server HTML. Other pages load on navigation.
 */
function page(loader: Loader) {
  let Resolved: ComponentType<any> | null = null;
  const Lazy = lazy(loader);
  const load = () =>
    loader().then((m) => {
      Resolved = m.default;
    });
  function Page(props: Record<string, unknown>) {
    const C = Resolved ?? Lazy;
    return <C {...props} />;
  }
  Page.load = load;
  return Page;
}

export const Pages = {
  Home: page(() => import("./Home")),
  About: page(() => import("./About")),
  Services: page(() => import("./Services")),
  Service: page(() => import("./ServicePage")),
  Portfolio: page(() => import("./Portfolio")),
  MarketingPackages: page(() => import("./Packages").then((m) => ({ default: m.MarketingPackages }))),
  WebsitePackages: page(() => import("./Packages").then((m) => ({ default: m.WebsitePackages }))),
  Contact: page(() => import("./Contact")),
  Privacy: page(() => import("./Privacy")),
  NotFound: page(() => import("./NotFound")),
};

const ROUTE_PAGES: [string, keyof typeof Pages][] = [
  ["/", "Home"],
  ["/about", "About"],
  ["/services", "Services"],
  ...SERVICES.map((s) => [s.path, "Service"] as [string, keyof typeof Pages]),
  ["/portfolio", "Portfolio"],
  ["/packages/marketing", "MarketingPackages"],
  ["/packages/website", "WebsitePackages"],
  ["/contact", "Contact"],
  ["/privacy-policy", "Privacy"],
];

const PAGE_FILES: Record<keyof typeof Pages, string> = {
  Home: "src/pages/Home.tsx",
  About: "src/pages/About.tsx",
  Services: "src/pages/Services.tsx",
  Service: "src/pages/ServicePage.tsx",
  Portfolio: "src/pages/Portfolio.tsx",
  MarketingPackages: "src/pages/Packages.tsx",
  WebsitePackages: "src/pages/Packages.tsx",
  Contact: "src/pages/Contact.tsx",
  Privacy: "src/pages/Privacy.tsx",
  NotFound: "src/pages/NotFound.tsx",
};

const pageFor = (pathname: string) =>
  ROUTE_PAGES.find(([p]) => matchPath({ path: p, end: true }, pathname))?.[1] ?? "NotFound";

/** Source file of the page for a path — used at build time to add modulepreload hints. */
export const pageFileFor = (pathname: string) => PAGE_FILES[pageFor(pathname)];

export function preloadRoute(pathname: string) {
  return Pages[pageFor(pathname)].load();
}

export function preloadAll() {
  return Promise.all(Object.values(Pages).map((p) => p.load()));
}
