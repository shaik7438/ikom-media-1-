import { BRAND, CONTACT, GSC_VERIFICATION, SITE_URL } from "../data/site";
import { MARKETING_PACKAGES, WEBSITE_PACKAGES } from "../data/packages";
import { SERVICES } from "../data/services";
import type { RouteMeta } from "../data/routes";

export const OG_IMAGE = "/og-image.png";

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

export const absoluteUrl = (path: string) => `${SITE_URL}${path === "/" ? "/" : path}`;

const ORG_ID = `${SITE_URL}/#organization`;

/** Organization data — only verified facts from the brief (name, email, phones). No address, ratings or reviews. */
function organization() {
  return {
    "@type": "ProfessionalService",
    "@id": ORG_ID,
    name: BRAND.name,
    url: `${SITE_URL}/`,
    description: BRAND.supporting,
    email: CONTACT.email,
    telephone: CONTACT.phones[0].raw,
    image: absoluteUrl(OG_IMAGE),
    logo: absoluteUrl("/icon-512.png"),
    contactPoint: CONTACT.phones.map((p) => ({
      "@type": "ContactPoint",
      telephone: p.raw,
      email: CONTACT.email,
      contactType: "customer service",
      availableLanguage: ["English"],
    })),
    knowsAbout: SERVICES.map((s) => s.title),
  };
}

function breadcrumbs(meta: RouteMeta) {
  if (!meta.crumbs?.length) return null;
  const trail = [{ name: "Home", path: "/" }, ...meta.crumbs];
  const unique = trail.filter((c, i) => i === 0 || c.path !== trail[i - 1].path);
  return {
    "@type": "BreadcrumbList",
    itemListElement: unique.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: absoluteUrl(c.path),
    })),
  };
}

function offerCatalog(name: string, pkgs: typeof MARKETING_PACKAGES, monthly: boolean) {
  return {
    "@type": "OfferCatalog",
    name,
    itemListElement: pkgs.map((p) => ({
      "@type": "Offer",
      name: `${p.name} package`,
      priceCurrency: "INR",
      ...(monthly
        ? { priceSpecification: { "@type": "UnitPriceSpecification", price: p.amount, priceCurrency: "INR", unitText: "MONTH" } }
        : { priceSpecification: { "@type": "PriceSpecification", minPrice: p.amount, priceCurrency: "INR" } }),
      seller: { "@id": ORG_ID },
    })),
  };
}

export function structuredData(meta: RouteMeta): object[] {
  const graph: object[] = [];
  if (meta.path === "/") {
    graph.push(organization(), {
      "@type": "WebSite",
      "@id": `${SITE_URL}/#website`,
      url: `${SITE_URL}/`,
      name: BRAND.name,
      publisher: { "@id": ORG_ID },
    });
  }
  const service = SERVICES.find((s) => s.path === meta.path);
  if (service) {
    graph.push({
      "@type": "Service",
      name: service.title,
      serviceType: service.title,
      description: service.description,
      url: absoluteUrl(service.path),
      provider: { "@type": "ProfessionalService", "@id": ORG_ID, name: BRAND.name },
    });
  }
  if (meta.path === "/packages/marketing") {
    graph.push({
      "@type": "Service",
      name: "Social media and performance marketing retainers",
      provider: { "@type": "ProfessionalService", "@id": ORG_ID, name: BRAND.name },
      hasOfferCatalog: offerCatalog("Marketing packages", MARKETING_PACKAGES, true),
    });
  }
  if (meta.path === "/packages/website") {
    graph.push({
      "@type": "Service",
      name: "Website design and development",
      provider: { "@type": "ProfessionalService", "@id": ORG_ID, name: BRAND.name },
      hasOfferCatalog: offerCatalog("Website packages", WEBSITE_PACKAGES, false),
    });
  }
  const bc = breadcrumbs(meta);
  if (bc) graph.push(bc);
  return graph;
}

export function jsonLdString(meta: RouteMeta): string {
  const graph = structuredData(meta);
  if (!graph.length) return "";
  // Escape "<" so the JSON can't close the script tag.
  return JSON.stringify({ "@context": "https://schema.org", "@graph": graph }).replace(/</g, "\\u003c");
}

/** Full <head> markup for a route. Used by the prerenderer. */
export function headTags(meta: RouteMeta): string {
  const url = absoluteUrl(meta.path);
  const tags = [
    `<title>${esc(meta.title)}</title>`,
    `<meta name="description" content="${esc(meta.description)}" />`,
    meta.noindex
      ? `<meta name="robots" content="noindex, follow" />`
      : `<link rel="canonical" href="${esc(url)}" />`,
    `<meta property="og:type" content="website" />`,
    `<meta property="og:site_name" content="${esc(BRAND.name)}" />`,
    `<meta property="og:title" content="${esc(meta.title)}" />`,
    `<meta property="og:description" content="${esc(meta.description)}" />`,
    `<meta property="og:url" content="${esc(url)}" />`,
    `<meta property="og:image" content="${esc(absoluteUrl(OG_IMAGE))}" />`,
    `<meta property="og:image:width" content="1200" />`,
    `<meta property="og:image:height" content="630" />`,
    `<meta property="og:locale" content="en_IN" />`,
    `<meta name="twitter:card" content="summary_large_image" />`,
    `<meta name="twitter:title" content="${esc(meta.title)}" />`,
    `<meta name="twitter:description" content="${esc(meta.description)}" />`,
    `<meta name="twitter:image" content="${esc(absoluteUrl(OG_IMAGE))}" />`,
  ];
  if (GSC_VERIFICATION) tags.push(`<meta name="google-site-verification" content="${esc(GSC_VERIFICATION)}" />`);
  const ld = jsonLdString(meta);
  if (ld) tags.push(`<script type="application/ld+json" id="ld-json">${ld}</script>`);
  return tags.join("\n    ");
}
