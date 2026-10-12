import { useEffect, useRef } from "react";
import { NavLink } from "react-router";
import { AnimatePresence } from "motion/react";
import * as m from "motion/react-m";
import { Mail, MessageCircle, Phone, X } from "lucide-react";
import { CONTACT, NAV } from "../../data/site";
import { Logo } from "../Logo";
import { ConsultationButton } from "../ButtonLink";
import { track } from "../../lib/analytics";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappUrl } from "../../lib/whatsapp";

type Props = { open: boolean; onClose: () => void };

/** Accessible slide-out navigation: modal dialog semantics, focus trap, Escape to close, scroll lock. */
export function MobileNav({ open, onClose }: Props) {
  const panel = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    const t = window.setTimeout(() => panel.current?.querySelector<HTMLElement>("[data-autofocus]")?.focus(), 30);

    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        e.preventDefault();
        onClose();
        return;
      }
      if (e.key !== "Tab" || !panel.current) return;
      const focusables = panel.current.querySelectorAll<HTMLElement>(
        'a[href], button:not([disabled]), [tabindex]:not([tabindex="-1"])',
      );
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    };
    document.addEventListener("keydown", onKey);
    return () => {
      window.clearTimeout(t);
      document.body.style.overflow = prevOverflow;
      document.removeEventListener("keydown", onKey);
    };
  }, [open, onClose]);

  const linkCls = ({ isActive }: { isActive: boolean }) =>
    `flex min-h-12 items-center rounded-xl px-4 text-lg font-semibold font-display transition-colors ${
      isActive ? "bg-white/[0.06] text-white" : "text-white/90 hover:bg-white/[0.04]"
    }`;
  const subCls = ({ isActive }: { isActive: boolean }) =>
    `flex min-h-11 items-center rounded-lg px-4 text-[0.9375rem] transition-colors ${
      isActive ? "text-white" : "text-muted hover:text-white"
    }`;

  return (
    <AnimatePresence>
      {open && (
        <div className="fixed inset-0 z-[60] lg:hidden">
          <m.div
            className="absolute inset-0 bg-navy-950/70 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            aria-hidden="true"
          />
          <m.div
            ref={panel}
            id="mobile-nav"
            role="dialog"
            aria-modal="true"
            aria-label="Site menu"
            className="absolute inset-y-0 right-0 flex w-full max-w-sm flex-col border-l border-line bg-navy-900"
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "tween", duration: 0.32, ease: [0.22, 1, 0.36, 1] }}
          >
            <div className="flex h-[4.5rem] shrink-0 items-center justify-between border-b border-line px-5">
              <Logo height={52} />
              <button
                type="button"
                data-autofocus
                onClick={onClose}
                className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-white"
                aria-label="Close menu"
              >
                <X className="size-5" aria-hidden="true" />
              </button>
            </div>

            <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-3 py-4">
              <ul className="space-y-1">
                <li>
                  <NavLink to="/" end className={linkCls}>
                    Home
                  </NavLink>
                </li>
                {NAV.map((item) => (
                  <li key={item.label}>
                    <NavLink to={item.to} end={!item.children} className={linkCls}>
                      {item.children && item.to.startsWith("/packages") ? "Packages" : item.label}
                    </NavLink>
                    {item.children && (
                      <ul className="mb-2 ml-4 border-l border-line pl-1">
                        {item.children.map((c) => (
                          <li key={c.to}>
                            <NavLink to={c.to} className={subCls}>
                              {c.label}
                            </NavLink>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                ))}
              </ul>
            </nav>

            <div className="shrink-0 space-y-3 border-t border-line p-5">
              <ConsultationButton location="mobile_nav" className="w-full">
                Book a Consultation
              </ConsultationButton>
              <div className="grid grid-cols-3 gap-2">
                <a
                  href={`tel:${CONTACT.phones[0].raw}`}
                  onClick={() => track("phone_click", { location: "mobile_nav" })}
                  className="btn btn-secondary !px-2"
                  aria-label={`Call ${CONTACT.phones[0].label}`}
                >
                  <Phone className="size-4" aria-hidden="true" /> Call
                </a>
                <a
                  href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => track("whatsapp_click", { location: "mobile_nav" })}
                  className="btn btn-secondary !px-2"
                >
                  <MessageCircle className="size-4" aria-hidden="true" /> Chat
                </a>
                <a
                  href={`mailto:${CONTACT.email}`}
                  onClick={() => track("email_click", { location: "mobile_nav" })}
                  className="btn btn-secondary !px-2"
                  aria-label={`Email ${CONTACT.email}`}
                >
                  <Mail className="size-4" aria-hidden="true" /> Email
                </a>
              </div>
            </div>
          </m.div>
        </div>
      )}
    </AnimatePresence>
  );
}
