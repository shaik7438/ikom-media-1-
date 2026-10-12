import { StrictMode } from "react";
import { createRoot, hydrateRoot } from "react-dom/client";
import { BrowserRouter, MemoryRouter } from "react-router";
import { App } from "./App";
import { preloadRoute } from "./pages/registry";
import "./styles/index.css";

const container = document.getElementById("root")!;
/** Preview builds (VITE_PREVIEW=1) run inside a sandboxed frame, so routing stays in memory. */
const PREVIEW = import.meta.env.VITE_PREVIEW === "1";
const Router = PREVIEW ? MemoryRouter : BrowserRouter;
const app = (
  <StrictMode>
    <Router>
      <App />
    </Router>
  </StrictMode>
);

// Load the current page's code first so hydration matches the prerendered HTML exactly.
// Prerendered pages hydrate; the dev server (empty root) renders from scratch.
preloadRoute(PREVIEW ? "/" : window.location.pathname)
  .catch(() => undefined)
  .then(() => {
    if (container.firstElementChild) hydrateRoot(container, app);
    else createRoot(container).render(app);
  });
