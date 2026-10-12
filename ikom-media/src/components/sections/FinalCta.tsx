import { ConsultationButton } from "../ButtonLink";
import { ContactLinks } from "../ContactLinks";
import { Reveal } from "../Reveal";

type Props = { title?: string; text?: string; location: string };

export function FinalCta({
  title = "Ready to Build a Brand That Stands Out?",
  text = "Let's turn your ideas into a focused digital strategy, a stronger online presence and a website designed around your goals.",
  location,
}: Props) {
  return (
    <section className="section" aria-labelledby={`cta-${location}`}>
      <div className="container-site">
        <Reveal className="relative overflow-hidden rounded-[1.75rem] border border-bright/30 bg-navy-800 px-6 py-14 sm:px-10 md:px-16 md:py-20">
          <div aria-hidden="true" className="glow-orb -right-24 -top-24 h-80 w-80 bg-electric/50" />
          <div aria-hidden="true" className="glow-orb -bottom-32 left-1/4 h-72 w-72 bg-bright/25" />
          <div aria-hidden="true" className="bg-grid absolute inset-0 opacity-60" />
          <div className="relative max-w-3xl">
            <h2 id={`cta-${location}`} className="text-h2">
              {title}
            </h2>
            <p className="mt-5 max-w-2xl text-lead text-white/80">{text}</p>
            <ConsultationButton location={`final_cta_${location}`} className="mt-9">
              Book Your Free Consultation
            </ConsultationButton>
            <ContactLinks location={`final_cta_${location}`} className="mt-10" showWhatsApp={false} />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
