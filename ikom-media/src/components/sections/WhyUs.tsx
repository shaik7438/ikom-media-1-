import { WHY_US } from "../../data/content";
import { Reveal } from "../Reveal";

export function WhyUsGrid() {
  return (
    <ul className="grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-3">
      {WHY_US.map((p, i) => {
        const Icon = p.icon;
        return (
          <Reveal as="li" key={p.title} delay={(i % 3) * 80} className="border-t border-line pt-6">
            <Icon className="size-6 text-accent-text" aria-hidden="true" />
            <h3 className="mt-5 text-xl">{p.title}</h3>
            <p className="mt-2 text-[0.9375rem] leading-relaxed">{p.text}</p>
          </Reveal>
        );
      })}
    </ul>
  );
}
