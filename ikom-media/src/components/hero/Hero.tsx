import { ButtonLink, ConsultationButton } from "../ButtonLink";
import { HeroVisual } from "./HeroVisual";

export function Hero() {
  return (
    <section
      aria-labelledby="hero-title"
      className="relative isolate flex min-h-[min(100svh,58rem)] items-center overflow-hidden pb-16 pt-28 md:pt-32 lg:pb-20"
    >
      {/* Ambient background */}
      <div aria-hidden="true" className="bg-grid absolute inset-0 -z-10" />
      <div aria-hidden="true" className="glow-orb -z-10 left-[55%] top-[10%] h-[36rem] w-[36rem] bg-electric/30" />
      <div aria-hidden="true" className="glow-orb -z-10 -left-40 bottom-0 h-80 w-80 bg-navy-800" />

      {/* 3D visual — decorative, sits behind/beside the copy and never contains text */}
      <div
        className="absolute -z-10 opacity-60 max-lg:left-1/2 max-lg:top-[4.5rem] max-lg:h-[min(80vw,26rem)] max-lg:w-[min(80vw,26rem)] max-lg:-translate-x-1/2 sm:opacity-75 lg:inset-y-0 lg:right-[-4%] lg:my-auto lg:h-[min(92vh,46rem)] lg:w-[54%] lg:opacity-100"
      >
        <HeroVisual />
      </div>

      <div className="container-site relative max-lg:pt-[min(52vw,17rem)]">
        <div className="max-w-[40rem] lg:max-w-[44rem]">
          <p className="eyebrow hero-in" style={{ animationDelay: "60ms" }}>
            Strategy · Creativity · Performance
          </p>
          <h1 id="hero-title" className="hero-rise mt-6 text-display">
            We Don't Just Build Brands.{" "}
            <span className="bg-gradient-to-r from-white via-[#c9d0ff] to-bright bg-clip-text text-transparent">
              We Build Brands That Get Noticed.
            </span>
          </h1>
          <p className="hero-in mt-7 max-w-[34rem] text-lead text-muted" style={{ animationDelay: "220ms" }}>
            From scroll-stopping content to high-performing campaigns and premium websites, we help businesses build a
            stronger digital presence and turn attention into opportunity.
          </p>
          <div className="hero-in mt-10 flex flex-col gap-3 xs:flex-row" style={{ animationDelay: "320ms" }}>
            <ConsultationButton location="hero">Book a Free Consultation</ConsultationButton>
            <ButtonLink to="/services" variant="secondary">
              Explore Our Services
            </ButtonLink>
          </div>
        </div>
      </div>
    </section>
  );
}
