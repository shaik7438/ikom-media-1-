import { Suspense } from "react";
import { Route, Routes } from "react-router";
import { Layout } from "./components/layout/Layout";
import { MotionProvider } from "./lib/motion";
import { Pages } from "./pages/registry";
import { SERVICES } from "./data/services";

/** Shown only while a not-yet-loaded page's code downloads during client navigation. */
function PageLoading() {
  return (
    <div className="flex min-h-[70vh] items-center justify-center pt-24" role="status">
      <span className="size-8 animate-spin rounded-full border-2 border-line-strong border-t-bright" aria-hidden="true" />
      <span className="sr-only">Loading page…</span>
    </div>
  );
}

export function App() {
  return (
    <MotionProvider>
      <Layout>
        <Suspense fallback={<PageLoading />}>
          <Routes>
            <Route path="/" element={<Pages.Home />} />
            <Route path="/about" element={<Pages.About />} />
            <Route path="/services" element={<Pages.Services />} />
            {SERVICES.map((s) => (
              <Route key={s.slug} path={s.path} element={<Pages.Service slug={s.slug} />} />
            ))}
            <Route path="/portfolio" element={<Pages.Portfolio />} />
            <Route path="/packages/marketing" element={<Pages.MarketingPackages />} />
            <Route path="/packages/website" element={<Pages.WebsitePackages />} />
            <Route path="/contact" element={<Pages.Contact />} />
            <Route path="/privacy-policy" element={<Pages.Privacy />} />
            <Route path="*" element={<Pages.NotFound />} />
          </Routes>
        </Suspense>
      </Layout>
    </MotionProvider>
  );
}
