import { ArrowRight } from "lucide-react";
import { BRAND } from "../../data/site";
import { Reveal } from "../Reveal";

/** Strategy → Creativity → Performance → Growth */
export function PhilosophyFlow() {
  return (
    <Reveal>
      <p className="sr-only">Our philosophy: {BRAND.philosophy.join(", then ")}.</p>
      <ol aria-hidden="true" className="grid grid-cols-2 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line md:grid-cols-4">
        {BRAND.philosophy.map((step, i) => (
          <li key={step} className="relative flex items-center justify-between gap-3 bg-navy-950 px-6 py-7 md:px-8 md:py-9">
            <span>
              <span className="block font-display text-xs font-bold tabular-nums text-accent-text">0{i + 1}</span>
              <span className="mt-1 block font-display text-xl font-bold text-white md:text-2xl">{step}</span>
            </span>
            {i < BRAND.philosophy.length - 1 && <ArrowRight className="hidden size-5 text-subtle md:block" />}
          </li>
        ))}
      </ol>
    </Reveal>
  );
}
