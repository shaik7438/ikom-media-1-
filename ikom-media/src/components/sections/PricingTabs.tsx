import { useRef, useState, type KeyboardEvent } from "react";
import { Link } from "react-router";
import { MARKETING_NOTICE, MARKETING_PACKAGES, WEBSITE_NOTICE, WEBSITE_PACKAGES } from "../../data/packages";
import { PricingGrid, PricingNotice } from "./Pricing";

const TABS = [
  { id: "marketing", label: "Marketing packages" },
  { id: "website", label: "Website packages" },
] as const;

/** Accessible tabs (WAI-ARIA tabs pattern with arrow-key support). Both panels are in the HTML for crawlers. */
export function PricingTabs() {
  const [tab, setTab] = useState<(typeof TABS)[number]["id"]>("marketing");
  const refs = useRef<(HTMLButtonElement | null)[]>([]);

  const onKey = (e: KeyboardEvent, i: number) => {
    if (e.key !== "ArrowRight" && e.key !== "ArrowLeft" && e.key !== "Home" && e.key !== "End") return;
    e.preventDefault();
    let next = i;
    if (e.key === "ArrowRight") next = (i + 1) % TABS.length;
    if (e.key === "ArrowLeft") next = (i - 1 + TABS.length) % TABS.length;
    if (e.key === "Home") next = 0;
    if (e.key === "End") next = TABS.length - 1;
    setTab(TABS[next].id);
    refs.current[next]?.focus();
  };

  return (
    <div>
      <div
        role="tablist"
        aria-label="Package type"
        className="inline-flex rounded-full border border-line-strong bg-white/[0.03] p-1"
      >
        {TABS.map((t, i) => {
          const selected = tab === t.id;
          return (
            <button
              key={t.id}
              ref={(el) => {
                refs.current[i] = el;
              }}
              role="tab"
              id={`tab-${t.id}`}
              aria-selected={selected}
              aria-controls={`panel-${t.id}`}
              tabIndex={selected ? 0 : -1}
              onClick={() => setTab(t.id)}
              onKeyDown={(e) => onKey(e, i)}
              className={`min-h-11 rounded-full px-5 text-sm font-bold transition-colors ${
                selected ? "bg-electric text-white" : "text-muted hover:text-white"
              }`}
            >
              {t.label}
            </button>
          );
        })}
      </div>

      <div role="tabpanel" id="panel-marketing" aria-labelledby="tab-marketing" hidden={tab !== "marketing"} className="mt-10">
        <PricingGrid packages={MARKETING_PACKAGES} kind="marketing" />
        <PricingNotice>{MARKETING_NOTICE}</PricingNotice>
        <p className="mt-4 text-sm">
          Need Google Ads, SEO or extra creatives?{" "}
          <Link to="/packages/marketing#add-ons" className="text-link">
            See add-on services and pricing
          </Link>
          .
        </p>
      </div>
      <div role="tabpanel" id="panel-website" aria-labelledby="tab-website" hidden={tab !== "website"} className="mt-10">
        <PricingGrid packages={WEBSITE_PACKAGES} kind="website" />
        <PricingNotice>{WEBSITE_NOTICE}</PricingNotice>
        <p className="mt-4 text-sm">
          Looking for a landing page, e-commerce or maintenance?{" "}
          <Link to="/packages/website#add-ons" className="text-link">
            See add-on services and pricing
          </Link>
          .
        </p>
      </div>
    </div>
  );
}
