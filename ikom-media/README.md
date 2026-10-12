# IKom Media — Website

Marketing website for **IKom Media**, a digital marketing and creative agency.
React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · Motion · React Three Fiber · React Router 7.

Every route is **prerendered to static HTML** at build time (full content, unique meta tags,
structured data), then hydrated in the browser. The Three.js hero scene is code-split and
loaded only after the page is idle, on capable devices.

---

## ⚠️ Before launch: required inputs

| Item | Where | Status |
|---|---|---|
| Official logo | `public/brand/ikom-media-logo.{webp,png}` (white on transparent, taken from the supplied artwork) | ✅ In use |
| Favicons | `public/favicon.png`, `icon-192.png`, `icon-512.png`, `apple-touch-icon.png` (the logo's M mark) | ✅ In use |
| Social share image | `public/og-image.png` (1200×630) — regenerate with `npm run og` | ✅ Uses the logo |
| **Production domain** | `VITE_SITE_URL` | Not set → canonicals/sitemap use `https://example.com` (build warns) |
| WhatsApp enquiry number | `VITE_WHATSAPP_NUMBER` | Defaults to +91 9886152172 — **confirm** |
| Brochure cross-check | `src/data/packages.ts` | Prices taken from the project brief; brochure not yet checked |
| Real portfolio projects | `src/data/portfolio.ts` | 8 entries, all labelled *Creative Concept* / *Demo Project* |
| Service area (for local SEO) | metadata / structured data | Not added — no location claimed until confirmed |
| GA4 ID / Search Console token | `VITE_GA_MEASUREMENT_ID`, `VITE_GSC_VERIFICATION` | Optional; off until set |
| Form delivery backend | `VITE_CONTACT_ENDPOINT` + Resend env vars | Off → form hands off to WhatsApp / email |
| Privacy policy review | `src/pages/Privacy.tsx` | Describes actual behaviour; needs professional review |

---

## Getting started

Requires **Node 20.19+ or 22.12+**.

```bash
npm install
cp .env.example .env      # then fill in values
npm run dev               # http://localhost:5173
```

| Command | What it does |
|---|---|
| `npm run dev` | Dev server with HMR |
| `npm run build` | Type-check → client build → SSR build → prerender all routes, `sitemap.xml`, `robots.txt`, `404.html` |
| `npm run preview` | Serve `dist/` like production (clean URLs, real 404s) on :4173 |
| `npm run typecheck` | TypeScript only |
| `npm run og` | Regenerate `public/og-image.png` |
| `npm run build:preview` | Self-contained preview build (relative paths, in-memory routing) |

Env vars prefixed `VITE_` are baked in at **build time**, so rebuild after changing them.

---

## Project structure

```
api/contact.ts            Serverless contact endpoint (Vercel) — validation, honeypot, rate limit, Resend email
scripts/prerender.mjs     Renders every route to HTML, adds preload hints, writes sitemap/robots/404
scripts/generate-og.mjs   Builds the social share image
src/
  data/                   ← ALL site content lives here
    site.ts               Contact details, nav, env config
    packages.ts           Package prices + inclusions + add-ons (from the brochure/brief)
    services.ts           Six services: card copy, full page content, SEO meta
    content.ts            Process, industries, "why us", homepage FAQ
    portfolio.ts          Portfolio entries (demo-labelled)
    routes.ts             Every route's title, description, breadcrumbs, sitemap priority
  lib/                    seo (head + JSON-LD), analytics (GA4, consent-gated), whatsapp, validation, motion prefs
  components/             Layout, header/mobile nav, hero + 3D, sections, portfolio, contact form
  pages/                  One file per page; registry.tsx handles code splitting
  styles/index.css        Design tokens (@theme), base styles, components
```

**To change copy or prices, edit `src/data/*` only** — every page reads from there.

### Design tokens
Defined in `src/styles/index.css` under `@theme`: colours (`navy-950` #080B18, `navy-800` #111747,
`electric` #343BFF, `bright` #5D72FF, `muted` #B9C1D9, `accent-text` — bright blue lifted for AA
contrast on navy), fonts (Manrope display, Inter body — self-hosted), fluid type scale
(`text-display`, `text-h1`…`text-lead`), radii and easing. Breakpoints: Tailwind defaults plus `xs` (480px).

---

## Features

- **Pages:** Home, About, Services, 6 service pages, Portfolio, Marketing Packages, Website Packages, Contact, Privacy Policy, custom 404.
- **Navigation:** desktop dropdowns (keyboard, Escape, outside-click), animated active indicator; mobile slide-out dialog with focus trap, scroll lock, focus return.
- **3D hero:** faceted metallic core, orbit rings, glass satellites, blue rim lighting, generated studio reflections (no HDR download), pointer parallax, entrance animation. Pauses off-screen. **Not loaded** with reduced motion, Save-Data, low memory/CPU or no WebGL; a server-rendered SVG composition is shown instead and crossfades to the canvas. Simplified scene below 768px. The headline and CTAs never wait on it.
- **Motion:** scroll reveals (transform/opacity only, content visible without JS), Motion loaded lazily via `LazyMotion`. Respects `prefers-reduced-motion`, plus a **"Reduce animations"** toggle in the footer that persists.
- **Pricing:** cards from data, Growth highlighted as Recommended, comparison tables, add-ons table, required notices.
- **Portfolio:** category filter (`aria-pressed`, live count), animated layout, native `<dialog>` with challenge / strategy / deliverables / results (results shown only when verified).
- **Contact:** all requested fields, client-side validation with error summary and focus management, prefill from `?service=&package=`, click-to-call, email, WhatsApp with URL-encoded enquiry.
- **SEO:** unique title/description/canonical/OG/Twitter per route, one H1 per page, BreadcrumbList, ProfessionalService + WebSite (home), Service + OfferCatalog (services/packages). No ratings or review schema. `sitemap.xml`, `robots.txt`, 301 redirects for common aliases.
- **Performance:** route-level code splitting with modulepreload hints, current route preloaded before hydration (no flash), font preloads, explicit sizes on images, no layout-shifting animations.

### How the contact form behaves
- **`VITE_CONTACT_ENDPOINT` empty (default):** buttons read *Send via WhatsApp* / *Send via email*. After validation they open WhatsApp or the visitor's email app pre-filled. The site never claims the enquiry was received.
- **Endpoint set:** posts JSON to it; shows "sent" only on a `{ ok: true }` response, otherwise an error with direct contact options.

---

## Enabling form delivery (Vercel + Resend)

1. Create a [Resend](https://resend.com) account, verify a sending domain, create an API key.
2. In Vercel → Project → Settings → Environment Variables add:
   `RESEND_API_KEY`, `CONTACT_TO_EMAIL` (e.g. ikommedia03@gmail.com), `CONTACT_FROM_EMAIL` (address on the verified domain), and `VITE_CONTACT_ENDPOINT=/api/contact`.
3. Redeploy, then **send a real test enquiry** and confirm it arrives before relying on it.

The endpoint re-validates with the same rules as the browser (`src/lib/validation.ts`), drops honeypot submissions, rate-limits per IP (in-memory, best effort; use a shared store such as Upstash for stronger limits) and never logs personal data. **It has not been tested against live Resend credentials.**

## Analytics (GA4)
Set `VITE_GA_MEASUREMENT_ID`. A consent banner then appears; gtag loads **only after "Accept analytics"**. Tracked events (no personal data): `consultation_cta_click`, `phone_click`, `email_click`, `whatsapp_click`, `contact_form_submit`, `pricing_cta_click`, plus page views on route change. Mark the conversion events as key events in GA4.

Search Console: set `VITE_GSC_VERIFICATION` (HTML-tag method), deploy, verify, then submit `https://<domain>/sitemap.xml`.

---

## Deployment

**Vercel (recommended):** import the repo; `vercel.json` sets the build command, output, clean URLs, redirects, caching and security headers. `api/contact.ts` deploys automatically.

**Netlify:** build `npm run build`, publish `dist`. `public/_redirects` holds the redirects; `dist/404.html` is served for unknown URLs. Port `api/contact.ts` to a Netlify Function if you need the endpoint.

**Any static host:** upload `dist/`. Serve `/<path>/index.html` for clean URLs and `404.html` with a 404 status.

---

## Replacing placeholders

- **Logo:** replace `public/brand/ikom-media-logo.{webp,png}` (white artwork on a transparent background) and update `width`/`height` in `src/components/Logo.tsx` if the proportions change. An SVG export from the designer would be sharper still. Header, footer and mobile nav all update.
- **Portfolio:** in `src/data/portfolio.ts` set `kind: "client"`, `label: "Client Project"`, add `image: { src, alt, width, height }` (put WebP/AVIF files in `public/portfolio/`), and only add `results` the client has verified.
- **Testimonials:** none are shown, and no review schema is emitted. Add only real, attributable quotes.

---

## Testing checklist

Verified on this build (headless Chromium, 390px and 1440px):
- [x] `npm run build` passes (typecheck, client, SSR, prerender of 14 routes + 404)
- [x] Every route: correct title, one H1, canonical, JSON-LD; 404 route returns HTTP 404 with `noindex`
- [x] No console errors or hydration warnings on any route
- [x] All internal links resolve to real routes
- [x] Mobile menu opens, traps focus, closes on Escape, returns focus; navigates
- [x] Pricing tabs switch with arrow keys
- [x] Portfolio filter and project dialog open/close
- [x] Contact form: prefill from URL, validation with error summary and first-field focus, WhatsApp URL correctly encoded
- [x] 3D scene renders with WebGL; CSS fallback renders without it

Still to do before launch:
- [ ] Set `VITE_SITE_URL` and rebuild
- [ ] Confirm WhatsApp number and brochure prices
- [ ] Real devices: iOS Safari, Android Chrome, tablet; check 3D performance on a mid-range phone
- [ ] Lighthouse / PageSpeed Insights on the deployed URL (targets: LCP ≤ 2.5 s, INP ≤ 200 ms, CLS ≤ 0.1; **not yet measured**)
- [ ] Screen reader pass (VoiceOver / NVDA) and keyboard-only pass
- [ ] If the form endpoint is enabled: live test submission, spam check
- [ ] GA4 events firing after consent (DebugView); Search Console verified and sitemap submitted
- [ ] Privacy policy reviewed by a qualified professional

### Known notes
- `three@0.186` logs a deprecation warning for `THREE.Clock` from inside React Three Fiber; it's harmless and will clear when R3F updates.
- The 3D chunk is ~243 KB gzipped; it never blocks first paint and is skipped on low-power devices.
