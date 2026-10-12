import { CONTACT } from "../data/site";

/** Build a wa.me link with a properly URL-encoded message. */
export function whatsappUrl(message: string) {
  return `https://wa.me/${CONTACT.whatsapp}?text=${encodeURIComponent(message)}`;
}

export const DEFAULT_WHATSAPP_MESSAGE = "Hi IKom Media, I'd like to know more about your services.";

export type EnquiryDetails = {
  name?: string;
  business?: string;
  service?: string;
  budget?: string;
  message?: string;
};

/** Compose an enquiry message from what the visitor has typed. Only includes fields they filled in. */
export function enquiryMessage(d: EnquiryDetails) {
  const lines = ["Hi IKom Media, I'd like to enquire about your services."];
  if (d.name) lines.push(`Name: ${d.name}`);
  if (d.business) lines.push(`Business: ${d.business}`);
  if (d.service) lines.push(`Service: ${d.service}`);
  if (d.budget) lines.push(`Budget: ${d.budget}`);
  if (d.message) lines.push("", d.message);
  return lines.join("\n");
}
