import { useEffect, useId, useRef, useState, type FormEvent, type ReactNode } from "react";
import { Link, useSearchParams } from "react-router";
import { AlertCircle, CheckCircle2, Loader2, Mail, MessageCircle, Send } from "lucide-react";
import { CONTACT, CONTACT_ENDPOINT } from "../../data/site";
import { MARKETING_PACKAGES, WEBSITE_PACKAGES } from "../../data/packages";
import { track } from "../../lib/analytics";
import { enquiryMessage, whatsappUrl } from "../../lib/whatsapp";
import {
  BUDGET_OPTIONS,
  CONTACT_METHODS,
  LIMITS,
  SERVICE_OPTIONS,
  serviceLabel,
  validateContact,
  type ContactPayload,
  type Errors,
} from "../../lib/validation";

const EMPTY: ContactPayload = {
  name: "",
  business: "",
  email: "",
  phone: "",
  service: "",
  budget: "",
  message: "",
  contactMethod: "",
  consent: false,
  website: "",
};

const ORDER: (keyof ContactPayload)[] = ["name", "business", "email", "phone", "service", "budget", "message", "contactMethod", "consent"];

type Status =
  | { kind: "idle" }
  | { kind: "sending" }
  | { kind: "sent" }
  | { kind: "error"; message: string }
  | { kind: "handoff"; via: "whatsapp" | "email" };

function Field({
  id,
  label,
  optional,
  error,
  hint,
  children,
}: {
  id: string;
  label: string;
  optional?: boolean;
  error?: string;
  hint?: string;
  children: ReactNode;
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label} {optional && <span className="font-normal text-subtle">(optional)</span>}
      </label>
      {children}
      {hint && !error && (
        <p id={`${id}-hint`} className="mt-1.5 text-xs text-subtle">
          {hint}
        </p>
      )}
      {error && (
        <p id={`${id}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm text-danger">
          <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  );
}

export function ContactForm() {
  const uid = useId();
  const fid = (k: string) => `${uid}-${k}`;
  const [params] = useSearchParams();
  const [data, setData] = useState<ContactPayload>(EMPTY);
  const [errors, setErrors] = useState<Errors>({});
  const [submitted, setSubmitted] = useState(false);
  const [status, setStatus] = useState<Status>({ kind: "idle" });
  const formRef = useRef<HTMLFormElement>(null);
  const statusRef = useRef<HTMLDivElement>(null);

  // Prefill from ?service=…&package=… (links from pricing and service pages)
  useEffect(() => {
    const service = params.get("service") ?? "";
    const pkgId = params.get("package");
    const pkg = [...MARKETING_PACKAGES, ...WEBSITE_PACKAGES].find((p) => p.id === pkgId);
    setData((d) => ({
      ...d,
      service: SERVICE_OPTIONS.some((o) => o.value === service) ? service : d.service,
      message:
        d.message ||
        (pkg ? `I'm interested in the ${pkg.name} ${service === "website" ? "website" : "marketing"} package (${pkg.price}${pkg.suffix}).` : ""),
    }));
  }, [params]);

  const set = <K extends keyof ContactPayload>(k: K, v: ContactPayload[K]) => {
    setData((d) => {
      const next = { ...d, [k]: v };
      // Re-validate live once the visitor has tried to submit
      if (submitted) setErrors(validateContact(next));
      return next;
    });
  };

  const describedBy = (k: keyof ContactPayload, hint = false) =>
    errors[k] ? `${fid(k)}-error` : hint ? `${fid(k)}-hint` : undefined;

  /** Validate; focus the first invalid field. Returns true when valid. */
  const check = () => {
    setSubmitted(true);
    const e = validateContact(data);
    setErrors(e);
    const first = ORDER.find((k) => e[k]);
    if (first) {
      const el = formRef.current?.querySelector<HTMLElement>(`[name="${first}"]`);
      el?.focus();
      return false;
    }
    return true;
  };

  const summary = () =>
    enquiryMessage({
      name: data.name.trim(),
      business: data.business.trim(),
      service: serviceLabel(data.service),
      budget: data.budget,
      message:
        `${data.message.trim()}\n\nEmail: ${data.email.trim()}\nPhone: ${data.phone.trim()}\nPreferred contact: ${
          CONTACT_METHODS.find((m) => m.value === data.contactMethod)?.label ?? ""
        }`,
    });

  const handoff = (via: "whatsapp" | "email") => {
    if (!check()) return;
    if (data.website) return; // bot
    track("contact_form_submit", { method: via, service: data.service });
    const text = summary();
    if (via === "whatsapp") {
      track("whatsapp_click", { location: "contact_form" });
      window.open(whatsappUrl(text), "_blank", "noopener,noreferrer");
    } else {
      track("email_click", { location: "contact_form" });
      const subject = `Enquiry: ${serviceLabel(data.service)}${data.business ? ` (${data.business.trim()})` : ""}`;
      window.location.href = `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(text)}`;
    }
    setStatus({ kind: "handoff", via });
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  const onSubmit = async (ev: FormEvent) => {
    ev.preventDefault();
    if (!CONTACT_ENDPOINT) {
      handoff("whatsapp");
      return;
    }
    if (!check()) return;
    setStatus({ kind: "sending" });
    try {
      const res = await fetch(CONTACT_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      const json = (await res.json().catch(() => ({}))) as { ok?: boolean; error?: string; errors?: Errors };
      if (res.ok && json.ok) {
        track("contact_form_submit", { method: "form", service: data.service });
        setStatus({ kind: "sent" });
        setData(EMPTY);
        setSubmitted(false);
      } else {
        if (json.errors) setErrors(json.errors);
        setStatus({ kind: "error", message: json.error || "We couldn't send your enquiry. Please try again." });
      }
    } catch {
      setStatus({ kind: "error", message: "Network error: your enquiry wasn't sent. Please check your connection and try again." });
    }
    requestAnimationFrame(() => statusRef.current?.focus());
  };

  if (status.kind === "sent") {
    return (
      <div ref={statusRef} tabIndex={-1} role="status" className="card p-8 text-center outline-none md:p-12">
        <CheckCircle2 className="mx-auto size-12 text-success" aria-hidden="true" />
        <h2 className="mt-5 text-h3">Thank you. Your enquiry has been sent.</h2>
        <p className="mx-auto mt-3 max-w-md">
          We've received your details and will get back to you using your preferred contact method.
        </p>
        <button type="button" className="btn btn-secondary mt-8" onClick={() => setStatus({ kind: "idle" })}>
          Send another enquiry
        </button>
      </div>
    );
  }

  const errorCount = Object.keys(errors).length;

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="card space-y-6 p-6 sm:p-8 md:p-10" aria-describedby={`${uid}-req`}>
      <p id={`${uid}-req`} className="text-sm text-subtle">
        All fields are required unless marked optional.
      </p>

      {submitted && errorCount > 0 && (
        <div role="alert" className="flex gap-3 rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-white">
          <AlertCircle className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden="true" />
          <span>
            Please fix {errorCount} {errorCount === 1 ? "field" : "fields"} highlighted below.
          </span>
        </div>
      )}

      {/* Honeypot — hidden from people, tempting to bots */}
      <div aria-hidden="true" className="absolute -left-[9999px] h-px w-px overflow-hidden">
        <label htmlFor={fid("website")}>Website</label>
        <input id={fid("website")} name="website" tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => set("website", e.target.value)} />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <Field id={fid("name")} label="Full name" error={errors.name}>
          <input
            id={fid("name")}
            name="name"
            className="field"
            autoComplete="name"
            maxLength={LIMITS.name}
            value={data.name}
            onChange={(e) => set("name", e.target.value)}
            aria-invalid={Boolean(errors.name)}
            aria-describedby={describedBy("name")}
            required
          />
        </Field>
        <Field id={fid("business")} label="Business name" optional error={errors.business}>
          <input
            id={fid("business")}
            name="business"
            className="field"
            autoComplete="organization"
            maxLength={LIMITS.business}
            value={data.business}
            onChange={(e) => set("business", e.target.value)}
            aria-invalid={Boolean(errors.business)}
            aria-describedby={describedBy("business")}
          />
        </Field>
        <Field id={fid("email")} label="Email" error={errors.email}>
          <input
            id={fid("email")}
            name="email"
            type="email"
            inputMode="email"
            className="field"
            autoComplete="email"
            maxLength={LIMITS.email}
            value={data.email}
            onChange={(e) => set("email", e.target.value)}
            aria-invalid={Boolean(errors.email)}
            aria-describedby={describedBy("email")}
            required
          />
        </Field>
        <Field id={fid("phone")} label="Phone" error={errors.phone} hint="Include your country code if outside India.">
          <input
            id={fid("phone")}
            name="phone"
            type="tel"
            inputMode="tel"
            className="field"
            autoComplete="tel"
            maxLength={LIMITS.phone}
            value={data.phone}
            onChange={(e) => set("phone", e.target.value)}
            aria-invalid={Boolean(errors.phone)}
            aria-describedby={describedBy("phone", true)}
            required
          />
        </Field>
        <Field id={fid("service")} label="Service of interest" error={errors.service}>
          <select
            id={fid("service")}
            name="service"
            className="field"
            value={data.service}
            onChange={(e) => set("service", e.target.value)}
            aria-invalid={Boolean(errors.service)}
            aria-describedby={describedBy("service")}
            required
          >
            <option value="" disabled>
              Choose a service
            </option>
            {SERVICE_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>
                {o.label}
              </option>
            ))}
          </select>
        </Field>
        <Field id={fid("budget")} label="Estimated budget" optional error={errors.budget}>
          <select
            id={fid("budget")}
            name="budget"
            className="field"
            value={data.budget}
            onChange={(e) => set("budget", e.target.value)}
            aria-invalid={Boolean(errors.budget)}
            aria-describedby={describedBy("budget")}
          >
            <option value="">Select a range</option>
            {BUDGET_OPTIONS.map((b) => (
              <option key={b} value={b}>
                {b}
              </option>
            ))}
          </select>
        </Field>
      </div>

      <Field id={fid("message")} label="Project description" error={errors.message} hint="What are you looking to achieve? Any timelines?">
        <textarea
          id={fid("message")}
          name="message"
          rows={5}
          className="field resize-y"
          maxLength={LIMITS.message}
          value={data.message}
          onChange={(e) => set("message", e.target.value)}
          aria-invalid={Boolean(errors.message)}
          aria-describedby={describedBy("message", true)}
          required
        />
      </Field>

      <fieldset aria-describedby={errors.contactMethod ? `${fid("contactMethod")}-error` : undefined}>
        <legend className="field-label">Preferred contact method</legend>
        <div className="flex flex-wrap gap-2">
          {CONTACT_METHODS.map((m) => (
            <label
              key={m.value}
              className={`inline-flex min-h-11 cursor-pointer items-center gap-2 rounded-full border px-4 text-sm font-medium transition-colors has-[:focus-visible]:outline has-[:focus-visible]:outline-2 has-[:focus-visible]:outline-offset-2 has-[:focus-visible]:outline-accent-text ${
                data.contactMethod === m.value ? "border-bright bg-electric/20 text-white" : "border-line-strong text-muted hover:text-white"
              }`}
            >
              <input
                type="radio"
                name="contactMethod"
                value={m.value}
                checked={data.contactMethod === m.value}
                onChange={() => set("contactMethod", m.value)}
                className="size-4 accent-[#5D72FF]"
              />
              {m.label}
            </label>
          ))}
        </div>
        {errors.contactMethod && (
          <p id={`${fid("contactMethod")}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm text-danger">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {errors.contactMethod}
          </p>
        )}
      </fieldset>

      <div>
        <label className="flex cursor-pointer gap-3 text-[0.9375rem]">
          <input
            type="checkbox"
            name="consent"
            checked={data.consent}
            onChange={(e) => set("consent", e.target.checked)}
            aria-invalid={Boolean(errors.consent)}
            aria-describedby={errors.consent ? `${fid("consent")}-error` : undefined}
            className="mt-1 size-5 shrink-0 accent-[#5D72FF]"
          />
          <span>
            I agree to IKom Media using these details to respond to my enquiry, as described in the{" "}
            <Link to="/privacy-policy" className="text-link">
              privacy policy
            </Link>
            .
          </span>
        </label>
        {errors.consent && (
          <p id={`${fid("consent")}-error`} className="mt-1.5 flex items-start gap-1.5 text-sm text-danger">
            <AlertCircle className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
            {errors.consent}
          </p>
        )}
      </div>

      <div className="flex flex-col gap-3 border-t border-line pt-6 sm:flex-row">
        {CONTACT_ENDPOINT ? (
          <>
            <button type="submit" className="btn btn-primary" disabled={status.kind === "sending"}>
              {status.kind === "sending" ? (
                <>
                  <Loader2 className="size-4 animate-spin" aria-hidden="true" /> Sending…
                </>
              ) : (
                <>
                  <Send className="size-4" aria-hidden="true" /> Send enquiry
                </>
              )}
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => handoff("whatsapp")}>
              <MessageCircle className="size-4" aria-hidden="true" /> Send via WhatsApp
            </button>
          </>
        ) : (
          <>
            <button type="submit" className="btn btn-primary">
              <MessageCircle className="size-4" aria-hidden="true" /> Send via WhatsApp
            </button>
            <button type="button" className="btn btn-secondary" onClick={() => handoff("email")}>
              <Mail className="size-4" aria-hidden="true" /> Send via email
            </button>
          </>
        )}
      </div>
      {!CONTACT_ENDPOINT && (
        <p className="text-xs text-subtle">
          Your enquiry opens in WhatsApp or your email app, pre-filled and ready to send. Nothing is sent until you press
          send there.
        </p>
      )}

      <div ref={statusRef} tabIndex={-1} aria-live="polite" className="outline-none">
        {status.kind === "error" && (
          <p role="alert" className="flex gap-3 rounded-xl border border-danger/40 bg-danger/10 p-4 text-sm text-white">
            <AlertCircle className="mt-0.5 size-4 shrink-0 text-danger" aria-hidden="true" />
            <span>
              {status.message} You can also reach us at{" "}
              <a href={`mailto:${CONTACT.email}`} className="text-link">
                {CONTACT.email}
              </a>{" "}
              or{" "}
              <a href={`tel:${CONTACT.phones[0].raw}`} className="text-link">
                {CONTACT.phones[0].label}
              </a>
              .
            </span>
          </p>
        )}
        {status.kind === "handoff" && (
          <p className="flex gap-3 rounded-xl border border-bright/40 bg-electric/10 p-4 text-sm text-white">
            <CheckCircle2 className="mt-0.5 size-4 shrink-0 text-accent-text" aria-hidden="true" />
            <span>
              {status.via === "whatsapp"
                ? "We've opened WhatsApp with your enquiry filled in. Press send in WhatsApp to reach us."
                : "We've opened your email app with your enquiry filled in. Press send there to reach us."}{" "}
              If nothing opened,{" "}
              <a
                href={
                  status.via === "whatsapp"
                    ? whatsappUrl(summary())
                    : `mailto:${CONTACT.email}?body=${encodeURIComponent(summary())}`
                }
                target={status.via === "whatsapp" ? "_blank" : undefined}
                rel="noopener noreferrer"
                className="text-link"
              >
                try this link
              </a>
              .
            </span>
          </p>
        )}
      </div>
    </form>
  );
}
