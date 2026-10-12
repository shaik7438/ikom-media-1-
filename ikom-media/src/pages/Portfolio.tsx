import { Info } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { PortfolioGrid } from "../components/portfolio/PortfolioGrid";
import { FinalCta } from "../components/sections/FinalCta";
import { getRouteMeta } from "../data/routes";

export default function Portfolio() {
  return (
    <>
      <PageHero
        eyebrow="Portfolio"
        title="Ideas in Action. Strategy in Practice."
        intro="A look at how we approach briefs across social media, branding, websites, campaigns and video."
        crumbs={getRouteMeta("/portfolio").crumbs}
      >
        <p className="flex max-w-2xl gap-3 rounded-xl border border-line bg-white/[0.02] p-4 text-sm">
          <Info className="mt-0.5 size-4 shrink-0 text-accent-text" aria-hidden="true" />
          <span>
            Projects marked <strong className="text-white">Creative Concept</strong> or{" "}
            <strong className="text-white">Demo Project</strong> are illustrative work created to show our approach. They
            are not client engagements and include no client results.
          </span>
        </p>
      </PageHero>

      <section className="section pt-0" aria-label="Projects">
        <div className="container-site">
          <PortfolioGrid headingLevel="h2" />
        </div>
      </section>

      <FinalCta
        location="portfolio"
        title="Have a Project in Mind?"
        text="Tell us what you're working on and we'll suggest the right mix of strategy, content, campaigns and web."
      />
    </>
  );
}
