import { lazy, Suspense, useEffect, useRef, useState } from "react";
import { HeroFallback } from "./HeroFallback";
import { useMotionPref } from "../../lib/motion";

const HeroScene = lazy(() => import("./HeroScene"));

function supportsWebGL() {
  try {
    const c = document.createElement("canvas");
    return Boolean(c.getContext("webgl2") || c.getContext("webgl"));
  } catch {
    return false;
  }
}

/** Decide whether this device should get the 3D scene at all. */
function canRun3D() {
  const nav = navigator as Navigator & { connection?: { saveData?: boolean }; deviceMemory?: number };
  if (nav.connection?.saveData) return false;
  if (typeof nav.deviceMemory === "number" && nav.deviceMemory < 4) return false;
  if (typeof nav.hardwareConcurrency === "number" && nav.hardwareConcurrency < 4) return false;
  return supportsWebGL();
}

/**
 * Hero visual: static CSS/SVG composition first (server-rendered, zero JS),
 * then the Three.js scene is fetched after the page is idle and crossfaded in.
 * Never blocks the headline, navigation or CTAs.
 */
export function HeroVisual() {
  const { reduced } = useMotionPref();
  const wrap = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [ready, setReady] = useState(false);
  const [visible, setVisible] = useState(true);
  const [lite, setLite] = useState(false);

  useEffect(() => {
    if (reduced || !canRun3D()) {
      setEnabled(false);
      setReady(false);
      return;
    }
    setLite(window.matchMedia("(max-width: 767px)").matches);
    const start = () => setEnabled(true);
    if ("requestIdleCallback" in window) {
      const handle = window.requestIdleCallback(start, { timeout: 2500 });
      return () => window.cancelIdleCallback(handle);
    }
    const handle = globalThis.setTimeout(start, 1200);
    return () => globalThis.clearTimeout(handle);
  }, [reduced]);

  // Pause the render loop when the hero scrolls out of view
  useEffect(() => {
    const el = wrap.current;
    if (!el || !enabled) return;
    const io = new IntersectionObserver(([e]) => setVisible(e.isIntersecting), { threshold: 0 });
    io.observe(el);
    return () => io.disconnect();
  }, [enabled]);

  return (
    <div ref={wrap} className="relative h-full w-full">
      <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-0" : "opacity-100"}`}>
        <HeroFallback animate={!reduced} />
      </div>
      {enabled && (
        <div className={`absolute inset-0 transition-opacity duration-1000 ${ready ? "opacity-100" : "opacity-0"}`}>
          <Suspense fallback={null}>
            <HeroScene lite={lite} paused={!visible} onReady={() => setReady(true)} />
          </Suspense>
        </div>
      )}
    </div>
  );
}
