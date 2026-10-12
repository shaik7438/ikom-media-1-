import { useEffect, useRef, type ReactNode, type CSSProperties } from "react";

type Props = {
  as?: "div" | "li" | "section";
  children: ReactNode;
  className?: string;
  /** Delay in ms, for staggering siblings */
  delay?: number;
  id?: string;
};

/**
 * Fades content up when it scrolls into view.
 * Content is fully visible in the server HTML, without JS, and with reduced motion —
 * the hidden state only exists under `.js:not(.reduce-motion)` (see index.css).
 */
export function Reveal({ as = "div", children, className = "", delay = 0, id }: Props) {
  const ref = useRef<HTMLElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    if (!("IntersectionObserver" in window)) {
      el.classList.add("is-visible");
      return;
    }
    const io = new IntersectionObserver(
      (entries) => {
        for (const e of entries) {
          if (e.isIntersecting) {
            e.target.classList.add("is-visible");
            io.unobserve(e.target);
          }
        }
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.08 },
    );
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as "div";
  return (
    <Tag ref={ref as React.RefObject<HTMLDivElement>} id={id} className={`reveal ${className}`} style={{ "--reveal-delay": `${delay}ms` } as CSSProperties}>
      {children}
    </Tag>
  );
}
