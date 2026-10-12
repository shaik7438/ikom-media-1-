import { Link } from "react-router";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { ConsultationButton } from "../components/ButtonLink";
import { AddOnsTable, PricingGrid, PricingNotice } from "../components/sections/Pricing";
import { CompareTable, type CompareRow } from "../components/sections/CompareTable";
import { FaqList } from "../components/sections/FaqList";
import { FinalCta } from "../components/sections/FinalCta";
import { MARKETING_NOTICE, MARKETING_PACKAGES, WEBSITE_NOTICE, WEBSITE_PACKAGES } from "../data/packages";
import { getRouteMeta } from "../data/routes";

/* Comparison rows are derived strictly from each package's listed inclusions. */
const MARKETING_ROWS: CompareRow[] = [
  { label: "Social media platforms", values: ["2", "2", "3"] },
  { label: "Static/carousel posts per month", values: ["4", "12", "16"] },
  { label: "Reels per month", values: ["4", "8", "12"] },
  { label: "Stories per month", values: ["4", "8", "15"] },
  { label: "Reel editing", values: [false, "Professional", "Advanced"] },
  { label: "Content strategy", values: [false, true, true] },
  { label: "Community management", values: [false, true, "Full"] },
  { label: "Competitor analysis", values: [false, "Competitor", "Competitor and market"] },
  { label: "Meta Ads campaigns", values: ["Up to 2", "Up to 4", "6–8"] },
  { label: "Ad optimization", values: [true, true, "Continuous"] },
  { label: "Monthly strategy consultation", values: [false, false, true] },
  { label: "Reporting", values: ["Monthly performance report", "Detailed monthly report", "Monthly strategy and performance report"] },
];

const WEBSITE_ROWS: CompareRow[] = [
  { label: "Pages", values: ["Up to 5", "Up to 10", "15+"] },
  { label: "Design", values: ["Custom UI design", "Premium custom design", "Premium custom UI/UX"] },
  { label: "Custom animations and interactions", values: [false, false, true] },
  { label: "Enquiry forms", values: ["Contact form", "Contact and enquiry forms", "Multiple enquiry forms"] },
  { label: "WhatsApp and Google Maps integration", values: [true, true, true] },
  { label: "SEO", values: ["Basic SEO setup", "Basic on-page SEO", "Advanced SEO setup"] },
  { label: "Google Analytics and Search Console", values: ["Basic website analytics", true, true] },
  { label: "Blog", values: [false, "Blog section", "Blog/CMS integration"] },
  { label: "Testimonials and reviews section", values: [false, true, true] },
  { label: "Portfolio/project showcase", values: [false, false, true] },
  { label: "Revision rounds", values: [false, "1", "3"] },
  { label: "Support", values: ["1 month (basic)", "3 months", "6 months"] },
];

const MARKETING_FAQ = [
  {
    q: "Is advertising spend included?",
    a: "No. Package fees cover management. Advertising spend is separate and billed at actuals.",
  },
  {
    q: "Is there a minimum commitment?",
    a: "Yes. Marketing retainers require a minimum three-month commitment.",
  },
  {
    q: "Can I add Google Ads or SEO to a package?",
    a: "Yes. Google Ads management (from ₹5,000/month) and SEO (from ₹5,000/month) are available as separate services alongside any package.",
  },
  {
    q: "Which package should I choose?",
    a: "Starter suits brands building a professional presence. Growth adds more content, content strategy, community management and competitor analysis. Scale adds a third platform, the highest volume and a monthly strategy consultation. We can recommend one during a free consultation.",
  },
];

const WEBSITE_FAQ = [
  {
    q: "Why do prices say “+”?",
    a: "Listed prices are starting prices. The final quote depends on page count, integrations, content requirements and project complexity.",
  },
  {
    q: "Do you write the website content?",
    a: "Professional copywriting is available from ₹2,500. You can also supply your own content.",
  },
  {
    q: "Can I add pages later?",
    a: "Yes. Extra pages are ₹1,000 per page.",
  },
  {
    q: "Do you build online stores?",
    a: "Yes. E-commerce websites start at ₹39,999.",
  },
];

export function MarketingPackages() {
  return (
    <>
      <PageHero
        eyebrow="Marketing packages"
        title="Packages Built Around How Much Growth You Need."
        intro="Monthly social media and Meta Ads retainers, from building a professional presence to scaling content and campaigns."
        crumbs={getRouteMeta("/packages/marketing").crumbs}
      >
        <p className="text-sm">
          Looking for a website instead?{" "}
          <Link to="/packages/website" className="text-link">
            Compare website packages
          </Link>
        </p>
      </PageHero>

      <section className="section pt-0" aria-label="Marketing packages">
        <div className="container-site">
          <PricingGrid packages={MARKETING_PACKAGES} kind="marketing" headingLevel="h2" />
          <PricingNotice>{MARKETING_NOTICE}</PricingNotice>
        </div>
      </section>

      <section className="section bg-navy-900/60" aria-labelledby="mk-compare">
        <div className="container-site">
          <SectionHeading id="mk-compare" eyebrow="Compare" title="How the packages differ" />
          <div className="mt-10">
            <CompareTable caption="Marketing package comparison" columns={["Starter", "Growth", "Scale"]} rows={MARKETING_ROWS} highlight={1} />
          </div>
          <p className="mt-4 text-sm text-subtle">Full inclusions are listed on each package card above.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="add-ons-title" id="add-ons">
        <div className="container-site">
          <SectionHeading
            id="add-ons-title"
            eyebrow="Add-ons"
            title="Other services"
            intro="Optional services, billed separately. They are not included in a package unless listed in that package."
          />
          <div className="mt-12">
            <AddOnsTable />
          </div>
        </div>
      </section>

      <section className="section border-t border-line" aria-labelledby="mk-faq">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="mk-faq" eyebrow="FAQ" title="Package questions" />
            <div className="mt-8">
              <ConsultationButton location="marketing_packages_faq">Help me choose</ConsultationButton>
            </div>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={MARKETING_FAQ} />
          </div>
        </div>
      </section>

      <FinalCta location="marketing_packages" />
    </>
  );
}

export function WebsitePackages() {
  return (
    <>
      <PageHero
        eyebrow="Website packages"
        title="Website Packages for Every Stage of Your Business."
        intro="Custom-designed, responsive websites with enquiry forms, WhatsApp integration and SEO foundations built in."
        crumbs={getRouteMeta("/packages/website").crumbs}
      >
        <p className="text-sm">
          Looking for social media and ads?{" "}
          <Link to="/packages/marketing" className="text-link">
            Compare marketing packages
          </Link>
        </p>
      </PageHero>

      <section className="section pt-0" aria-label="Website packages">
        <div className="container-site">
          <PricingGrid packages={WEBSITE_PACKAGES} kind="website" headingLevel="h2" />
          <PricingNotice>{WEBSITE_NOTICE}</PricingNotice>
        </div>
      </section>

      <section className="section bg-navy-900/60" aria-labelledby="web-compare">
        <div className="container-site">
          <SectionHeading id="web-compare" eyebrow="Compare" title="How the packages differ" />
          <div className="mt-10">
            <CompareTable caption="Website package comparison" columns={["Basic", "Silver", "Gold"]} rows={WEBSITE_ROWS} />
          </div>
          <p className="mt-4 text-sm text-subtle">Full inclusions are listed on each package card above.</p>
        </div>
      </section>

      <section className="section" aria-labelledby="web-add-ons-title" id="add-ons">
        <div className="container-site">
          <SectionHeading
            id="web-add-ons-title"
            eyebrow="Add-ons"
            title="Other services"
            intro="Optional services, billed separately. They are not included in a package unless listed in that package."
          />
          <div className="mt-12">
            <AddOnsTable />
          </div>
        </div>
      </section>

      <section className="section border-t border-line" aria-labelledby="web-faq">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="web-faq" eyebrow="FAQ" title="Website questions" />
            <div className="mt-8">
              <ConsultationButton location="website_packages_faq">Discuss your website</ConsultationButton>
            </div>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={WEBSITE_FAQ} />
          </div>
        </div>
      </section>

      <FinalCta location="website_packages" />
    </>
  );
}
