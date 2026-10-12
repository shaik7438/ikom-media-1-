import { SERVICES } from "./services";

export type Crumb = { name: string; path: string };

export type RouteMeta = {
  path: string;
  title: string;
  description: string;
  /** Breadcrumb trail, excluding Home (added automatically) */
  crumbs?: Crumb[];
  /** Exclude from sitemap and add noindex */
  noindex?: boolean;
  /** sitemap priority hint */
  priority?: number;
  changefreq?: "weekly" | "monthly" | "yearly";
};

const SERVICES_CRUMB: Crumb = { name: "Services", path: "/services" };

export const ROUTES: RouteMeta[] = [
  {
    path: "/",
    title: "IKom Media | Digital Marketing, Branding & Web Development",
    description:
      "Build a stronger digital presence with IKom Media. Explore social media management, performance marketing, creative production, website development and SEO.",
    priority: 1,
    changefreq: "monthly",
  },
  {
    path: "/about",
    title: "About IKom Media | Strategy, Creativity, Performance",
    description:
      "IKom Media is a digital marketing and creative agency helping businesses build recognizable brands, communicate their value and reach the right audience.",
    crumbs: [{ name: "About Us", path: "/about" }],
    priority: 0.7,
  },
  {
    path: "/services",
    title: "Digital Marketing & Web Services | IKom Media",
    description:
      "Social media management, performance marketing, creative production, website development, SEO and branding: everything your brand needs, from one team.",
    crumbs: [SERVICES_CRUMB],
    priority: 0.9,
  },
  ...SERVICES.map<RouteMeta>((s) => ({
    path: s.path,
    title: s.seo.title,
    description: s.seo.description,
    crumbs: [SERVICES_CRUMB, { name: s.title, path: s.path }],
    priority: 0.8,
  })),
  {
    path: "/portfolio",
    title: "Portfolio & Creative Concepts | IKom Media",
    description:
      "Explore IKom Media's creative concepts and demo projects across social media, branding, websites, campaign creatives and video.",
    crumbs: [{ name: "Portfolio", path: "/portfolio" }],
    priority: 0.6,
  },
  {
    path: "/packages/marketing",
    title: "Social Media & Marketing Packages from ₹14,999/month | IKom Media",
    description:
      "Compare IKom Media's Starter, Growth and Scale marketing packages: social media content, reels, Meta Ads management and monthly reporting.",
    crumbs: [{ name: "Marketing Packages", path: "/packages/marketing" }],
    priority: 0.9,
  },
  {
    path: "/packages/website",
    title: "Website Design Packages from ₹14,999 | IKom Media",
    description:
      "Compare IKom Media's Basic, Silver and Gold website packages: responsive custom design, WhatsApp and enquiry forms, SEO setup and support.",
    crumbs: [{ name: "Website Packages", path: "/packages/website" }],
    priority: 0.9,
  },
  {
    path: "/contact",
    title: "Contact IKom Media | Book a Free Consultation",
    description:
      "Talk to IKom Media about social media, ads, content, websites or SEO. Call +91 9886152172, email ikommedia03@gmail.com or send an enquiry.",
    crumbs: [{ name: "Contact Us", path: "/contact" }],
    priority: 0.8,
  },
  {
    path: "/privacy-policy",
    title: "Privacy Policy | IKom Media",
    description: "How IKom Media collects, uses and protects information submitted through this website.",
    crumbs: [{ name: "Privacy Policy", path: "/privacy-policy" }],
    priority: 0.2,
    changefreq: "yearly",
  },
];

export const NOT_FOUND_META: RouteMeta = {
  path: "/404",
  title: "Page Not Found | IKom Media",
  description: "The page you're looking for doesn't exist or has moved.",
  noindex: true,
};

export function getRouteMeta(pathname: string): RouteMeta {
  const clean = pathname.length > 1 ? pathname.replace(/\/+$/, "") : pathname;
  return ROUTES.find((r) => r.path === clean) ?? NOT_FOUND_META;
}
