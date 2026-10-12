import type { LucideIcon } from "lucide-react";
import {
  Briefcase,
  Building2,
  Compass,
  Factory,
  GraduationCap,
  HeartPulse,
  Layers,
  LineChart,
  MessagesSquare,
  Rocket,
  Search,
  ShoppingBag,
  Sparkles,
  Store,
  Target,
  UtensilsCrossed,
  Workflow,
  PenTool,
  Scale,
} from "lucide-react";

export const PROCESS: { n: string; title: string; text: string; icon: LucideIcon }[] = [
  { n: "01", title: "Discover", text: "We understand your business, audience, challenges and goals.", icon: Search },
  { n: "02", title: "Strategize", text: "We develop a focused plan for content, campaigns and digital experiences.", icon: Compass },
  { n: "03", title: "Create", text: "We bring the strategy to life through design, content and development.", icon: PenTool },
  { n: "04", title: "Launch", text: "We publish, deploy or activate the agreed deliverables.", icon: Rocket },
  { n: "05", title: "Optimize", text: "We review performance, identify improvements and refine the next steps.", icon: LineChart },
];

export const INDUSTRIES: { name: string; icon: LucideIcon }[] = [
  { name: "Healthcare and wellness", icon: HeartPulse },
  { name: "Real estate and construction", icon: Building2 },
  { name: "Retail and e-commerce", icon: ShoppingBag },
  { name: "Food, hospitality and lifestyle", icon: UtensilsCrossed },
  { name: "Professional services", icon: Briefcase },
  { name: "Education and training", icon: GraduationCap },
  { name: "Manufacturing and B2B", icon: Factory },
  { name: "Emerging and local businesses", icon: Store },
];

export const WHY_US: { title: string; text: string; icon: LucideIcon }[] = [
  {
    title: "Strategy before execution",
    text: "Every brief starts with your goals and audience, so the work has a reason behind it.",
    icon: Target,
  },
  {
    title: "Creative work with a clear purpose",
    text: "Design and content are made to communicate something specific, not just to fill a feed.",
    icon: Sparkles,
  },
  {
    title: "Connected digital services",
    text: "Social, ads, content, website and SEO handled by one team, so your message stays consistent.",
    icon: Layers,
  },
  {
    title: "Clear scope and communication",
    text: "You know what's included each month, what costs extra and what we're working on.",
    icon: MessagesSquare,
  },
  {
    title: "Performance-aware optimization",
    text: "We review what's working and adjust campaigns and content based on results.",
    icon: Workflow,
  },
  {
    title: "Flexible solutions for different business needs",
    text: "Packages for different stages, plus add-ons and custom quotes when you need something specific.",
    icon: Scale,
  },
];

export const FAQS: { q: string; a: string }[] = [
  {
    q: "What services does IKom Media offer?",
    a: "Social media management, performance marketing (Meta Ads and Google Ads), creative and content production, website design and development, SEO, and branding and digital strategy.",
  },
  {
    q: "How do I choose the right marketing package?",
    a: "Starter (₹14,999/month) suits brands building a professional presence. Growth (₹24,999/month) adds more content, content strategy, community management and competitor analysis. Scale (₹34,999/month) covers three platforms, the highest content volume and a monthly strategy consultation. If you're unsure, book a free consultation and we'll recommend one based on your goals.",
  },
  {
    q: "Can you build a custom website?",
    a: "Yes. Every website package includes custom UI design. Packages start at ₹14,999 (Basic), ₹24,999 (Silver) and ₹49,999 (Gold), and e-commerce websites start at ₹39,999. Advanced web applications are quoted individually.",
  },
  {
    q: "Will my website be mobile-friendly?",
    a: "Yes. Responsive design for phones, tablets and desktops is included in every website package.",
  },
  {
    q: "Do you provide SEO services?",
    a: "Yes. Ongoing SEO starts at ₹5,000/month, and every website package includes SEO setup at launch. We follow sound SEO practices but don't guarantee specific rankings.",
  },
  {
    q: "Is advertising spend included?",
    a: "No. Package fees cover management of your campaigns. Advertising spend is separate and billed at actuals.",
  },
  {
    q: "How do I start a project?",
    a: "Call or WhatsApp us, email ikommedia03@gmail.com, or fill in the contact form. We'll set up a free consultation to understand your goals and recommend the right scope. Marketing retainers have a minimum three-month commitment.",
  },
];
