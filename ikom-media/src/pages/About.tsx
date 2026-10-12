import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { ConsultationButton, ButtonLink } from "../components/ButtonLink";
import { PhilosophyFlow } from "../components/sections/PhilosophyFlow";
import { WhyUsGrid } from "../components/sections/WhyUs";
import { ProcessTimeline } from "../components/sections/ProcessTimeline";
import { IndustriesGrid } from "../components/sections/Industries";
import { FinalCta } from "../components/sections/FinalCta";
import { BRAND } from "../data/site";
import { SERVICES } from "../data/services";
import { getRouteMeta } from "../data/routes";
import { Link } from "react-router";

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About us"
        title="Your Vision. Our Strategy. Better Digital Possibilities."
        intro="IKom Media is a digital marketing and creative agency helping businesses build recognizable brands, communicate their value and connect with the right audience."
        crumbs={getRouteMeta("/about").crumbs}
      >
        <div className="flex flex-col gap-3 xs:flex-row">
          <ConsultationButton location="about_hero" />
          <ButtonLink to="/services" variant="secondary">
            Explore Our Services
          </ButtonLink>
        </div>
      </PageHero>

      <section className="section pt-0" aria-labelledby="who-title">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <SectionHeading id="who-title" eyebrow="Who we are" title="We Don't Just Manage Social Media. We Build Brands That Get Noticed." />
          </div>
          <Reveal className="space-y-5 text-lead lg:col-span-7 lg:pt-12" delay={100}>
            <p>
              We combine strategic thinking, creative storytelling, performance marketing and web experiences to help
              brands move beyond simply being online.
            </p>
            <p>
              From building your brand identity to managing campaigns and developing conversion-focused websites, we
              create digital solutions around your business goals.
            </p>
            <p>{BRAND.supporting}</p>
          </Reveal>
        </div>
      </section>

      <section className="section border-t border-line" aria-labelledby="philosophy-title">
        <div className="container-site">
          <SectionHeading
            id="philosophy-title"
            eyebrow="Our philosophy"
            title="Strategy, then creativity, then performance, then growth."
            intro="Good marketing follows a sequence. We understand the goal before designing anything, make creative work that serves that goal, measure how it performs and use what we learn to grow."
          />
          <div className="mt-12">
            <PhilosophyFlow />
          </div>
        </div>
      </section>

      <section className="section bg-navy-900/60" aria-labelledby="what-title">
        <div className="container-site">
          <SectionHeading id="what-title" eyebrow="What we do" title="Connected services, one team." />
          <ul className="mt-12 grid gap-px overflow-hidden rounded-[var(--radius-card)] border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.map((s) => {
              const Icon = s.icon;
              return (
                <li key={s.slug} className="bg-navy-950">
                  <Link to={s.path} className="group flex h-full flex-col gap-4 p-7 transition-colors hover:bg-navy-900">
                    <Icon className="size-6 text-accent-text" aria-hidden="true" />
                    <h3 className="text-xl transition-colors group-hover:text-accent-text">{s.title}</h3>
                    <p className="text-[0.9375rem]">{s.description}</p>
                  </Link>
                </li>
              );
            })}
          </ul>
        </div>
      </section>

      <section className="section" aria-labelledby="values-title">
        <div className="container-site">
          <SectionHeading id="values-title" eyebrow="How we partner" title="More Than Deliverables. A Partner in Your Digital Journey." />
          <div className="mt-14">
            <WhyUsGrid />
          </div>
        </div>
      </section>

      <section className="section border-t border-line" aria-labelledby="about-process-title">
        <div className="container-site">
          <SectionHeading id="about-process-title" eyebrow="Our process" align="center" title="A Clear Process. A Smarter Way to Grow." />
          <div className="mt-14 md:mt-20">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      <section className="section border-t border-line" aria-labelledby="about-industries-title">
        <div className="container-site">
          <SectionHeading
            id="about-industries-title"
            eyebrow="Industries"
            title="Different Industries. Different Challenges. Tailored Digital Solutions."
          />
          <div className="mt-12">
            <IndustriesGrid />
          </div>
        </div>
      </section>

      <FinalCta location="about" />
    </>
  );
}
