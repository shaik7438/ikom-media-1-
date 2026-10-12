import { Link } from "react-router";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { ConsultationButton, ButtonLink } from "../components/ButtonLink";
import { ServicesGrid } from "../components/sections/ServicesGrid";
import { ProcessTimeline } from "../components/sections/ProcessTimeline";
import { AddOnsTable } from "../components/sections/Pricing";
import { FinalCta } from "../components/sections/FinalCta";
import { getRouteMeta } from "../data/routes";

export default function Services() {
  return (
    <>
      <PageHero
        eyebrow="Services"
        title="Everything Your Brand Needs to Move Forward."
        intro="Social media, paid campaigns, content, websites, SEO and branding, planned together so every channel tells the same story."
        crumbs={getRouteMeta("/services").crumbs}
      >
        <div className="flex flex-col gap-3 xs:flex-row">
          <ConsultationButton location="services_hero" />
          <ButtonLink to="/packages/marketing" variant="secondary">
            View packages
          </ButtonLink>
        </div>
      </PageHero>

      <section className="section pt-0" aria-label="Our services">
        <div className="container-site">
          <ServicesGrid headingLevel="h2" />
        </div>
      </section>

      <section className="section bg-navy-900/60" aria-labelledby="svc-process-title">
        <div className="container-site">
          <SectionHeading id="svc-process-title" eyebrow="How we work" align="center" title="A Clear Process. A Smarter Way to Grow." />
          <div className="mt-14 md:mt-20">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      <section className="section" aria-labelledby="svc-addons-title">
        <div className="container-site">
          <SectionHeading
            id="svc-addons-title"
            eyebrow="Pricing"
            title="Packages and individual services"
            intro={
              <>
                Most clients start with a{" "}
                <Link to="/packages/marketing" className="text-link">
                  marketing package
                </Link>{" "}
                or a{" "}
                <Link to="/packages/website" className="text-link">
                  website package
                </Link>
                . These services are also available on their own and are billed separately.
              </>
            }
          />
          <div className="mt-12">
            <AddOnsTable />
          </div>
        </div>
      </section>

      <FinalCta location="services" />
    </>
  );
}
