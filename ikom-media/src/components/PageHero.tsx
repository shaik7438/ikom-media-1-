import type { ReactNode } from "react";
import { Link } from "react-router";
import { ChevronRight } from "lucide-react";
import type { Crumb } from "../data/routes";

type Props = {
  eyebrow?: string;
  title: ReactNode;
  intro?: ReactNode;
  crumbs?: Crumb[];
  children?: ReactNode;
  aside?: ReactNode;
};

export function Breadcrumbs({ crumbs }: { crumbs: Crumb[] }) {
  const trail = [{ name: "Home", path: "/" }, ...crumbs];
  return (
    <nav aria-label="Breadcrumb">
      <ol className="flex flex-wrap items-center gap-1.5 text-sm text-subtle">
        {trail.map((c, i) => {
          const last = i === trail.length - 1;
          return (
            <li key={c.path + c.name} className="flex items-center gap-1.5">
              {last ? (
                <span aria-current="page" className="text-muted">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link to={c.path} className="hover:text-white">
                    {c.name}
                  </Link>
                  <ChevronRight className="size-3.5" aria-hidden="true" />
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}

/** Standard inner-page hero with the page's single H1. */
export function PageHero({ eyebrow, title, intro, crumbs, children, aside }: Props) {
  return (
    <section className="relative overflow-hidden pt-32 pb-16 md:pt-40 md:pb-24">
      <div className="bg-grid pointer-events-none absolute inset-0" aria-hidden="true" />
      <div
        className="glow-orb -top-40 right-[-10%] h-[28rem] w-[28rem] bg-electric/25"
        aria-hidden="true"
      />
      <div className="container-site relative">
        {crumbs && <Breadcrumbs crumbs={crumbs} />}
        <div className={`mt-8 grid gap-12 ${aside ? "lg:grid-cols-12 lg:items-end" : ""}`}>
          <div className={aside ? "lg:col-span-7" : "max-w-4xl"}>
            {eyebrow && <p className="eyebrow">{eyebrow}</p>}
            <h1 className="mt-4 text-h1">{title}</h1>
            {intro && <p className="mt-6 max-w-2xl text-lead">{intro}</p>}
            {children && <div className="mt-8">{children}</div>}
          </div>
          {aside && <div className="lg:col-span-5">{aside}</div>}
        </div>
      </div>
    </section>
  );
}
