import { createContext, useCallback, useContext, useEffect, useMemo, useState, type ReactNode } from "react";
import { LazyMotion, MotionConfig } from "motion/react";

const loadFeatures = () => import("./motion-features").then((m) => m.default);

const STORAGE_KEY = "ikom-motion";

type MotionCtx = {
  /** True when the OS prefers reduced motion OR the visitor turned motion off on this site */
  reduced: boolean;
  /** True only when the visitor used the on-site toggle */
  userReduced: boolean;
  toggle: () => void;
};

const Ctx = createContext<MotionCtx>({ reduced: false, userReduced: false, toggle: () => {} });

export function MotionProvider({ children }: { children: ReactNode }) {
  // Start with "not reduced" on both server and first client render so hydration matches.
  const [osReduced, setOsReduced] = useState(false);
  const [userReduced, setUserReduced] = useState(false);

  useEffect(() => {
    const mq = window.matchMedia("(prefers-reduced-motion: reduce)");
    setOsReduced(mq.matches);
    const onChange = () => setOsReduced(mq.matches);
    mq.addEventListener("change", onChange);
    try {
      setUserReduced(localStorage.getItem(STORAGE_KEY) === "reduced");
    } catch {
      /* ignore */
    }
    return () => mq.removeEventListener("change", onChange);
  }, []);

  const toggle = useCallback(() => {
    setUserReduced((prev) => {
      const next = !prev;
      try {
        if (next) localStorage.setItem(STORAGE_KEY, "reduced");
        else localStorage.removeItem(STORAGE_KEY);
      } catch {
        /* ignore */
      }
      document.documentElement.classList.toggle("reduce-motion", next);
      return next;
    });
  }, []);

  const reduced = osReduced || userReduced;
  const value = useMemo(() => ({ reduced, userReduced, toggle }), [reduced, userReduced, toggle]);

  return (
    <Ctx.Provider value={value}>
      <LazyMotion features={loadFeatures} strict>
        <MotionConfig reducedMotion={userReduced ? "always" : "user"}>{children}</MotionConfig>
      </LazyMotion>
    </Ctx.Provider>
  );
}

export const useMotionPref = () => useContext(Ctx);
