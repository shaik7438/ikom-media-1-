import { useEffect, useRef, useState, type ReactNode } from "react";
import { useLocation } from "react-router";
import { MessageCircle } from "lucide-react";
import { Header } from "./Header";
import { Footer } from "./Footer";
import { Seo } from "./Seo";
import { ConsentBanner } from "./ConsentBanner";
import { track } from "../../lib/analytics";
import { DEFAULT_WHATSAPP_MESSAGE, whatsappUrl } from "../../lib/whatsapp";

function ScrollManager() {
  const { pathname, hash } = useLocation();
  const first = useRef(true);
  useEffect(() => {
    if (first.current) {
      // Initial page load: let the browser handle scroll restoration / hash jumps.
      first.current = false;
      return;
    }
    if (hash) {
      const el = document.getElementById(decodeURIComponent(hash.slice(1)));
      if (el) {
        el.scrollIntoView();
        return;
      }
    }
    window.scrollTo(0, 0);
    // Move focus to main content on route change so screen-reader users land in the new page.
    const main = document.getElementById("main");
    main?.focus({ preventScroll: true });
  }, [pathname, hash]);
  return null;
}

function WhatsAppButton() {
  // Appears once the visitor scrolls, so it never covers the hero CTAs on small screens.
  const [show, setShow] = useState(false);
  useEffect(() => {
    const onScroll = () => setShow(window.scrollY > 480);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <a
      href={whatsappUrl(DEFAULT_WHATSAPP_MESSAGE)}
      target="_blank"
      rel="noopener noreferrer"
      onClick={() => track("whatsapp_click", { location: "floating_button" })}
      tabIndex={show ? 0 : -1}
      aria-hidden={!show}
      className={`fixed bottom-5 right-5 z-40 inline-flex size-14 items-center justify-center rounded-full bg-electric text-white shadow-[0_12px_32px_-8px_rgb(52_59_255/0.8)] transition-[opacity,transform] duration-300 hover:scale-105 ${
        show ? "opacity-100" : "pointer-events-none translate-y-4 opacity-0"
      }`}
      aria-label="Chat with IKom Media on WhatsApp (opens in a new tab)"
    >
      <MessageCircle className="size-6" aria-hidden="true" />
    </a>
  );
}

export function Layout({ children }: { children: ReactNode }) {
  return (
    <>
      <a href="#main" className="skip-link">
        Skip to content
      </a>
      <Seo />
      <ScrollManager />
      <Header />
      <main id="main" tabIndex={-1} className="outline-none">
        {children}
      </main>
      <Footer />
      <WhatsAppButton />
      <ConsentBanner />
    </>
  );
}
