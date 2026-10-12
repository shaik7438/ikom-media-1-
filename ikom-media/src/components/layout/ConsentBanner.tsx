import { useEffect, useState } from "react";
import { Link } from "react-router";
import { analyticsEnabled, getConsent, loadAnalytics, setConsent } from "../../lib/analytics";

/**
 * Asks for analytics consent. Only renders when a GA4 ID is configured;
 * analytics never loads until the visitor accepts.
 */
export function ConsentBanner() {
  const [show, setShow] = useState(false);

  useEffect(() => {
    if (!analyticsEnabled()) return;
    const c = getConsent();
    if (c === "granted") loadAnalytics();
    else if (c === null) setShow(true);
  }, []);

  if (!show) return null;

  const decide = (v: "granted" | "denied") => {
    setConsent(v);
    setShow(false);
  };

  return (
    <div
      role="region"
      aria-label="Cookie consent"
      className="fixed inset-x-3 bottom-3 z-[70] mx-auto max-w-xl rounded-2xl border border-line-strong bg-navy-900/95 p-5 shadow-2xl shadow-black/50 backdrop-blur-xl sm:inset-x-6 sm:bottom-6"
    >
      <p className="text-sm text-muted">
        We'd like to use Google Analytics cookies to understand how visitors use this site. No analytics run unless you
        accept. Read our{" "}
        <Link to="/privacy-policy" className="text-link">
          privacy policy
        </Link>
        .
      </p>
      <div className="mt-4 flex gap-2">
        <button type="button" className="btn btn-primary !min-h-11 flex-1" onClick={() => decide("granted")}>
          Accept analytics
        </button>
        <button type="button" className="btn btn-secondary !min-h-11 flex-1" onClick={() => decide("denied")}>
          Decline
        </button>
      </div>
    </div>
  );
}
