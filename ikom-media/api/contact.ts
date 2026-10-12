/**
 * Contact form endpoint (Vercel Serverless Function, Node runtime).
 *
 * - Re-validates every field on the server with the same rules as the browser.
 * - Rejects bots via a honeypot field and a simple per-instance rate limit.
 * - Delivers the enquiry by email through Resend (https://resend.com).
 * - Never logs personal data.
 *
 * Required environment variables (server-side only, NOT prefixed with VITE_):
 *   RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL
 *
 * Then set VITE_CONTACT_ENDPOINT=/api/contact so the form uses this endpoint.
 * For a different host or provider, keep the same request/response shape.
 */
import { validateContact, serviceLabel, CONTACT_METHODS, type ContactPayload } from "../src/lib/validation";

type Req = { method?: string; body?: unknown; headers: Record<string, string | string[] | undefined> };
type Res = {
  status: (code: number) => Res;
  json: (body: unknown) => void;
  setHeader: (k: string, v: string) => void;
};

// Best-effort, in-memory rate limit (resets on cold start). Use a shared store (e.g. Upstash) for stronger limits.
const hits = new Map<string, { count: number; reset: number }>();
const WINDOW_MS = 10 * 60 * 1000;
const MAX_PER_WINDOW = 5;

function rateLimited(ip: string) {
  const now = Date.now();
  const h = hits.get(ip);
  if (!h || h.reset < now) {
    hits.set(ip, { count: 1, reset: now + WINDOW_MS });
    return false;
  }
  h.count++;
  return h.count > MAX_PER_WINDOW;
}

const esc = (s: string) =>
  s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");

/** Strip control characters (keeps newlines/tabs) */
const clean = (v: unknown, max = 2000) =>
  typeof v === "string" ? v.replace(/[\u0000-\u0008\u000B\u000C\u000E-\u001F\u007F]/g, "").slice(0, max) : "";

export default async function handler(req: Req, res: Res) {
  res.setHeader("Cache-Control", "no-store");
  if (req.method !== "POST") {
    res.setHeader("Allow", "POST");
    return res.status(405).json({ ok: false, error: "Method not allowed" });
  }

  const ip = String(req.headers["x-forwarded-for"] ?? "").split(",")[0].trim() || "unknown";
  if (rateLimited(ip)) {
    return res.status(429).json({ ok: false, error: "Too many enquiries. Please wait a few minutes or contact us directly." });
  }

  const raw = (typeof req.body === "string" ? JSON.parse(req.body || "{}") : req.body ?? {}) as Record<string, unknown>;

  // Honeypot: pretend success so bots don't retry
  if (clean(raw.website, 200)) return res.status(200).json({ ok: true });

  const data: ContactPayload = {
    name: clean(raw.name, 80).trim(),
    business: clean(raw.business, 120).trim(),
    email: clean(raw.email, 160).trim(),
    phone: clean(raw.phone, 20).trim(),
    service: clean(raw.service, 40),
    budget: clean(raw.budget, 40),
    message: clean(raw.message, 2000).trim(),
    contactMethod: clean(raw.contactMethod, 20),
    consent: raw.consent === true,
  };

  const errors = validateContact(data);
  if (Object.keys(errors).length) {
    return res.status(422).json({ ok: false, error: "Please check the highlighted fields.", errors });
  }

  const { RESEND_API_KEY, CONTACT_TO_EMAIL, CONTACT_FROM_EMAIL } = process.env;
  if (!RESEND_API_KEY || !CONTACT_TO_EMAIL || !CONTACT_FROM_EMAIL) {
    console.error("[contact] Email delivery is not configured (missing env vars).");
    return res.status(503).json({ ok: false, error: "Online enquiries are temporarily unavailable." });
  }

  const method = CONTACT_METHODS.find((m) => m.value === data.contactMethod)?.label ?? data.contactMethod;
  const rows: [string, string][] = [
    ["Name", data.name],
    ["Business", data.business || "—"],
    ["Email", data.email],
    ["Phone", data.phone],
    ["Service", serviceLabel(data.service)],
    ["Budget", data.budget || "—"],
    ["Preferred contact", method],
  ];
  const html = `<h2>New website enquiry</h2>
<table cellpadding="6" style="border-collapse:collapse">${rows
    .map(([k, v]) => `<tr><td><strong>${esc(k)}</strong></td><td>${esc(v)}</td></tr>`)
    .join("")}</table>
<h3>Project description</h3><p style="white-space:pre-wrap">${esc(data.message)}</p>`;
  const text = `${rows.map(([k, v]) => `${k}: ${v}`).join("\n")}\n\n${data.message}`;

  try {
    const r = await fetch("https://api.resend.com/emails", {
      method: "POST",
      headers: { Authorization: `Bearer ${RESEND_API_KEY}`, "Content-Type": "application/json" },
      body: JSON.stringify({
        from: CONTACT_FROM_EMAIL,
        to: [CONTACT_TO_EMAIL],
        reply_to: data.email,
        subject: `Website enquiry: ${serviceLabel(data.service)} from ${data.name}`,
        html,
        text,
      }),
    });
    if (!r.ok) {
      console.error(`[contact] Email provider responded ${r.status}`);
      return res.status(502).json({ ok: false, error: "We couldn't send your enquiry right now." });
    }
  } catch {
    console.error("[contact] Email provider request failed");
    return res.status(502).json({ ok: false, error: "We couldn't send your enquiry right now." });
  }

  return res.status(200).json({ ok: true });
}
