/**
 * Contact form validation. Shared by the browser form and the server endpoint (api/contact.ts)
 * so both enforce the same rules.
 */

export const SERVICE_OPTIONS = [
  { value: "social", label: "Social Media Management" },
  { value: "ads", label: "Performance Marketing" },
  { value: "creative", label: "Creative & Content Production" },
  { value: "website", label: "Website Design & Development" },
  { value: "seo", label: "SEO Services" },
  { value: "branding", label: "Branding & Digital Strategy" },
  { value: "marketing", label: "Marketing package (social + ads)" },
  { value: "unsure", label: "Not sure yet" },
] as const;

export const BUDGET_OPTIONS = [
  "Under ₹15,000",
  "₹15,000 – ₹25,000",
  "₹25,000 – ₹50,000",
  "₹50,000+",
  "Not sure yet",
] as const;

export const CONTACT_METHODS = [
  { value: "phone", label: "Phone call" },
  { value: "whatsapp", label: "WhatsApp" },
  { value: "email", label: "Email" },
] as const;

export type ContactPayload = {
  name: string;
  business: string;
  email: string;
  phone: string;
  service: string;
  budget: string;
  message: string;
  contactMethod: string;
  consent: boolean;
  /** Honeypot — must stay empty */
  website?: string;
};

export type Errors = Partial<Record<keyof ContactPayload, string>>;

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

export const LIMITS = { name: 80, business: 120, email: 160, phone: 20, message: 2000 } as const;

export function serviceLabel(value: string) {
  return SERVICE_OPTIONS.find((o) => o.value === value)?.label ?? "";
}

export function validateContact(d: ContactPayload): Errors {
  const e: Errors = {};
  const name = d.name.trim();
  if (name.length < 2) e.name = "Please enter your full name.";
  else if (name.length > LIMITS.name) e.name = `Please keep your name under ${LIMITS.name} characters.`;

  if (d.business.trim().length > LIMITS.business) e.business = `Please keep this under ${LIMITS.business} characters.`;

  const email = d.email.trim();
  if (!email) e.email = "Please enter your email address.";
  else if (!EMAIL_RE.test(email) || email.length > LIMITS.email) e.email = "Please enter a valid email address, like name@example.com.";

  const digits = d.phone.replace(/[\s\-()+]/g, "");
  if (!digits) e.phone = "Please enter your phone number.";
  else if (!/^\d{10,15}$/.test(digits)) e.phone = "Please enter a valid phone number with 10–15 digits.";

  if (!SERVICE_OPTIONS.some((o) => o.value === d.service)) e.service = "Please choose the service you're interested in.";

  if (d.budget && !(BUDGET_OPTIONS as readonly string[]).includes(d.budget)) e.budget = "Please choose a budget range.";

  const msg = d.message.trim();
  if (msg.length < 10) e.message = "Please tell us a little about your project (at least 10 characters).";
  else if (msg.length > LIMITS.message) e.message = `Please keep your message under ${LIMITS.message} characters.`;

  if (!CONTACT_METHODS.some((m) => m.value === d.contactMethod)) e.contactMethod = "Please choose how you'd like us to contact you.";

  if (!d.consent) e.consent = "Please agree to the privacy policy so we can respond to your enquiry.";

  return e;
}
