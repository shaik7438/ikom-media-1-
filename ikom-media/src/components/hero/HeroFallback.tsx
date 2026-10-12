/**
 * CSS/SVG hero composition. Rendered in the server HTML and shown when WebGL is unavailable,
 * on low-power devices, with reduced motion, and while the 3D scene loads.
 */
export function HeroFallback({ animate = true }: { animate?: boolean }) {
  return (
    <div className="relative h-full w-full" aria-hidden="true">
      {/* Soft floor shadow */}
      <div className="absolute bottom-[8%] left-1/2 h-10 w-[52%] -translate-x-1/2 rounded-[50%] bg-black/70 blur-2xl" />
      <svg viewBox="0 0 600 600" className={`absolute inset-0 m-auto h-full w-full max-w-[640px] ${animate ? "drift-slow" : ""}`}>
        <defs>
          <radialGradient id="hf-core" cx="0.35" cy="0.3" r="0.8">
            <stop offset="0" stopColor="#c7d0ff" />
            <stop offset="0.25" stopColor="#5D72FF" />
            <stop offset="0.7" stopColor="#343BFF" />
            <stop offset="1" stopColor="#111747" />
          </radialGradient>
          <linearGradient id="hf-ring" x1="0" y1="0" x2="1" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.85" />
            <stop offset="0.5" stopColor="#8a93b3" stopOpacity="0.4" />
            <stop offset="1" stopColor="#5D72FF" stopOpacity="0.9" />
          </linearGradient>
          <linearGradient id="hf-glass" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0" stopColor="#ffffff" stopOpacity="0.32" />
            <stop offset="1" stopColor="#5D72FF" stopOpacity="0.06" />
          </linearGradient>
          <filter id="hf-blur">
            <feGaussianBlur stdDeviation="30" />
          </filter>
        </defs>
        <circle cx="300" cy="300" r="170" fill="#343BFF" opacity="0.45" filter="url(#hf-blur)" />
        {/* Faceted core */}
        <g transform="translate(300 300)">
          <polygon points="0,-150 130,-75 130,75 0,150 -130,75 -130,-75" fill="url(#hf-core)" />
          <polygon points="0,-150 130,-75 0,0" fill="#ffffff" opacity="0.18" />
          <polygon points="-130,-75 0,-150 0,0" fill="#ffffff" opacity="0.08" />
          <polygon points="-130,75 -130,-75 0,0" fill="#000" opacity="0.12" />
          <polygon points="0,150 -130,75 0,0" fill="#000" opacity="0.28" />
          <polygon points="130,75 0,150 0,0" fill="#000" opacity="0.18" />
        </g>
        {/* Metallic ring */}
        <g className={animate ? "spin-slow" : ""} style={{ transformOrigin: "300px 300px" }}>
          <ellipse cx="300" cy="300" rx="235" ry="78" fill="none" stroke="url(#hf-ring)" strokeWidth="6" transform="rotate(-18 300 300)" />
        </g>
        {/* Glass shards */}
        <g className={animate ? "drift" : ""}>
          <rect x="430" y="110" width="78" height="78" rx="14" fill="url(#hf-glass)" stroke="rgb(255 255 255 / 0.35)" transform="rotate(18 469 149)" />
        </g>
        <circle cx="128" cy="440" r="34" fill="url(#hf-glass)" stroke="rgb(255 255 255 / 0.3)" />
        <polygon points="120,150 160,210 80,210" fill="url(#hf-glass)" stroke="rgb(255 255 255 / 0.3)" />
      </svg>
    </div>
  );
}
