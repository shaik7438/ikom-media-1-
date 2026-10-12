import { PROCESS } from "../../data/content";
import { Reveal } from "../Reveal";

/** Five-step process. A plain ordered list — fully readable with animations disabled. */
export function ProcessTimeline() {
  return (
    <ol className="relative grid gap-4 md:grid-cols-5 md:gap-0">
      {/* Connector line (desktop) */}
      <span
        aria-hidden="true"
        className="absolute left-0 right-0 top-7 hidden h-px bg-gradient-to-r from-transparent via-line-strong to-transparent md:block"
      />
      {/* Connector line (mobile) */}
      <span aria-hidden="true" className="absolute bottom-6 left-7 top-6 w-px bg-line-strong md:hidden" />
      {PROCESS.map((step, i) => {
        const Icon = step.icon;
        return (
          <Reveal as="li" key={step.n} delay={i * 90} className="relative flex gap-5 md:block md:px-4 md:text-center">
            <span className="relative z-10 inline-flex size-14 shrink-0 items-center justify-center rounded-full border border-line-strong bg-navy-900 text-accent-text shadow-[0_0_0_6px_var(--color-navy-950)] md:mx-auto">
              <Icon className="size-5" aria-hidden="true" />
            </span>
            <div className="pt-1 md:pt-0">
              <p className="font-display text-sm font-bold tabular-nums text-accent-text md:mt-6" aria-hidden="true">
                {step.n}
              </p>
              <h3 className="mt-1 text-xl text-white">
                <span className="sr-only">Step {Number(step.n)}: </span>
                {step.title}
              </h3>
              <p className="mt-2 text-[0.9375rem] leading-relaxed text-white md:mx-auto md:max-w-[14rem]">{step.text}</p>
            </div>
          </Reveal>
        );
      })}
    </ol>
  );
}
