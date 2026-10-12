import { Link } from "react-router";
import { Hero } from "../components/hero/Hero";
import { SectionHeading } from "../components/SectionHeading";
import { ButtonLink } from "../components/ButtonLink";
import { Reveal } from "../components/Reveal";
import { ServicesGrid } from "../components/sections/ServicesGrid";
import { ProcessTimeline } from "../components/sections/ProcessTimeline";
import { IndustriesGrid } from "../components/sections/Industries";
import { PortfolioGrid } from "../components/portfolio/PortfolioGrid";
import { PricingTabs } from "../components/sections/PricingTabs";
import { WhyUsGrid } from "../components/sections/WhyUs";
import { FaqList } from "../components/sections/FaqList";
import { FinalCta } from "../components/sections/FinalCta";
import { PhilosophyFlow } from "../components/sections/PhilosophyFlow";
import { FAQS } from "../data/content";

export default function Home() {
  return (
    <>
      <Hero />

      {/* About */}
      <section className="section relative" aria-labelledby="about-title">
        <div className="container-site grid gap-14 lg:grid-cols-12 lg:gap-16">
          <div className="lg:col-span-6">
            <SectionHeading
              id="about-title"
              eyebrow="About IKom Media"
              title="Your Vision. Our Strategy. Better Digital Possibilities."
            />
          </div>
          <Reveal className="space-y-5 text-lead text-white lg:col-span-6 lg:pt-12" delay={100}>
            <p>
              IKom Media is a digital marketing and creative agency helping businesses build recognizable brands,
              communicate their value and connect with the right audience.
            </p>
            <p>
              We combine strategic thinking, creative storytelling, performance marketing and web experiences to help
              brands move beyond simply being online.
            </p>
            <p>
              From building your brand identity to managing campaigns and developing conversion-focused websites, we
              create digital solutions around your business goals.
            </p>
            <div className="pt-4">
              <ButtonLink to="/about" variant="secondary" arrow>
                Discover IKom Media
              </ButtonLink>
            </div>
          </Reveal>
        </div>
        <div className="container-site mt-16 md:mt-20">
          <PhilosophyFlow />
        </div>
      </section>

      {/* Services */}
      <section className="section relative border-t border-line" aria-labelledby="services-title" id="services">
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading id="services-title" eyebrow="What we do" title="Everything Your Brand Needs to Move Forward." />
            <Reveal className="shrink-0">
              <ButtonLink to="/services" variant="ghost" arrow>
                All services
              </ButtonLink>
            </Reveal>
          </div>
          <div className="mt-12 md:mt-16">
            <ServicesGrid />
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="section relative overflow-hidden bg-navy-900/60" aria-labelledby="process-title">
        <div aria-hidden="true" className="glow-orb left-1/2 top-0 h-72 w-[40rem] -translate-x-1/2 bg-electric/15" />
        <div className="container-site relative">
          <SectionHeading
            id="process-title"
            eyebrow="How we work"
            align="center"
            title="A Clear Process. A Smarter Way to Grow."
          />
          <div className="mt-14 md:mt-20">
            <ProcessTimeline />
          </div>
        </div>
      </section>

      {/* Industries */}
      <section className="section relative overflow-hidden" aria-labelledby="industries-title">
        <div aria-hidden="true" className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_55%_at_15%_0%,rgb(52_59_255/0.16),transparent_70%),radial-gradient(ellipse_60%_50%_at_95%_100%,rgb(93_114_255/0.12),transparent_70%)]" />
        <div className="container-site relative">
          <SectionHeading
            id="industries-title"
            eyebrow="Who we work with"
            title="Different Industries. Different Challenges. Tailored Digital Solutions."
            intro="Every sector reaches customers differently. These are some of the industries our services are designed to support."
          />
          <div className="mt-12 md:mt-16">
            <IndustriesGrid />
          </div>
        </div>
      </section>

      {/* Portfolio */}
      <section className="section border-t border-line" aria-labelledby="portfolio-title">
        <div className="container-site">
          <div className="flex flex-col gap-6 md:flex-row md:items-end md:justify-between">
            <SectionHeading
              id="portfolio-title"
              eyebrow="Portfolio"
              title="Ideas in Action. Strategy in Practice."
              intro="Creative concepts and demo projects showing how we approach different briefs."
            />
            <Reveal className="shrink-0">
              <ButtonLink to="/portfolio" variant="ghost" arrow>
                View full portfolio
              </ButtonLink>
            </Reveal>
          </div>
          <div className="mt-10">
            <PortfolioGrid limit={6} />
          </div>
        </div>
      </section>

      {/* Pricing */}
      <section className="section relative overflow-hidden bg-navy-900/60" aria-labelledby="pricing-title" id="pricing">
        <div aria-hidden="true" className="glow-orb -right-40 top-20 h-96 w-96 bg-electric/20" />
        <div className="container-site relative">
          <SectionHeading
            id="pricing-title"
            eyebrow="Packages"
            title="Packages Built Around How Much Growth You Need."
            intro="Transparent starting prices. Pick a package, or talk to us about a custom scope."
          />
          <div className="mt-10">
            <PricingTabs />
          </div>
        </div>
      </section>

      {/* Why us */}
      <section className="section" aria-labelledby="why-title">
        <div className="container-site">
          <SectionHeading
            id="why-title"
            eyebrow="Why IKom Media"
            title="More Than Deliverables. A Partner in Your Digital Journey."
          />
          <div className="mt-14">
            <WhyUsGrid />
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="section border-t border-line" aria-labelledby="faq-title">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="faq-title" eyebrow="FAQ" title="Questions, Answered." />
            <Reveal className="mt-6">
              <p>
                Can't find what you're looking for?{" "}
                <Link to="/contact" className="text-link">
                  Get in touch
                </Link>
                .
              </p>
            </Reveal>
          </div>
          <div className="lg:col-span-8">
            <FaqList items={FAQS} />
          </div>
        </div>
      </section>

      <FinalCta location="home" />
    </>
  );
}
