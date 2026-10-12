import { Link } from "react-router";
import { Pause, Play } from "lucide-react";
import { BRAND } from "../../data/site";
import { SERVICES } from "../../data/services";
import { Logo } from "../Logo";
import { ContactLinks } from "../ContactLinks";
import { useMotionPref } from "../../lib/motion";

const COMPANY = [
  { label: "About Us", to: "/about" },
  { label: "Portfolio", to: "/portfolio" },
  { label: "Marketing Packages", to: "/packages/marketing" },
  { label: "Website Packages", to: "/packages/website" },
  { label: "Contact Us", to: "/contact" },
  { label: "Privacy Policy", to: "/privacy-policy" },
];

export function Footer() {
  const { userReduced, toggle } = useMotionPref();
  const year = new Date().getFullYear();
  return (
    <footer className="relative border-t border-line bg-navy-950">
      <div className="container-site grid gap-12 py-16 md:grid-cols-12 md:py-20">
        <div className="md:col-span-4">
          <Link to="/" aria-label="IKom Media home" className="inline-flex min-h-11 items-center rounded-md">
            <Logo height={96} />
          </Link>
          <p className="mt-5 max-w-xs text-[0.9375rem]">{BRAND.supporting}</p>
          <p className="mt-6 font-display text-sm font-semibold tracking-wide text-white/80">
            {BRAND.philosophy.join(" → ")}
          </p>
        </div>

        <nav aria-labelledby="footer-services" className="md:col-span-3">
          <h2 id="footer-services" className="text-sm font-bold uppercase tracking-[0.12em] text-white">
            Services
          </h2>
          <ul className="mt-5 space-y-1">
            {SERVICES.map((s) => (
              <li key={s.slug}>
                <Link to={s.path} className="inline-flex min-h-9 items-center text-[0.9375rem] hover:text-white">
                  {s.title}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <nav aria-labelledby="footer-company" className="md:col-span-2">
          <h2 id="footer-company" className="text-sm font-bold uppercase tracking-[0.12em] text-white">
            Company
          </h2>
          <ul className="mt-5 space-y-1">
            {COMPANY.map((l) => (
              <li key={l.to}>
                <Link to={l.to} className="inline-flex min-h-9 items-center text-[0.9375rem] hover:text-white">
                  {l.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>

        <div className="md:col-span-3">
          <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-white">Get in touch</h2>
          <ContactLinks location="footer" layout="stack" className="mt-4" />
        </div>
      </div>

      <div className="border-t border-line">
        <div className="container-site flex flex-col gap-4 py-6 text-sm text-subtle sm:flex-row sm:items-center sm:justify-between">
          <p>© {year} IKom Media. All rights reserved.</p>
          <button
            type="button"
            onClick={toggle}
            aria-pressed={userReduced}
            className="inline-flex min-h-11 items-center gap-2 self-start rounded-full border border-line px-4 text-muted transition-colors hover:border-line-strong hover:text-white sm:self-auto"
          >
            {userReduced ? <Play className="size-4" aria-hidden="true" /> : <Pause className="size-4" aria-hidden="true" />}
            {userReduced ? "Turn animations on" : "Reduce animations"}
          </button>
        </div>
      </div>
    </footer>
  );
}
