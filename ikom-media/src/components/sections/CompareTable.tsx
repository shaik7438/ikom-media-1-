import { Check, Minus } from "lucide-react";

export type CompareRow = { label: string; values: (string | boolean)[] };

/** Package comparison. Scrolls horizontally inside its own container on small screens (never the page). */
export function CompareTable({ caption, columns, rows, highlight }: { caption: string; columns: string[]; rows: CompareRow[]; highlight?: number }) {
  return (
    <div className="overflow-x-auto rounded-[var(--radius-card)] border border-line" role="region" aria-label={caption} tabIndex={0}>
      <table className="w-full min-w-[40rem] border-collapse text-left text-[0.9375rem]">
        <caption className="sr-only">{caption}</caption>
        <thead>
          <tr className="border-b border-line bg-white/[0.02]">
            <th scope="col" className="p-4 font-semibold text-muted md:p-5">
              Feature
            </th>
            {columns.map((c, i) => (
              <th
                key={c}
                scope="col"
                className={`p-4 font-display text-base font-bold text-white md:p-5 ${i === highlight ? "bg-electric/15" : ""}`}
              >
                {c}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {rows.map((r) => (
            <tr key={r.label} className="border-b border-line last:border-0">
              <th scope="row" className="p-4 font-medium text-white md:p-5">
                {r.label}
              </th>
              {r.values.map((v, i) => (
                <td key={i} className={`p-4 md:p-5 ${i === highlight ? "bg-electric/[0.07]" : ""}`}>
                  {v === true ? (
                    <>
                      <Check className="size-4 text-accent-text" aria-hidden="true" />
                      <span className="sr-only">Included</span>
                    </>
                  ) : v === false ? (
                    <>
                      <Minus className="size-4 text-subtle" aria-hidden="true" />
                      <span className="sr-only">Not listed</span>
                    </>
                  ) : (
                    <span className="tabular-nums">{v}</span>
                  )}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}
