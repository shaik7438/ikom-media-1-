import { Check } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { SectionHeading } from "../components/SectionHeading";
import { Reveal } from "../components/Reveal";
import { ButtonLink, ConsultationButton } from "../components/ButtonLink";
import { ServicesGrid } from "../components/sections/ServicesGrid";
import { FaqList } from "../components/sections/FaqList";
import { FinalCta } from "../components/sections/FinalCta";
import { serviceBySlug, type ServiceSlug } from "../data/services";
import { getRouteMeta } from "../data/routes";

const SERVICE_QUERY: Record<ServiceSlug, string> = {
  "social-media-management": "social",
  "performance-marketing": "ads",
  "creative-content-production": "creative",
  "website-design-development": "website",
  seo: "seo",
  "branding-digital-strategy": "branding",
};

export default function ServicePage({ slug }: { slug: ServiceSlug }) {
  const s = serviceBySlug(slug);
  const Icon = s.icon;
  const { page } = s;

  return (
    <>
      <PageHero
        eyebrow={s.title}
        title={page.h1}
        intro={page.intro}
        crumbs={getRouteMeta(s.path).crumbs}
        aside={
          <Reveal className="card p-7 md:p-8">
            <span className="inline-flex size-12 items-center justify-center rounded-2xl bg-gradient-to-br from-bright to-electric">
              <Icon className="size-6 text-white" aria-hidden="true" />
            </span>
            <p className="mt-6 text-sm font-bold uppercase tracking-[0.12em] text-white">Includes</p>
            <ul className="mt-4 space-y-3">
              {s.includes.map((i) => (
                <li key={i} className="flex gap-3">
                  <Check className="mt-1 size-4 shrink-0 text-accent-text" aria-hidden="true" />
                  <span>{i}</span>
                </li>
              ))}
            </ul>
          </Reveal>
        }
      >
        <div className="flex flex-col gap-3 xs:flex-row">
          <ConsultationButton location={`service_${slug}`} />
          {page.pricing.link && (
            <ButtonLink to={page.pricing.link.to} variant="secondary">
              {page.pricing.link.label}
            </ButtonLink>
          )}
        </div>
      </PageHero>

      {/* Deliverables */}
      <section className="section pt-4" aria-labelledby="deliverables-title">
        <div className="container-site">
          <SectionHeading id="deliverables-title" eyebrow="What you get" title="What's included" />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {page.deliverables.map((d, i) => (
              <Reveal as="li" key={d.title} delay={(i % 3) * 70} className="card p-7">
                <span className="font-display text-sm font-bold tabular-nums text-accent-text" aria-hidden="true">
                  {String(i + 1).padStart(2, "0")}
                </span>
                <h3 className="mt-3 text-xl">{d.title}</h3>
                <p className="mt-2 text-[0.9375rem] leading-relaxed">{d.text}</p>
              </Reveal>
            ))}
          </ul>
        </div>
      </section>

      {/* Fit + approach */}
      <section className="section bg-navy-900/60" aria-label="Who it's for and how we work">
        <div className="container-site grid gap-14 lg:grid-cols-2 lg:gap-20">
          <Reveal>
            <h2 className="text-h3 md:text-[1.875rem]">A good fit if you are…</h2>
            <ul className="mt-6 space-y-4">
              {page.goodFitFor.map((g) => (
                <li key={g} className="flex gap-3 text-lead">
                  <Check className="mt-1.5 size-5 shrink-0 text-accent-text" aria-hidden="true" />
                  <span>{g}</span>
                </li>
              ))}
            </ul>
          </Reveal>
          <Reveal delay={100}>
            <h2 className="text-h3 md:text-[1.875rem]">How we work</h2>
            <ol className="mt-6 space-y-5">
              {page.howWeWork.map((h, i) => (
                <li key={h} className="flex gap-4">
                  <span className="inline-flex size-8 shrink-0 items-center justify-center rounded-full border border-line-strong font-display text-sm font-bold tabular-nums text-accent-text">
                    {i + 1}
                  </span>
                  <span className="pt-0.5 text-[1.0625rem]">{h}</span>
                </li>
              ))}
            </ol>
          </Reveal>
        </div>
      </section>

      {/* Pricing */}
      <section className="section" aria-labelledby="svc-pricing-title">
        <div className="container-site">
          <Reveal className="card grid gap-10 p-7 md:p-12 lg:grid-cols-12">
            <div className="lg:col-span-6">
              <p className="eyebrow">Pricing</p>
              <h2 id="svc-pricing-title" className="mt-4 text-h3 md:text-[1.875rem]">
                {page.pricing.heading}
              </h2>
              <p className="mt-4">{page.pricing.text}</p>
              <div className="mt-8 flex flex-col gap-3 xs:flex-row">
                <ButtonLink
                  to={`/contact?service=${SERVICE_QUERY[slug]}`}
                  arrow
                  event="pricing_cta_click"
                  eventParams={{ service: slug }}
                >
                  Get a quote
                </ButtonLink>
                {page.pricing.link && !page.pricing.link.to.startsWith("/contact") && (
                  <ButtonLink to={page.pricing.link.to} variant="secondary">
                    {page.pricing.link.label}
                  </ButtonLink>
                )}
              </div>
            </div>
            {page.pricing.items && (
              <dl className="divide-y divide-line self-center rounded-2xl border border-line lg:col-span-6">
                {page.pricing.items.map((it) => (
                  <div key={it.name} className="flex items-center justify-between gap-4 px-6 py-4">
                    <dt className="text-white">{it.name}</dt>
                    <dd className="text-right font-display font-bold tabular-nums text-accent-text">{it.price}</dd>
                  </div>
                ))}
              </dl>
            )}
          </Reveal>
        </div>
      </section>

      {/* FAQ */}
      <section className="section border-t border-line" aria-labelledby="svc-faq-title">
        <div className="container-site grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-4">
            <SectionHeading id="svc-faq-title" eyebrow="FAQ" title={`${s.shortTitle} questions`} />
          </div>
          <div className="lg:col-span-8">
            <FaqList items={page.faqs} />
          </div>
        </div>
      </section>

      {/* Related */}
      <section className="section bg-navy-900/60" aria-labelledby="related-title">
        <div className="container-site">
          <SectionHeading id="related-title" eyebrow="Related services" title="Services that work well together" />
          <div className="mt-12">
            <ServicesGrid only={page.related} />
          </div>
        </div>
      </section>

      <FinalCta location={`service_${slug}`} />
    </>
  );
}
