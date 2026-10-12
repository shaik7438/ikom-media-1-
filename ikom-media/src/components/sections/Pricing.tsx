import { Check, Info } from "lucide-react";
import type { Package } from "../../data/packages";
import { ADD_ONS } from "../../data/packages";
import { ButtonLink } from "../ButtonLink";
import { Reveal } from "../Reveal";

type CardProps = {
  pkg: Package;
  kind: "marketing" | "website";
  index: number;
  headingLevel?: "h2" | "h3";
};

export function PricingCard({ pkg, kind, index, headingLevel = "h3" }: CardProps) {
  const H = headingLevel;
  const featured = pkg.recommended;
  const service = kind === "marketing" ? `${pkg.name} marketing package` : `${pkg.name} website package`;
  return (
    <Reveal delay={index * 90} className="h-full">
      <article
        className={`card relative flex h-full flex-col p-7 md:p-8 ${
          featured
            ? "border-bright/60 bg-[linear-gradient(180deg,rgb(52_59_255/0.22),rgb(17_23_71/0.55))] shadow-[0_30px_80px_-40px_rgb(52_59_255/0.8)]"
            : ""
        }`}
        aria-labelledby={`pkg-${kind}-${pkg.id}`}
      >
        {featured && (
          <p className="absolute -top-3.5 left-7 rounded-full bg-electric px-3.5 py-1 text-xs font-bold uppercase tracking-[0.1em] text-white md:left-8">
            Recommended
          </p>
        )}
        <H id={`pkg-${kind}-${pkg.id}`} className="font-display text-sm font-bold uppercase tracking-[0.14em] text-accent-text">
          {pkg.name}
        </H>
        <p className="mt-4 flex items-baseline gap-1 text-white">
          <span className="font-display text-[2.75rem] font-extrabold leading-none tracking-[-0.03em] tabular-nums">
            {pkg.price}
          </span>
          <span className="text-base font-medium text-muted">
            {pkg.suffix === "+" ? (
              <>
                <span aria-hidden="true">+</span>
                <span className="sr-only"> and up</span>
              </>
            ) : (
              pkg.suffix
            )}
          </span>
        </p>
        {kind === "website" && <p className="mt-1 text-xs text-subtle">Starting price</p>}
        {pkg.summary && <p className="mt-4 text-[0.9375rem]">{pkg.summary}</p>}

        <ButtonLink
          to={`/contact?service=${kind === "marketing" ? "marketing" : "website"}&package=${pkg.id}`}
          variant={featured ? "primary" : "secondary"}
          arrow
          className="mt-7 w-full"
          event="pricing_cta_click"
          eventParams={{ package: pkg.id, type: kind }}
          aria-label={`Enquire about the ${service}`}
        >
          Enquire about {pkg.name}
        </ButtonLink>

        <div className="mt-8 border-t border-line pt-6">
          <p className="text-xs font-bold uppercase tracking-[0.12em] text-white">What's included</p>
          <ul className="mt-4 space-y-3">
            {pkg.features.map((f) => (
              <li key={f} className="flex gap-3 text-[0.9375rem] leading-snug">
                <Check className="mt-0.5 size-4 shrink-0 text-accent-text" aria-hidden="true" />
                <span>{f}</span>
              </li>
            ))}
          </ul>
        </div>
      </article>
    </Reveal>
  );
}

export function PricingGrid({
  packages,
  kind,
  headingLevel,
}: {
  packages: Package[];
  kind: "marketing" | "website";
  headingLevel?: "h2" | "h3";
}) {
  return (
    <div className="grid items-stretch gap-6 pt-4 lg:grid-cols-3">
      {packages.map((p, i) => (
        <PricingCard key={p.id} pkg={p} kind={kind} index={i} headingLevel={headingLevel} />
      ))}
    </div>
  );
}

export function PricingNotice({ children }: { children: string }) {
  return (
    <p className="mt-8 flex gap-3 rounded-xl border border-line bg-white/[0.02] p-4 text-sm leading-relaxed md:p-5">
      <Info className="mt-0.5 size-4 shrink-0 text-accent-text" aria-hidden="true" />
      <span>{children}</span>
    </p>
  );
}

const GROUPS: { id: (typeof ADD_ONS)[number]["group"]; label: string }[] = [
  { id: "web", label: "Website" },
  { id: "marketing", label: "Search & ads" },
  { id: "creative", label: "Creative & content" },
  { id: "custom", label: "Custom projects" },
];

/** Optional services table. Clearly marked as billed separately from packages. */
export function AddOnsTable({ headingLevel = "h3" }: { headingLevel?: "h2" | "h3" }) {
  const H = headingLevel;
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
      {GROUPS.map((g) => (
        <div key={g.id} className="card p-6">
          <H className="text-sm font-bold uppercase tracking-[0.12em] text-accent-text">{g.label}</H>
          <dl className="mt-4 divide-y divide-line">
            {ADD_ONS.filter((a) => a.group === g.id).map((a) => (
              <div key={a.name} className="flex flex-col gap-0.5 py-3 first:pt-0 last:pb-0">
                <dt className="text-[0.9375rem] text-white">{a.name}</dt>
                <dd className="text-sm tabular-nums text-muted">{a.price}</dd>
              </div>
            ))}
          </dl>
        </div>
      ))}
    </div>
  );
}
