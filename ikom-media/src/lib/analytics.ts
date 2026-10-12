/**
 * Google Analytics 4 integration point.
 *
 * - Does nothing unless VITE_GA_MEASUREMENT_ID is set.
 * - Loads gtag.js only after the visitor accepts analytics cookies (see ConsentBanner).
 * - Never send names, emails, phone numbers or message content as event parameters.
 */
import { GA_ID } from "../data/site";

const CONSENT_KEY = "ikom-analytics-consent";
export type Consent = "granted" | "denied" | null;

declare global {
  interface Window {
    dataLayer?: unknown[];
    gtag?: (...args: unknown[]) => void;
  }
}

export const analyticsEnabled = () => Boolean(GA_ID);

export function getConsent(): Consent {
  try {
    const v = localStorage.getItem(CONSENT_KEY);
    return v === "granted" || v === "denied" ? v : null;
  } catch {
    return null;
  }
}

export function setConsent(value: "granted" | "denied") {
  try {
    localStorage.setItem(CONSENT_KEY, value);
  } catch {
    /* storage unavailable — consent applies to this page view only */
  }
  if (value === "granted") loadAnalytics();
}

let loaded = false;

export function loadAnalytics() {
  if (loaded || !GA_ID || typeof window === "undefined") return;
  loaded = true;
  window.dataLayer = window.dataLayer || [];
  window.gtag = function gtag() {
    // eslint-disable-next-line prefer-rest-params
    window.dataLayer!.push(arguments);
  };
  window.gtag("js", new Date());
  window.gtag("config", GA_ID, { anonymize_ip: true, send_page_view: false });
  const s = document.createElement("script");
  s.async = true;
  s.src = `https://www.googletagmanager.com/gtag/js?id=${encodeURIComponent(GA_ID)}`;
  document.head.appendChild(s);
  trackPageView(window.location.pathname);
}

export function trackPageView(path: string) {
  if (!loaded || !window.gtag) return;
  window.gtag("event", "page_view", { page_path: path, page_location: window.location.href, page_title: document.title });
}

export type ConversionEvent =
  | "consultation_cta_click"
  | "phone_click"
  | "email_click"
  | "whatsapp_click"
  | "contact_form_submit"
  | "pricing_cta_click";

/** Track a conversion interaction. `params` must not contain personal data. */
export function track(event: ConversionEvent, params: Record<string, string | number> = {}) {
  if (!loaded || !window.gtag) return;
  window.gtag("event", event, params);
}
