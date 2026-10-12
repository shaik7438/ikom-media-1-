import { Link } from "react-router";
import { ButtonLink } from "../components/ButtonLink";
import { HeroFallback } from "../components/hero/HeroFallback";
import { SERVICES } from "../data/services";

export default function NotFound() {
  return (
    <section className="relative overflow-hidden pt-36 pb-24 md:pt-44">
      <div aria-hidden="true" className="bg-grid absolute inset-0" />
      <div className="container-site relative grid items-center gap-12 lg:grid-cols-2">
        <div>
          <p className="eyebrow">Error 404</p>
          <h1 className="mt-4 text-h1">This page didn't get noticed. Mostly because it doesn't exist.</h1>
          <p className="mt-6 max-w-xl text-lead">
            The link may be broken, or the page may have moved. Here are some useful places to go instead.
          </p>
          <div className="mt-9 flex flex-col gap-3 xs:flex-row">
            <ButtonLink to="/" arrow>
              Back to home
            </ButtonLink>
            <ButtonLink to="/contact" variant="secondary">
              Contact us
            </ButtonLink>
          </div>
          <nav aria-label="Popular pages" className="mt-12">
            <h2 className="text-sm font-bold uppercase tracking-[0.12em] text-white">Popular pages</h2>
            <ul className="mt-4 grid gap-x-6 gap-y-1 sm:grid-cols-2">
              {SERVICES.map((s) => (
                <li key={s.slug}>
                  <Link to={s.path} className="inline-flex min-h-10 items-center hover:text-white">
                    {s.title}
                  </Link>
                </li>
              ))}
              <li>
                <Link to="/packages/marketing" className="inline-flex min-h-10 items-center hover:text-white">
                  Marketing Packages
                </Link>
              </li>
              <li>
                <Link to="/packages/website" className="inline-flex min-h-10 items-center hover:text-white">
                  Website Packages
                </Link>
              </li>
            </ul>
          </nav>
        </div>
        <div className="mx-auto hidden aspect-square w-full max-w-md opacity-80 lg:block">
          <HeroFallback />
        </div>
      </div>
    </section>
  );
}
