/**
 * Single source of truth for brand + contact details.
 * Everything here comes from the IKom Media brief. Do not add unverified claims.
 */

const env = import.meta.env;

/** Production domain. Set VITE_SITE_URL before launch — canonical URLs and the sitemap depend on it. */
export const SITE_URL = (env.VITE_SITE_URL || "https://example.com").replace(/\/+$/, "");
export const SITE_URL_CONFIGURED = Boolean(env.VITE_SITE_URL);

export const BRAND = {
  name: "IKom Media",
  tagline: "We Don't Just Manage Social Media. We Build Brands That Get Noticed.",
  supporting:
    "A modern digital marketing partner for brands that want to look credible, communicate clearly and turn attention into business.",
  philosophy: ["Strategy", "Creativity", "Performance", "Growth"],
} as const;

export const CONTACT = {
  phones: [
    { display: "+91 98861 52172", raw: "+919886152172", label: "+91 9886152172" },
    { display: "+91 88618 72126", raw: "+918861872126", label: "+91 8861872126" },
  ],
  email: "ikommedia03@gmail.com",
  /** Number that receives WhatsApp enquiries. Confirm with IKom Media; override with VITE_WHATSAPP_NUMBER. */
  whatsapp: (env.VITE_WHATSAPP_NUMBER || "919886152172").replace(/\D/g, ""),
} as const;

export const GA_ID: string = env.VITE_GA_MEASUREMENT_ID || "";
export const GSC_VERIFICATION: string = env.VITE_GSC_VERIFICATION || "";
export const CONTACT_ENDPOINT: string = env.VITE_CONTACT_ENDPOINT || "";

export type NavItem = { label: string; to: string; children?: { label: string; to: string; description?: string }[] };

export const NAV: NavItem[] = [
  { label: "About", to: "/about" },
  {
    label: "Services",
    to: "/services",
    children: [
      { label: "Social Media Management", to: "/services/social-media-management" },
      { label: "Performance Marketing", to: "/services/performance-marketing" },
      { label: "Creative & Content Production", to: "/services/creative-content-production" },
      { label: "Website Design & Development", to: "/services/website-design-development" },
      { label: "SEO Services", to: "/services/seo" },
      { label: "Branding & Digital Strategy", to: "/services/branding-digital-strategy" },
    ],
  },
  { label: "Portfolio", to: "/portfolio" },
  {
    label: "Packages",
    to: "/packages/marketing",
    children: [
      { label: "Marketing Packages", to: "/packages/marketing", description: "Monthly social + ads retainers" },
      { label: "Website Packages", to: "/packages/website", description: "Fixed-scope website builds" },
    ],
  },
  { label: "Contact", to: "/contact" },
];
