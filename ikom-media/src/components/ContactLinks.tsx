import { Mail, MessageCircle, Phone } from "lucide-react";
import { CONTACT } from "../data/site";
import { track } from "../lib/analytics";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappUrl } from "../lib/whatsapp";

type Props = { location: string; layout?: "row" | "stack"; showWhatsApp?: boolean; className?: string };

/** Click-to-call, email and WhatsApp links, each tracked. */
export function ContactLinks({ location, layout = "row", showWhatsApp = true, className = "" }: Props) {
  const item =
    "group inline-flex min-h-11 items-center gap-3 rounded-lg text-white transition-colors hover:text-accent-text";
  const icon =
    "inline-flex size-9 shrink-0 items-center justify-center rounded-full border border-line-strong bg-white/[0.03] text-accent-text transition-colors group-hover:border-bright";
  return (
    <ul className={`${layout === "row" ? "flex flex-wrap gap-x-8 gap-y-2" : "space-y-2"} ${className}`}>
      {CONTACT.phones.map((p) => (
        <li key={p.raw}>
          <a href={`tel:${p.raw}`} className={item} onClick={() => track("phone_click", { location })}>
            <span className={icon} aria-hidden="true">
              <Phone className="size-4" />
            </span>
            <span className="font-medium tabular-nums">{p.label}</span>
          </a>
        </li>
      ))}
      <li>
        <a href={`mailto:${CONTACT.email}`} className={item} onClick={() => track("email_click", { location })}>
          <span className={icon} aria-hidden="true">
            <Mail className="size-4" />
          </span>
          <span className="font-medium break-all">{CONTACT.email}</span>
        </a>
      </li>
      {showWhatsApp && (
        <li>
          <a
            href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
            target="_blank"
            rel="noopener noreferrer"
            className={item}
            onClick={() => track("whatsapp_click", { location })}
          >
            <span className={icon} aria-hidden="true">
              <MessageCircle className="size-4" />
            </span>
            <span className="font-medium">Chat on WhatsApp</span>
            <span className="sr-only">(opens WhatsApp in a new tab)</span>
          </a>
        </li>
      )}
    </ul>
  );
}
