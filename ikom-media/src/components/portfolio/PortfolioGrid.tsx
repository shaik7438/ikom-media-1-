import { useRef, useState } from "react";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { ArrowUpRight, X } from "lucide-react";
import { PORTFOLIO_CATEGORIES, PROJECTS, type PortfolioCategory, type Project } from "../../data/portfolio";
import { ProjectArt } from "./ProjectArt";
import { ConsultationButton } from "../ButtonLink";

const catLabel = (c: PortfolioCategory) => PORTFOLIO_CATEGORIES.find((x) => x.id === c)!.label;

function Cover({ project, eager = false }: { project: Project; eager?: boolean }) {
  if (project.image) {
    return (
      <img
        src={project.image.src}
        alt={project.image.alt}
        width={project.image.width}
        height={project.image.height}
        loading={eager ? "eager" : "lazy"}
        decoding="async"
        className="h-full w-full object-cover"
      />
    );
  }
  return <ProjectArt project={project} />;
}

function ProjectDialog({ project, dialogRef }: { project: Project | null; dialogRef: React.RefObject<HTMLDialogElement | null> }) {
  const close = () => dialogRef.current?.close();
  return (
    <dialog
      ref={dialogRef}
      aria-labelledby="project-dialog-title"
      className="m-auto max-h-[min(90dvh,52rem)] w-[min(100%-1.5rem,56rem)] overflow-y-auto rounded-3xl border border-line-strong bg-navy-900 p-0 text-muted backdrop:bg-navy-950/80 backdrop:backdrop-blur-sm"
      onClick={(e) => {
        if (e.target === dialogRef.current) close();
      }}
    >
      {project && (
        <div>
          <div className="relative aspect-[4/3] overflow-hidden sm:aspect-[16/9]">
            <Cover project={project} eager />
            <button
              type="button"
              onClick={close}
              className="absolute right-4 top-4 inline-flex size-11 items-center justify-center rounded-full border border-white/20 bg-navy-950/70 text-white backdrop-blur"
              aria-label="Close project details"
            >
              <X className="size-5" aria-hidden="true" />
            </button>
          </div>
          <div className="p-6 sm:p-10">
            <p className="flex flex-wrap items-center gap-2 text-xs font-semibold">
              <span className="rounded-full bg-electric/20 px-3 py-1 uppercase tracking-[0.08em] text-accent-text">
                {project.label}
              </span>
              <span className="rounded-full border border-line px-3 py-1 text-muted">{catLabel(project.category)}</span>
              <span className="rounded-full border border-line px-3 py-1 text-muted">{project.industry}</span>
            </p>
            <h2 id="project-dialog-title" className="mt-5 text-h3 md:text-[1.875rem]">
              {project.title}
            </h2>
            <p className="mt-3 text-lead">{project.summary}</p>
            <dl className="mt-8 grid gap-8 sm:grid-cols-2">
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-white">Challenge</dt>
                <dd className="mt-2 leading-relaxed">{project.challenge}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-white">Strategy</dt>
                <dd className="mt-2 leading-relaxed">{project.strategy}</dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-white">Deliverables</dt>
                <dd className="mt-2">
                  <ul className="flex flex-wrap gap-2">
                    {project.deliverables.map((d) => (
                      <li key={d} className="rounded-full border border-line px-3 py-1 text-sm">
                        {d}
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
              <div>
                <dt className="text-xs font-bold uppercase tracking-[0.12em] text-white">Results</dt>
                <dd className="mt-2 leading-relaxed">
                  {project.results?.length ? (
                    <ul className="list-disc pl-5">
                      {project.results.map((r) => (
                        <li key={r}>{r}</li>
                      ))}
                    </ul>
                  ) : (
                    <span className="text-subtle">
                      {project.kind === "demo"
                        ? "This is a demonstration concept, so there are no client results to report."
                        : "Results to be added once verified."}
                    </span>
                  )}
                </dd>
              </div>
            </dl>
            <div className="mt-10 flex flex-wrap gap-3">
              <ConsultationButton location="portfolio_dialog">Discuss a similar project</ConsultationButton>
              <button type="button" onClick={close} className="btn btn-secondary">
                Close
              </button>
            </div>
          </div>
        </div>
      )}
    </dialog>
  );
}

export function PortfolioGrid({ limit, headingLevel = "h3" }: { limit?: number; headingLevel?: "h2" | "h3" }) {
  const [filter, setFilter] = useState<PortfolioCategory | "all">("all");
  const [active, setActive] = useState<Project | null>(null);
  const dialogRef = useRef<HTMLDialogElement>(null);
  const H = headingLevel;

  const filtered = PROJECTS.filter((p) => filter === "all" || p.category === filter);
  const list = limit ? filtered.slice(0, limit) : filtered;

  const open = (p: Project) => {
    setActive(p);
    requestAnimationFrame(() => dialogRef.current?.showModal());
  };

  const chip = (selected: boolean) =>
    `min-h-11 rounded-full border px-4 text-sm font-semibold transition-colors ${
      selected ? "border-bright bg-electric text-white" : "border-line-strong text-muted hover:border-bright/60 hover:text-white"
    }`;

  return (
    <div>
      <div role="group" aria-label="Filter projects by category" className="flex flex-wrap gap-2">
        <button type="button" className={chip(filter === "all")} aria-pressed={filter === "all"} onClick={() => setFilter("all")}>
          All work
        </button>
        {PORTFOLIO_CATEGORIES.map((c) => (
          <button
            key={c.id}
            type="button"
            className={chip(filter === c.id)}
            aria-pressed={filter === c.id}
            onClick={() => setFilter(c.id)}
          >
            {c.label}
          </button>
        ))}
      </div>
      <p className="sr-only" aria-live="polite">
        Showing {list.length} {list.length === 1 ? "project" : "projects"}
      </p>

      <m.ul layout className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence mode="popLayout" initial={false}>
          {list.map((p, i) => (
            <m.li
              key={p.id}
              layout
              initial={{ opacity: 0, scale: 0.96 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.96 }}
              transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
              className={limit && i === 0 ? "sm:col-span-2 lg:col-span-2 lg:row-span-2" : ""}
            >
              <button
                type="button"
                onClick={() => open(p)}
                aria-haspopup="dialog"
                className="group card flex h-full w-full flex-col overflow-hidden text-left transition-colors hover:border-bright/50"
              >
                <span className={`relative block overflow-hidden ${limit && i === 0 ? "aspect-[4/3] lg:aspect-auto lg:flex-1" : "aspect-[4/3]"}`}>
                  <span className="block h-full w-full transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.04]">
                    <Cover project={p} />
                  </span>
                  <span className="absolute left-4 top-4 rounded-full bg-navy-950/75 px-3 py-1 text-[0.6875rem] font-bold uppercase tracking-[0.08em] text-white backdrop-blur">
                    {p.label}
                  </span>
                </span>
                <span className="flex items-start justify-between gap-4 p-6">
                  <span>
                    <span className="block text-xs font-semibold uppercase tracking-[0.1em] text-accent-text">
                      {catLabel(p.category)} · {p.industry}
                    </span>
                    <H className="mt-2 font-display text-lg font-bold leading-snug text-white">{p.title}</H>
                  </span>
                  <ArrowUpRight
                    className="mt-1 size-5 shrink-0 text-subtle transition-all group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
                    aria-hidden="true"
                  />
                </span>
              </button>
            </m.li>
          ))}
        </AnimatePresence>
      </m.ul>

      <ProjectDialog project={active} dialogRef={dialogRef} />
    </div>
  );
}
