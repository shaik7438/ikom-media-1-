import { Plus } from "lucide-react";

/**
 * FAQ built on native <details>/<summary>: keyboard and screen-reader accessible,
 * crawlable, and works without JavaScript.
 */
export function FaqList({ items, headingLevel = "h3" }: { items: { q: string; a: string }[]; headingLevel?: "h3" | "h4" }) {
  const H = headingLevel;
  return (
    <div className="divide-y divide-line border-y border-line">
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex min-h-16 cursor-pointer list-none items-center justify-between gap-6 py-5 text-left [&::-webkit-details-marker]:hidden">
            <H className="font-display text-lg font-semibold text-white md:text-xl">{f.q}</H>
            <span className="inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line-strong text-accent-text transition-transform duration-300 group-open:rotate-45">
              <Plus className="size-4" aria-hidden="true" />
            </span>
          </summary>
          <p className="max-w-3xl pb-6 pr-12 leading-relaxed">{f.a}</p>
        </details>
      ))}
    </div>
  );
}
