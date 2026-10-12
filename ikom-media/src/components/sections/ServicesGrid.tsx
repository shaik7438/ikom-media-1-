import { useRef, type PointerEvent } from "react";
import { Link } from "react-router";
import { ArrowUpRight } from "lucide-react";
import { SERVICES, type Service } from "../../data/services";
import { Reveal } from "../Reveal";
import { useMotionPref } from "../../lib/motion";

function ServiceCard({ service, index, headingLevel }: { service: Service; index: number; headingLevel: "h2" | "h3" }) {
  const ref = useRef<HTMLAnchorElement>(null);
  const { reduced } = useMotionPref();
  const Icon = service.icon;
  const H = headingLevel;

  const onMove = (e: PointerEvent<HTMLAnchorElement>) => {
    const el = ref.current;
    if (!el || e.pointerType !== "mouse") return;
    const r = el.getBoundingClientRect();
    const x = (e.clientX - r.left) / r.width;
    const y = (e.clientY - r.top) / r.height;
    el.style.setProperty("--mx", `${x * 100}%`);
    el.style.setProperty("--my", `${y * 100}%`);
    if (!reduced) {
      el.style.setProperty("--rx", `${(0.5 - y) * 6}deg`);
      el.style.setProperty("--ry", `${(x - 0.5) * 7}deg`);
    }
  };
  const onLeave = () => {
    const el = ref.current;
    if (!el) return;
    el.style.setProperty("--rx", "0deg");
    el.style.setProperty("--ry", "0deg");
  };

  return (
    <Reveal delay={(index % 3) * 80} className="h-full [perspective:1200px]">
      <Link
        ref={ref}
        to={service.path}
        onPointerMove={onMove}
        onPointerLeave={onLeave}
        className="group card flex h-full flex-col overflow-hidden p-7 transition-[transform,border-color,background-color] duration-300 ease-out [transform-style:preserve-3d] [transform:rotateX(var(--rx,0deg))_rotateY(var(--ry,0deg))] hover:border-bright/50 md:p-8"
      >
        {/* Pointer-follow spotlight */}
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
          style={{
            background:
              "radial-gradient(420px circle at var(--mx,50%) var(--my,0%), rgb(93 114 255 / 0.16), transparent 60%)",
          }}
        />
        <div className="relative flex items-start justify-between [transform:translateZ(30px)]">
          <span className="relative inline-flex size-14 items-center justify-center">
            {/* Layered icon tile for a subtle 3D feel */}
            <span className="absolute inset-0 translate-x-1.5 translate-y-1.5 rounded-2xl bg-electric/25 blur-[2px] transition-transform duration-300 group-hover:translate-x-2 group-hover:translate-y-2" aria-hidden="true" />
            <span className="absolute inset-0 rounded-2xl border border-white/15 bg-gradient-to-br from-bright to-electric shadow-[inset_0_1px_0_rgb(255_255_255/0.35)]" aria-hidden="true" />
            <Icon className="relative size-6 text-white" aria-hidden="true" />
          </span>
          <ArrowUpRight
            className="size-5 text-subtle transition-all duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5 group-hover:text-white"
            aria-hidden="true"
          />
        </div>
        <H className="relative mt-7 text-h3 [transform:translateZ(20px)]">{service.title}</H>
        <p className="relative mt-3 text-[0.9375rem] leading-relaxed">{service.description}</p>
        <ul className="relative mt-6 flex flex-wrap gap-2 pt-1" aria-label={`${service.title} includes`}>
          {service.includes.map((t) => (
            <li key={t} className="rounded-full border border-line px-3 py-1 text-xs font-medium text-muted">
              {t}
            </li>
          ))}
        </ul>
        <span className="relative mt-auto pt-7 text-sm font-semibold text-accent-text">
          View service details
        </span>
      </Link>
    </Reveal>
  );
}

export function ServicesGrid({
  headingLevel = "h3",
  only,
}: {
  headingLevel?: "h2" | "h3";
  /** Limit to these services, in this order */
  only?: Service["slug"][];
}) {
  const list = only ? only.map((slug) => SERVICES.find((s) => s.slug === slug)!) : SERVICES;
  return (
    <ul className="grid gap-5 md:grid-cols-2 lg:grid-cols-3">
      {list.map((s, i) => (
        <li key={s.slug}>
          <ServiceCard service={s} index={i} headingLevel={headingLevel} />
        </li>
      ))}
    </ul>
  );
}
