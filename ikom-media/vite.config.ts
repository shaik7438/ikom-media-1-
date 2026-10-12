import { defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";

export default defineConfig({
  plugins: [react(), tailwindcss()],
  build: {
    target: "es2020",
    cssCodeSplit: true,
    sourcemap: false,
    manifest: true,
    chunkSizeWarningLimit: 900,
  },
  ssr: {
    // Bundle these into the SSR build so prerendering works without Node ESM resolution quirks.
    noExternal: ["react-router", "motion", "lucide-react"],
  },
});
