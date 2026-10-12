/**
 * Official IKom Media logo (white, transparent background), extracted from the supplied artwork
 * without redrawing. Files: /public/brand/ikom-media-logo.{webp,png} — 604 × 598 px intrinsic size.
 */
const BASE = import.meta.env.BASE_URL;

export const LOGO = {
  webp: `${BASE}brand/ikom-media-logo.webp`,
  png: `${BASE}brand/ikom-media-logo.png`,
  width: 604,
  height: 598,
} as const;

type Props = { className?: string; height?: number; priority?: boolean };

export function Logo({ className = "", height = 56, priority = false }: Props) {
  const width = Math.round((LOGO.width / LOGO.height) * height);
  return (
    <picture className={`block shrink-0 ${className}`} style={{ width, height }}>
      <source srcSet={LOGO.webp} type="image/webp" />
      <img
        src={LOGO.png}
        alt="IKom Media"
        width={width}
        height={height}
        decoding="async"
        loading={priority ? "eager" : "lazy"}
        fetchPriority={priority ? "high" : "auto"}
        className="block h-full w-full object-contain"
      />
    </picture>
  );
}
