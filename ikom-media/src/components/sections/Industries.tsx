import { INDUSTRIES } from "../../data/content";
import { Reveal } from "../Reveal";

export function IndustriesGrid() {
  return (
    <ul className="grid grid-cols-1 gap-px overflow-hidden rounded-[var(--radius-card)] border border-line-strong bg-line-strong shadow-[0_30px_80px_-50px_rgb(52_59_255/0.7)] xs:grid-cols-2 lg:grid-cols-4">
      {INDUSTRIES.map((ind, i) => {
        const Icon = ind.icon;
        return (
          <Reveal
            as="li"
            key={ind.name}
            delay={(i % 4) * 60}
            className="group flex items-center gap-4 bg-[linear-gradient(160deg,rgb(17_23_71/0.9),rgb(12_16_35))] p-6 transition-colors duration-300 hover:bg-[linear-gradient(160deg,rgb(26_33_96),rgb(17_23_71))] lg:flex-col lg:items-start lg:p-7"
          >
            <span className="inline-flex size-11 shrink-0 items-center justify-center rounded-xl border border-white/15 bg-gradient-to-br from-bright to-electric text-white shadow-[inset_0_1px_0_rgb(255_255_255/0.3),0_8px_20px_-8px_rgb(52_59_255/0.8)] transition-transform duration-300 group-hover:-translate-y-0.5">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <span className="font-display text-base font-semibold text-white lg:text-lg">{ind.name}</span>
          </Reveal>
        );
      })}
    </ul>
  );
}
