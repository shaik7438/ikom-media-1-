import type { LucideIcon } from "lucide-react";
import { Clapperboard, Gauge, MonitorSmartphone, Palette, Search, Share2 } from "lucide-react";

export type ServiceSlug =
  | "social-media-management"
  | "performance-marketing"
  | "creative-content-production"
  | "website-design-development"
  | "seo"
  | "branding-digital-strategy";

export type Service = {
  slug: ServiceSlug;
  path: string;
  title: string;
  /** Short title used in nav, cards and breadcrumbs */
  shortTitle: string;
  icon: LucideIcon;
  /** Card description (from the brief, verbatim) */
  description: string;
  /** Card tags */
  includes: string[];
  page: {
    h1: string;
    intro: string;
    /** Detailed deliverables with one-line explanations */
    deliverables: { title: string; text: string }[];
    goodFitFor: string[];
    howWeWork: string[];
    pricing: {
      heading: string;
      text: string;
      /** Link to packages page, or none for custom quotes */
      link?: { label: string; to: string };
      /** Specific add-on prices from the brochure */
      items?: { name: string; price: string }[];
    };
    faqs: { q: string; a: string }[];
    related: ServiceSlug[];
  };
  seo: { title: string; description: string };
};

export const SERVICES: Service[] = [
  {
    slug: "social-media-management",
    path: "/services/social-media-management",
    title: "Social Media Management",
    shortTitle: "Social Media",
    icon: Share2,
    description:
      "Build a consistent, professional social presence that communicates your brand clearly and keeps your audience engaged.",
    includes: ["Content calendars", "Post design", "Reels", "Captions & hashtags", "Page management", "Community engagement"],
    page: {
      h1: "Social Media Management That Keeps Your Brand Consistent",
      intro:
        "Posting occasionally isn't the same as having a presence. We plan, design, write and publish your content every month, so your pages look professional, stay active and say the same thing your business stands for.",
      deliverables: [
        { title: "Monthly content calendar", text: "A planned month of posts, reels and stories mapped to your offers, seasons and priorities." },
        { title: "Post and carousel design", text: "On-brand static and carousel creatives designed for each platform's format." },
        { title: "Reels and stories", text: "Short-form video and story content edited for attention and clarity." },
        { title: "Captions and hashtags", text: "Copy written in your brand voice with relevant hashtag research." },
        { title: "Page management", text: "Profile upkeep and scheduled publishing so your pages stay current." },
        { title: "Community engagement", text: "Responding to comments and messages within the agreed scope (Growth and Scale packages)." },
      ],
      goodFitFor: [
        "Businesses whose pages are inactive or inconsistent",
        "Owners who don't have time to create content every week",
        "Brands that want social media and Meta Ads handled by one team",
      ],
      howWeWork: [
        "We review your business, audience and current pages.",
        "We agree on platforms, content pillars and the monthly volume in your package.",
        "Each month's calendar is shared before production starts.",
        "Content is designed, written and scheduled, then reviewed against the monthly report.",
      ],
      pricing: {
        heading: "Included in every marketing package",
        text: "Social media management is part of the Starter, Growth and Scale retainers. Each package sets the number of platforms, posts, reels and stories per month.",
        link: { label: "Compare marketing packages", to: "/packages/marketing" },
        items: [
          { name: "Extra reel", price: "₹1,000" },
          { name: "Extra creative", price: "₹500" },
        ],
      },
      faqs: [
        {
          q: "Which platforms do you manage?",
          a: "Starter and Growth cover two social media platforms; Scale covers three. We'll recommend which platforms suit your audience during the consultation.",
        },
        {
          q: "Do I get to approve content before it's posted?",
          a: "Yes. The monthly content calendar is shared with you before content goes live.",
        },
        {
          q: "Can I add more reels or posts in a month?",
          a: "Yes. Extra reels are ₹1,000 each and extra creatives are ₹500 each, on top of your package.",
        },
      ],
      related: ["creative-content-production", "performance-marketing", "branding-digital-strategy"],
    },
    seo: {
      title: "Social Media Management Services | IKom Media",
      description:
        "Monthly content calendars, post design, reels, captions and community management from IKom Media. Plans start at ₹14,999/month.",
    },
  },
  {
    slug: "performance-marketing",
    path: "/services/performance-marketing",
    title: "Performance Marketing",
    shortTitle: "Performance Marketing",
    icon: Gauge,
    description:
      "Put your campaigns in front of relevant audiences and optimize them around meaningful business objectives.",
    includes: ["Meta Ads", "Google Ads management", "Audience targeting", "Campaign optimization", "Reporting"],
    page: {
      h1: "Performance Marketing Built Around Your Business Objectives",
      intro:
        "Paid campaigns work best when they're tied to a clear goal: enquiries, store visits, sales or awareness. We set up, run and refine Meta and Google campaigns around the objective you actually care about, and report on what happened in plain language.",
      deliverables: [
        { title: "Meta Ads management", text: "Facebook and Instagram campaigns set up, launched and managed within your package's campaign limit." },
        { title: "Google Ads management", text: "Search and other Google campaigns, available as a separate service from ₹5,000/month." },
        { title: "Audience targeting", text: "Audiences defined around location, interests, behaviour and your existing customers where available." },
        { title: "Campaign optimization", text: "Ongoing adjustments to budgets, audiences and creatives based on results." },
        { title: "Performance reporting", text: "Monthly reports explaining spend, results and what we're changing next." },
      ],
      goodFitFor: [
        "Businesses ready to put an advertising budget behind their offers",
        "Brands running ads themselves without clear tracking or reporting",
        "Teams that want ads and the creatives behind them managed together",
      ],
      howWeWork: [
        "We agree on the campaign objective and how success will be measured.",
        "We plan audiences, budgets and creatives for each campaign.",
        "Campaigns launch once tracking and creatives are approved.",
        "We monitor and optimize, then report monthly.",
      ],
      pricing: {
        heading: "How performance marketing is priced",
        text: "Meta Ads management is included in every marketing package (2 campaigns on Starter, up to 4 on Growth, 6–8 on Scale). Advertising spend is separate and billed at actuals.",
        link: { label: "Compare marketing packages", to: "/packages/marketing" },
        items: [{ name: "Google Ads management", price: "From ₹5,000/month" }],
      },
      faqs: [
        {
          q: "Is advertising spend included in the package price?",
          a: "No. Package fees cover management. Ad spend is paid separately and billed at actuals.",
        },
        {
          q: "Do you guarantee a certain number of leads or sales?",
          a: "No. Results depend on your offer, budget, market and many factors outside anyone's control. We commit to clear objectives, careful optimization and honest reporting.",
        },
        {
          q: "Can you manage Google Ads too?",
          a: "Yes. Google Ads management is available from ₹5,000/month, separately from the marketing packages.",
        },
      ],
      related: ["social-media-management", "creative-content-production", "seo"],
    },
    seo: {
      title: "Performance Marketing: Meta & Google Ads | IKom Media",
      description:
        "Meta Ads and Google Ads management with audience targeting, ongoing optimization and clear monthly reporting from IKom Media.",
    },
  },
  {
    slug: "creative-content-production",
    path: "/services/creative-content-production",
    title: "Creative & Content Production",
    shortTitle: "Creative & Content",
    icon: Clapperboard,
    description:
      "Make your brand memorable with visual storytelling designed to capture attention and communicate value.",
    includes: ["Reels", "Video editing", "Campaign creatives", "Branded graphics", "Photoshoots", "Copywriting"],
    page: {
      h1: "Creative & Content Production That Communicates Value",
      intro:
        "Good content earns attention and explains why your business is worth choosing. We produce reels, graphics, campaign creatives, photography and copy that look consistent and carry a clear message.",
      deliverables: [
        { title: "Reels and video editing", text: "Short-form video edited for pacing, captions and platform formats." },
        { title: "Campaign creatives", text: "Ad and launch creatives designed around one clear message and call to action." },
        { title: "Branded graphics", text: "Social posts, carousels and visual assets that follow your brand style." },
        { title: "Professional photoshoots", text: "Product, space or team photography for your website and social channels." },
        { title: "Copywriting", text: "Website copy, captions and campaign messaging written for your audience." },
      ],
      goodFitFor: [
        "Brands with an active page but weak or inconsistent visuals",
        "Launches and campaigns that need a dedicated creative set",
        "Businesses that need original photos instead of stock imagery",
      ],
      howWeWork: [
        "We agree on the message, format and where each piece will be used.",
        "We plan shots, scripts or layouts before production.",
        "Content is produced and shared for review.",
        "Final files are delivered in the formats each platform needs.",
      ],
      pricing: {
        heading: "Creative pricing",
        text: "Creative production is included in every marketing package. Individual pieces can also be added on.",
        link: { label: "See all add-on services", to: "/packages/marketing#add-ons" },
        items: [
          { name: "Extra reel", price: "₹1,000" },
          { name: "Extra creative", price: "₹500" },
          { name: "Professional photoshoot", price: "From ₹3,000" },
          { name: "Professional copywriting", price: "₹2,500 onwards" },
        ],
      },
      faqs: [
        {
          q: "Can I order creatives without a monthly package?",
          a: "Yes. Contact us with what you need and we'll confirm scope and pricing based on the listed add-on rates.",
        },
        {
          q: "Do you write the copy as well as the design?",
          a: "Yes. Captions are included in marketing packages, and professional copywriting is available from ₹2,500.",
        },
      ],
      related: ["social-media-management", "branding-digital-strategy", "performance-marketing"],
    },
    seo: {
      title: "Creative & Content Production: Reels, Design, Photography | IKom Media",
      description:
        "Reels, video editing, campaign creatives, branded graphics, photoshoots and copywriting from IKom Media. Creatives from ₹500, reels from ₹1,000.",
    },
  },
  {
    slug: "website-design-development",
    path: "/services/website-design-development",
    title: "Website Design & Development",
    shortTitle: "Websites",
    icon: MonitorSmartphone,
    description:
      "Give your business a professional digital home that builds trust, explains your services and makes enquiries easy.",
    includes: ["Responsive websites", "Landing pages", "UI/UX", "WhatsApp integration", "Enquiry forms", "E-commerce"],
    page: {
      h1: "Website Design & Development That Makes Enquiries Easy",
      intro:
        "Your website is often the first serious look someone takes at your business. We design and build fast, responsive websites that explain what you do, build trust and give visitors an easy way to get in touch.",
      deliverables: [
        { title: "Custom UI/UX design", text: "Layouts designed around your services and the actions you want visitors to take." },
        { title: "Responsive development", text: "Built to work on phones, tablets, laptops and large screens." },
        { title: "Enquiry forms and WhatsApp", text: "Contact forms, click-to-call and WhatsApp enquiry buttons." },
        { title: "Landing pages", text: "Focused single pages for campaigns and offers, from ₹3,500." },
        { title: "E-commerce", text: "Online stores with product catalogues and checkout, from ₹39,999." },
        { title: "Analytics and SEO foundations", text: "Google Analytics, Search Console and on-page SEO setup, depending on package." },
      ],
      goodFitFor: [
        "Businesses without a website, or with an outdated one",
        "Brands running ads that need a page built to convert",
        "Sellers ready to take orders online",
      ],
      howWeWork: [
        "We map out pages, content and the enquiry journey.",
        "We design the key screens and agree on the look and feel.",
        "We develop, connect forms and integrations, and test across devices.",
        "We launch, set up analytics where included, and support you for the package period.",
      ],
      pricing: {
        heading: "Website packages",
        text: "Basic from ₹14,999, Silver from ₹24,999 and Gold from ₹49,999. Final pricing depends on page count, integrations, content and complexity.",
        link: { label: "Compare website packages", to: "/packages/website" },
        items: [
          { name: "Landing page", price: "₹3,500 onwards" },
          { name: "E-commerce website", price: "₹39,999 onwards" },
          { name: "Extra website page", price: "₹1,000/page" },
          { name: "Website maintenance", price: "₹2,500/month onwards" },
        ],
      },
      faqs: [
        {
          q: "Will my website work on mobile?",
          a: "Yes. Every package includes responsive design for phones, tablets and desktops.",
        },
        {
          q: "Can you build a fully custom website?",
          a: "Yes. All packages use custom UI design. Larger or more complex builds, including advanced web applications, are quoted individually.",
        },
        {
          q: "What happens after launch?",
          a: "Each package includes a support period: one month (Basic), three months (Silver) or six months (Gold). Ongoing maintenance is available from ₹2,500/month.",
        },
      ],
      related: ["seo", "branding-digital-strategy", "performance-marketing"],
    },
    seo: {
      title: "Website Design & Development | IKom Media",
      description:
        "Responsive, custom-designed websites with enquiry forms, WhatsApp integration and SEO setup. Website packages from ₹14,999.",
    },
  },
  {
    slug: "seo",
    path: "/services/seo",
    title: "SEO & Organic Growth",
    shortTitle: "SEO",
    icon: Search,
    description:
      "Improve your website's discoverability with relevant content, sound technical foundations and search-focused optimization.",
    includes: ["Keyword research", "On-page SEO", "Technical SEO", "Content optimization", "Search performance monitoring"],
    page: {
      h1: "SEO Services for Steady, Organic Discoverability",
      intro:
        "SEO is the long-term work of making your website easier for search engines to understand and more useful to the people searching. We focus on the fundamentals: relevant keywords, clean technical foundations and content that answers real questions.",
      deliverables: [
        { title: "Keyword research", text: "Identifying the searches that match your services and audience." },
        { title: "On-page SEO", text: "Titles, descriptions, headings, internal links and content structure." },
        { title: "Technical SEO", text: "Crawlability, sitemaps, page speed, mobile usability and structured data." },
        { title: "Content optimization", text: "Improving existing pages and planning new content around search intent." },
        { title: "Search performance monitoring", text: "Tracking visibility and traffic trends in Google Search Console." },
      ],
      goodFitFor: [
        "Businesses with a website that isn't getting found",
        "Brands that want to reduce reliance on paid ads over time",
        "New websites that need a sound SEO foundation from day one",
      ],
      howWeWork: [
        "We audit your website and current search visibility.",
        "We prioritize fixes and keyword opportunities.",
        "We implement technical and on-page improvements.",
        "We monitor performance monthly and refine the plan.",
      ],
      pricing: {
        heading: "SEO pricing",
        text: "Monthly SEO starts at ₹5,000/month. Website packages also include basic or advanced SEO setup at launch.",
        link: { label: "Start an SEO conversation", to: "/contact?service=seo" },
        items: [{ name: "SEO", price: "₹5,000/month onwards" }],
      },
      faqs: [
        {
          q: "Can you guarantee a #1 ranking on Google?",
          a: "No, and no one honestly can. Rankings depend on competition, search engine changes and many factors outside our control. We follow sound SEO practices and report progress transparently.",
        },
        {
          q: "How long does SEO take to show results?",
          a: "SEO is a long-term effort. Technical fixes can be made quickly, but changes in visibility usually take months, not weeks.",
        },
      ],
      related: ["website-design-development", "creative-content-production", "performance-marketing"],
    },
    seo: {
      title: "SEO Services: Technical, On-Page & Content SEO | IKom Media",
      description:
        "Keyword research, on-page and technical SEO, content optimization and monthly monitoring from IKom Media. SEO from ₹5,000/month.",
    },
  },
  {
    slug: "branding-digital-strategy",
    path: "/services/branding-digital-strategy",
    title: "Branding & Digital Strategy",
    shortTitle: "Branding & Strategy",
    icon: Palette,
    description: "Create a clearer identity and a more consistent message across your digital touchpoints.",
    includes: ["Brand identity", "Brand messaging", "Creative direction", "Digital campaign planning"],
    page: {
      h1: "Branding & Digital Strategy for a Clearer, More Consistent Brand",
      intro:
        "When your logo, colours, message and content all point the same way, people remember you more easily. We help define how your brand looks and sounds, then plan how it shows up across your website, social media and campaigns.",
      deliverables: [
        { title: "Brand identity", text: "Logo and visual identity: colours, typography and usage guidance." },
        { title: "Brand messaging", text: "Positioning, key messages and tone of voice your team can use consistently." },
        { title: "Creative direction", text: "A clear visual direction for content, campaigns and photography." },
        { title: "Digital campaign planning", text: "Campaign concepts and channel plans tied to business goals." },
      ],
      goodFitFor: [
        "New businesses building an identity from scratch",
        "Established brands whose visuals and messaging have drifted",
        "Businesses preparing for a launch or repositioning",
      ],
      howWeWork: [
        "We learn about your business, audience and competitors.",
        "We define positioning and messaging direction.",
        "We develop the visual identity and creative direction.",
        "We plan how the brand rolls out across your digital channels.",
      ],
      pricing: {
        heading: "Custom-quoted",
        text: "Branding work varies widely in scope, so logo and brand identity projects, influencer marketing and advanced web applications are quoted individually.",
        link: { label: "Request a quote", to: "/contact?service=branding" },
        items: [
          { name: "Logo and brand identity", price: "Custom quote" },
          { name: "Influencer marketing", price: "Custom quote" },
        ],
      },
      faqs: [
        {
          q: "Do you design logos?",
          a: "Yes. Logo and brand identity projects are quoted based on scope.",
        },
        {
          q: "Can strategy be combined with a marketing package?",
          a: "Yes. Content strategy is part of the Growth and Scale packages, and Scale includes a monthly strategy consultation.",
        },
      ],
      related: ["creative-content-production", "website-design-development", "social-media-management"],
    },
    seo: {
      title: "Branding & Digital Strategy | IKom Media",
      description:
        "Brand identity, messaging, creative direction and digital campaign planning to give your business a clear, consistent presence.",
    },
  },
];

export const serviceBySlug = (slug: ServiceSlug) => SERVICES.find((s) => s.slug === slug)!;
