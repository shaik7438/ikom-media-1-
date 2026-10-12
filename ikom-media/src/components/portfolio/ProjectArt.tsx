import type { ReactNode } from "react";
import type { Project } from "../../data/portfolio";

/**
 * Generated, lightweight SVG cover art for demo portfolio entries.
 * Zero image weight and no stock/AI imagery. Real projects should supply `image` instead.
 */
export function ProjectArt({ project }: { project: Project }) {
  const [a, b] = project.hue;
  const id = project.id;
  const bg = (
    <>
      <defs>
        <linearGradient id={`g-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor="#111747" />
          <stop offset="1" stopColor="#080B18" />
        </linearGradient>
        <radialGradient id={`r-${id}`} cx="0.8" cy="0.1" r="0.9">
          <stop offset="0" stopColor={a} stopOpacity="0.45" />
          <stop offset="1" stopColor={a} stopOpacity="0" />
        </radialGradient>
        <linearGradient id={`ab-${id}`} x1="0" y1="0" x2="1" y2="1">
          <stop offset="0" stopColor={a} />
          <stop offset="1" stopColor={b} />
        </linearGradient>
      </defs>
      <rect width="400" height="300" fill={`url(#g-${id})`} />
      <rect width="400" height="300" fill={`url(#r-${id})`} />
    </>
  );

  let body: ReactNode = null;
  switch (project.visual) {
    case "grid-posts":
      body = (
        <g transform="translate(118 26)">
          <rect width="164" height="248" rx="22" fill="#0c1023" stroke="rgb(255 255 255 / 0.14)" />
          <circle cx="30" cy="30" r="12" fill={`url(#ab-${id})`} />
          <rect x="50" y="23" width="60" height="6" rx="3" fill="rgb(255 255 255 / 0.5)" />
          <rect x="50" y="33" width="36" height="5" rx="2.5" fill="rgb(255 255 255 / 0.2)" />
          {Array.from({ length: 9 }).map((_, i) => {
            const x = 12 + (i % 3) * 48;
            const y = 58 + Math.floor(i / 3) * 48;
            const variant = i % 4;
            return (
              <g key={i}>
                <rect x={x} y={y} width="44" height="44" rx="6" fill={variant === 0 ? `url(#ab-${id})` : variant === 1 ? "#1a2160" : variant === 2 ? b : "#111747"} opacity={variant === 2 ? 0.55 : 1} />
                {variant === 1 && <rect x={x + 8} y={y + 30} width="28" height="4" rx="2" fill="rgb(255 255 255 / 0.5)" />}
                {variant === 3 && <circle cx={x + 22} cy={y + 22} r="10" fill="none" stroke={a} strokeWidth="2" />}
              </g>
            );
          })}
          <rect x="12" y="210" width="140" height="26" rx="13" fill="rgb(255 255 255 / 0.06)" />
        </g>
      );
      break;
    case "brand-mark":
      body = (
        <g>
          <g transform="translate(200 150)">
            <circle r="92" fill="none" stroke="rgb(255 255 255 / 0.08)" />
            <circle r="64" fill="none" stroke="rgb(255 255 255 / 0.12)" />
            <path d="M-44 44 L-44 -44 L0 -10 L44 -44 L44 44" fill="none" stroke={`url(#ab-${id})`} strokeWidth="14" strokeLinejoin="round" strokeLinecap="round" />
          </g>
          <rect x="140" y="262" width="120" height="6" rx="3" fill="rgb(255 255 255 / 0.4)" />
          {[0, 1, 2, 3].map((i) => (
            <rect key={i} x={28} y={40 + i * 26} width="18" height="18" rx="4" fill={[a, b, "#ffffff", "#111747"][i]} stroke="rgb(255 255 255 / 0.15)" />
          ))}
        </g>
      );
      break;
    case "browser":
      body = (
        <g transform="translate(40 34)">
          <rect width="320" height="232" rx="14" fill="#0c1023" stroke="rgb(255 255 255 / 0.14)" />
          <rect width="320" height="28" rx="14" fill="rgb(255 255 255 / 0.04)" />
          {[0, 1, 2].map((i) => (
            <circle key={i} cx={18 + i * 14} cy="14" r="4" fill="rgb(255 255 255 / 0.22)" />
          ))}
          <rect x="70" y="9" width="180" height="10" rx="5" fill="rgb(255 255 255 / 0.08)" />
          <rect x="20" y="46" width="140" height="14" rx="4" fill="rgb(255 255 255 / 0.85)" />
          <rect x="20" y="66" width="110" height="14" rx="4" fill="rgb(255 255 255 / 0.85)" />
          <rect x="20" y="90" width="150" height="6" rx="3" fill="rgb(255 255 255 / 0.25)" />
          <rect x="20" y="102" width="120" height="6" rx="3" fill="rgb(255 255 255 / 0.25)" />
          <rect x="20" y="120" width="64" height="20" rx="10" fill={a} />
          <rect x="184" y="44" width="116" height="100" rx="10" fill={`url(#ab-${id})`} opacity="0.85" />
          {[0, 1, 2].map((i) => (
            <g key={i} transform={`translate(${20 + i * 96} 158)`}>
              <rect width="88" height="58" rx="8" fill="rgb(255 255 255 / 0.05)" stroke="rgb(255 255 255 / 0.08)" />
              <rect x="10" y="10" width="16" height="16" rx="4" fill={i === 1 ? b : a} opacity="0.8" />
              <rect x="10" y="36" width="56" height="5" rx="2.5" fill="rgb(255 255 255 / 0.3)" />
            </g>
          ))}
        </g>
      );
      break;
    case "campaign":
      body = (
        <g>
          <path d="M0 220 L400 120 L400 300 L0 300 Z" fill={`url(#ab-${id})`} opacity="0.9" />
          <circle cx="300" cy="96" r="54" fill={b} opacity="0.75" />
          <circle cx="300" cy="96" r="54" fill="none" stroke="rgb(255 255 255 / 0.3)" strokeDasharray="4 6" transform="rotate(20 300 96)" />
          <rect x="34" y="52" width="170" height="20" rx="4" fill="#fff" />
          <rect x="34" y="80" width="130" height="20" rx="4" fill="#fff" />
          <rect x="34" y="112" width="110" height="7" rx="3.5" fill="rgb(255 255 255 / 0.4)" />
          <rect x="34" y="140" width="84" height="26" rx="13" fill="#080B18" stroke="rgb(255 255 255 / 0.4)" />
          <rect x="282" y="236" width="88" height="34" rx="8" fill="#080B18" opacity="0.65" />
        </g>
      );
      break;
    case "reel":
      body = (
        <g>
          {[-1, 0, 1].map((o) => (
            <g key={o} transform={`translate(${200 + o * 108 - 56} ${o === 0 ? 22 : 46}) scale(${o === 0 ? 1 : 0.84})`} opacity={o === 0 ? 1 : 0.5}>
              <rect width="112" height="236" rx="18" fill={o === 0 ? `url(#ab-${id})` : "#1a2160"} />
              <rect width="112" height="236" rx="18" fill="none" stroke="rgb(255 255 255 / 0.18)" />
              {o === 0 && (
                <>
                  <circle cx="56" cy="104" r="22" fill="rgb(8 11 24 / 0.55)" />
                  <path d="M50 93 L66 104 L50 115 Z" fill="#fff" />
                  <rect x="14" y="176" width="84" height="8" rx="4" fill="#fff" />
                  <rect x="14" y="190" width="60" height="8" rx="4" fill="rgb(255 255 255 / 0.7)" />
                  <rect x="14" y="214" width="84" height="3" rx="1.5" fill="rgb(255 255 255 / 0.3)" />
                  <rect x="14" y="214" width="36" height="3" rx="1.5" fill="#fff" />
                </>
              )}
            </g>
          ))}
        </g>
      );
      break;
    case "palette":
      body = (
        <g>
          {[a, b, "#ffffff", "#1a2160", "#080B18"].map((c, i) => (
            <g key={i} transform={`translate(${64 + i * 40} ${70 + (i % 2) * 14}) rotate(${-10 + i * 6})`}>
              <rect width="78" height="150" rx="10" fill={c} stroke="rgb(255 255 255 / 0.15)" />
              <rect x="10" y="118" width="40" height="6" rx="3" fill={i === 2 ? "#111747" : "rgb(255 255 255 / 0.55)"} />
            </g>
          ))}
        </g>
      );
      break;
  }

  return (
    <svg viewBox="0 0 400 300" className="h-full w-full" role="img" aria-label={`Illustrative cover for ${project.title}`}>
      {bg}
      {body}
    </svg>
  );
}
