import { MessageCircle, Phone, Mail } from "lucide-react";
import { PageHero } from "../components/PageHero";
import { ContactForm } from "../components/contact/ContactForm";
import { Reveal } from "../components/Reveal";
import { CONTACT } from "../data/site";
import { getRouteMeta } from "../data/routes";
import { track } from "../lib/analytics";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappUrl } from "../lib/whatsapp";

export default function Contact() {
  return (
    <>
      <PageHero
        eyebrow="Contact us"
        title="Let's Talk About Your Brand."
        intro="Book a free consultation. Tell us where your business is today and where you want it to be, and we'll recommend the right mix of services."
        crumbs={getRouteMeta("/contact").crumbs}
      />

      <section className="section pt-0" aria-label="Contact options">
        <div className="container-site grid gap-10 lg:grid-cols-12 lg:gap-14">
          <div className="lg:col-span-7">
            <h2 className="sr-only">Enquiry form</h2>
            <ContactForm />
          </div>

          <aside className="space-y-5 lg:col-span-5" aria-label="Direct contact">
            <Reveal className="card p-7">
              <h2 className="text-xl">Prefer to talk directly?</h2>
              <p className="mt-2 text-[0.9375rem]">Call, WhatsApp or email us. We'll take it from there.</p>
              <ul className="mt-6 space-y-3">
                {CONTACT.phones.map((p) => (
                  <li key={p.raw}>
                    <a
                      href={`tel:${p.raw}`}
                      onClick={() => track("phone_click", { location: "contact_page" })}
                      className="group flex min-h-14 items-center gap-4 rounded-xl border border-line px-4 transition-colors hover:border-bright/60 hover:bg-white/[0.03]"
                    >
                      <Phone className="size-5 text-accent-text" aria-hidden="true" />
                      <span>
                        <span className="block text-xs text-subtle">Call</span>
                        <span className="block font-semibold tabular-nums text-white">{p.label}</span>
                      </span>
                    </a>
                  </li>
                ))}
                <li>
                  <a
                    href={`mailto:${CONTACT.email}`}
                    onClick={() => track("email_click", { location: "contact_page" })}
                    className="group flex min-h-14 items-center gap-4 rounded-xl border border-line px-4 transition-colors hover:border-bright/60 hover:bg-white/[0.03]"
                  >
                    <Mail className="size-5 text-accent-text" aria-hidden="true" />
                    <span className="min-w-0">
                      <span className="block text-xs text-subtle">Email</span>
                      <span className="block break-all font-semibold text-white">{CONTACT.email}</span>
                    </span>
                  </a>
                </li>
              </ul>
              <a
                href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
                target="_blank"
                rel="noopener noreferrer"
                onClick={() => track("whatsapp_click", { location: "contact_page" })}
                className="btn btn-primary mt-6 w-full"
              >
                <MessageCircle className="size-4" aria-hidden="true" />
                Start a WhatsApp chat
                <span className="sr-only">(opens in a new tab)</span>
              </a>
            </Reveal>

            <Reveal className="card p-7" delay={80}>
              <h2 className="text-xl">What happens next</h2>
              <ol className="mt-5 space-y-4">
                {[
                  "We review your enquiry and get in touch using your preferred method.",
                  "We set up a free consultation to understand your goals.",
                  "We recommend a package or custom scope, with clear pricing.",
                ].map((t, i) => (
                  <li key={t} className="flex gap-4 text-[0.9375rem]">
                    <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-full border border-line-strong font-display text-xs font-bold text-accent-text">
                      {i + 1}
                    </span>
                    <span className="pt-0.5">{t}</span>
                  </li>
                ))}
              </ol>
            </Reveal>
          </aside>
        </div>
      </section>
    </>
  );
}
