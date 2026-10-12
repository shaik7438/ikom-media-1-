/**
 * Portfolio entries.
 *
 * IMPORTANT: Every entry below is a DEMO / CREATIVE CONCEPT, not real client work.
 * They exist to show the layout and are labelled as such on the site.
 * Replace them with real projects (and set `kind: "client"`) once IKom Media supplies them.
 * Only fill `results` with figures the client has verified.
 */

export type PortfolioCategory = "social" | "branding" | "websites" | "campaigns" | "video";

export const PORTFOLIO_CATEGORIES: { id: PortfolioCategory; label: string }[] = [
  { id: "social", label: "Social media" },
  { id: "branding", label: "Branding" },
  { id: "websites", label: "Websites" },
  { id: "campaigns", label: "Campaign creatives" },
  { id: "video", label: "Video and reels" },
];

export type ProjectVisual = "grid-posts" | "brand-mark" | "browser" | "campaign" | "reel" | "palette";

export type Project = {
  id: string;
  kind: "demo" | "client";
  /** Label shown on the card. Demo entries must say "Demo Project" or "Creative Concept". */
  label: "Demo Project" | "Creative Concept" | "Client Project";
  title: string;
  industry: string;
  category: PortfolioCategory;
  summary: string;
  challenge: string;
  strategy: string;
  deliverables: string[];
  /** Verified results only. Leave empty for demos. */
  results?: string[];
  visual: ProjectVisual;
  /** Two-colour accent for the generated cover art */
  hue: [string, string];
  /** Optional real image (put files in /public/portfolio). Requires width/height to avoid layout shift. */
  image?: { src: string; alt: string; width: number; height: number };
};

export const PROJECTS: Project[] = [
  {
    id: "clinic-social",
    kind: "demo",
    label: "Creative Concept",
    title: "Calm, Credible Social Feed for a Wellness Clinic",
    industry: "Healthcare and wellness",
    category: "social",
    summary: "A concept content system that makes clinical information approachable without losing trust.",
    challenge: "Healthcare brands need to educate without overpromising, while staying visually consistent across weeks of content.",
    strategy: "Three content pillars (education, care team, patient journey) with a restrained palette and reusable carousel templates.",
    deliverables: ["Content pillars", "Carousel templates", "Story highlights", "Caption tone guide"],
    visual: "grid-posts",
    hue: ["#5D72FF", "#4ade9b"],
  },
  {
    id: "realty-brand",
    kind: "demo",
    label: "Creative Concept",
    title: "Identity Exploration for a Residential Developer",
    industry: "Real estate and construction",
    category: "branding",
    summary: "A concept identity built around structure, light and long-term trust.",
    challenge: "Property buyers make high-value decisions; the brand needs to feel established from the first touchpoint.",
    strategy: "An architectural monogram, a calm neutral palette with one confident accent, and a strict typographic system.",
    deliverables: ["Logo concept", "Colour and type system", "Signage mock-ups", "Brochure cover"],
    visual: "brand-mark",
    hue: ["#343BFF", "#B9C1D9"],
  },
  {
    id: "d2c-website",
    kind: "demo",
    label: "Demo Project",
    title: "Conversion-Focused Storefront for a D2C Brand",
    industry: "Retail and e-commerce",
    category: "websites",
    summary: "A demo storefront layout designed to shorten the path from product page to checkout.",
    challenge: "Shoppers arriving from ads on mobile need to understand the product and buy within a few taps.",
    strategy: "Mobile-first product pages, sticky add-to-cart, WhatsApp support entry point and a lightweight checkout flow.",
    deliverables: ["UX flow", "Product page design", "Responsive build", "WhatsApp integration"],
    visual: "browser",
    hue: ["#5D72FF", "#ff9f6b"],
  },
  {
    id: "restaurant-campaign",
    kind: "demo",
    label: "Creative Concept",
    title: "Festive Menu Launch Campaign",
    industry: "Food, hospitality and lifestyle",
    category: "campaigns",
    summary: "A concept campaign set for a limited-time menu, adapted across feed, story and ad formats.",
    challenge: "Limited-time offers need instant recognition and a clear call to action in a crowded feed.",
    strategy: "One bold key visual system, a countdown story sequence and ad variants for A/B testing.",
    deliverables: ["Key visual", "Ad variants", "Story sequence", "Menu highlight carousel"],
    visual: "campaign",
    hue: ["#ff7a8a", "#5D72FF"],
  },
  {
    id: "edu-reels",
    kind: "demo",
    label: "Creative Concept",
    title: "Explainer Reel Series for a Training Institute",
    industry: "Education and training",
    category: "video",
    summary: "A concept reel format that turns course outcomes into short, captioned explainers.",
    challenge: "Prospective students scroll fast; course value has to land in the first few seconds.",
    strategy: "Hook-first scripts, on-screen captions, consistent branded intros and a weekly publishing rhythm.",
    deliverables: ["Reel format", "Script templates", "Caption styling", "Cover frames"],
    visual: "reel",
    hue: ["#93a2ff", "#ffd36b"],
  },
  {
    id: "b2b-site",
    kind: "demo",
    label: "Demo Project",
    title: "Capability Website for a Manufacturing Firm",
    industry: "Manufacturing and B2B",
    category: "websites",
    summary: "A demo B2B website structure that presents capabilities clearly and routes buyers to an enquiry.",
    challenge: "B2B buyers want specifications, certifications and a fast way to request a quote.",
    strategy: "Capability-led navigation, downloadable spec sheets and an RFQ form on every product page.",
    deliverables: ["Information architecture", "UI design", "RFQ forms", "On-page SEO setup"],
    visual: "browser",
    hue: ["#4ade9b", "#5D72FF"],
  },
  {
    id: "salon-brand",
    kind: "demo",
    label: "Creative Concept",
    title: "Visual Refresh for a Neighbourhood Salon",
    industry: "Emerging and local businesses",
    category: "branding",
    summary: "A concept refresh that gives a local business a consistent look across signage, menu and social.",
    challenge: "Local businesses often grow with mismatched visuals across their storefront and pages.",
    strategy: "A simplified wordmark, a warm palette and templates the owner can reuse.",
    deliverables: ["Wordmark refresh", "Palette", "Price menu design", "Social templates"],
    visual: "palette",
    hue: ["#ffb4c6", "#343BFF"],
  },
  {
    id: "consult-social",
    kind: "demo",
    label: "Demo Project",
    title: "Thought-Leadership Carousels for a Consultancy",
    industry: "Professional services",
    category: "social",
    summary: "A demo carousel series that turns expertise into practical, shareable posts.",
    challenge: "Professional services sell trust; content needs to demonstrate expertise without jargon.",
    strategy: "Problem–insight–action carousels, a clean editorial layout and a consistent monthly rhythm.",
    deliverables: ["Carousel system", "Editorial calendar", "LinkedIn-ready formats"],
    visual: "grid-posts",
    hue: ["#93a2ff", "#B9C1D9"],
  },
];
