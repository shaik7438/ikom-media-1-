/**
 * Package pricing and inclusions — transcribed exactly from the IKom Media brief.
 * If the brochure changes, update this file only; every page reads from here.
 */

export type Package = {
  id: string;
  name: string;
  price: string;
  /** Text after the price, e.g. "/month" or "onwards" */
  suffix: string;
  /** Machine-readable starting price in INR, used for structured data */
  amount: number;
  summary?: string;
  recommended?: boolean;
  features: string[];
};

export const MARKETING_PACKAGES: Package[] = [
  {
    id: "starter",
    name: "Starter",
    price: "₹14,999",
    suffix: "/month",
    amount: 14999,
    summary: "For brands building a professional presence.",
    features: [
      "2 social media platforms",
      "4 static/carousel posts per month",
      "4 reels per month",
      "4 stories per month",
      "Creative design",
      "Captions and hashtags",
      "Monthly content calendar",
      "Basic page management",
      "Meta Ads management, up to 2 campaigns",
      "Ad optimization",
      "Monthly performance report",
    ],
  },
  {
    id: "growth",
    name: "Growth",
    price: "₹24,999",
    suffix: "/month",
    amount: 24999,
    summary: "More content volume, strategy and community management.",
    recommended: true,
    features: [
      "2 social media platforms",
      "12 static/carousel posts per month",
      "8 reels per month",
      "8 stories per month",
      "Premium creative design",
      "Professional reel editing",
      "Captions and hashtag strategy",
      "Content strategy",
      "Community management",
      "Competitor analysis",
      "Meta Ads management, up to 4 campaigns",
      "Ad optimization",
      "Detailed monthly report",
    ],
  },
  {
    id: "scale",
    name: "Scale",
    price: "₹34,999",
    suffix: "/month",
    amount: 34999,
    summary: "Three platforms, the highest output and monthly strategy time.",
    features: [
      "3 social media platforms",
      "16 static/carousel posts per month",
      "12 reels per month",
      "15 stories per month",
      "Advanced reel editing",
      "Content strategy",
      "Captions and hashtag strategy",
      "Full community management",
      "Competitor and market analysis",
      "Meta Ads management, 6–8 campaigns",
      "Continuous ad optimization",
      "Monthly strategy consultation",
      "Monthly strategy and performance report",
    ],
  },
];

export const MARKETING_NOTICE =
  "Marketing retainers require a minimum three-month commitment. Advertising spend is separate and billed at actuals. Final deliverables are governed by the agreed scope.";

export const WEBSITE_PACKAGES: Package[] = [
  {
    id: "basic",
    name: "Basic",
    price: "₹14,999",
    suffix: "+",
    amount: 14999,
    summary: "A professional starter website.",
    features: [
      "Up to 5 pages",
      "Responsive design",
      "Mobile and tablet optimization",
      "Custom UI design",
      "Contact form",
      "WhatsApp integration",
      "Google Maps integration",
      "Basic SEO setup",
      "Social media integration",
      "Speed optimization",
      "Basic website analytics",
      "One month of basic support",
    ],
  },
  {
    id: "silver",
    name: "Silver",
    price: "₹24,999",
    suffix: "+",
    amount: 24999,
    summary: "More pages, lead generation and a blog.",
    features: [
      "Up to 10 pages",
      "Premium custom design",
      "Fully responsive layouts",
      "Advanced UI/UX",
      "WhatsApp integration",
      "Contact and enquiry forms",
      "Google Maps integration",
      "Social media integration",
      "Basic on-page SEO",
      "Google Analytics and Search Console setup",
      "Speed optimization",
      "Lead-generation sections",
      "Testimonials and reviews section",
      "Blog section",
      "One revision round",
      "Three months of support",
    ],
  },
  {
    id: "gold",
    name: "Gold",
    price: "₹49,999",
    suffix: "+",
    amount: 49999,
    summary: "A larger, animated, conversion-focused website.",
    features: [
      "15+ pages",
      "Premium custom UI/UX",
      "Advanced responsive design",
      "Custom animations and interactions",
      "Advanced lead-generation sections",
      "Multiple enquiry forms",
      "WhatsApp integration",
      "Google Maps integration",
      "Advanced SEO setup",
      "Google Analytics and Search Console",
      "Speed and performance optimization",
      "Blog/CMS integration",
      "Testimonials and reviews",
      "Portfolio/project showcase",
      "Conversion-focused landing sections",
      "Three revision rounds",
      "Six months of support",
    ],
  },
];

export const WEBSITE_NOTICE =
  "Website pricing starts at the listed amount and may vary based on page count, integrations, content requirements and project complexity.";

export type AddOn = { name: string; price: string; group: "web" | "marketing" | "creative" | "custom" };

/** Optional services, billed separately — never included in a package unless listed in that package. */
export const ADD_ONS: AddOn[] = [
  { name: "Extra website page", price: "₹1,000/page", group: "web" },
  { name: "Landing page", price: "₹3,500 onwards", group: "web" },
  { name: "Website maintenance", price: "₹2,500/month onwards", group: "web" },
  { name: "E-commerce website", price: "₹39,999 onwards", group: "web" },
  { name: "SEO", price: "₹5,000/month onwards", group: "marketing" },
  { name: "Google Ads management", price: "From ₹5,000/month", group: "marketing" },
  { name: "Professional copywriting", price: "₹2,500 onwards", group: "creative" },
  { name: "Extra reel", price: "₹1,000", group: "creative" },
  { name: "Extra creative", price: "₹500", group: "creative" },
  { name: "Professional photoshoot", price: "From ₹3,000", group: "creative" },
  { name: "Logo and brand identity", price: "Custom quote", group: "custom" },
  { name: "Influencer marketing", price: "Custom quote", group: "custom" },
  { name: "Advanced web applications", price: "Custom quote", group: "custom" },
];

export const addOn = (name: string) => ADD_ONS.find((a) => a.name === name)!;
