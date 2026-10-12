import { useEffect, useRef, useState } from "react";
import { Link, NavLink, useLocation } from "react-router";
import * as m from "motion/react-m";
import { ChevronDown, Menu } from "lucide-react";
import { NAV, type NavItem } from "../../data/site";
import { Logo } from "../Logo";
import { ConsultationButton } from "../ButtonLink";
import { MobileNav } from "./MobileNav";

function isActive(item: NavItem, pathname: string) {
  if (pathname === item.to) return true;
  if (item.children?.some((c) => pathname === c.to)) return true;
  if (item.to === "/services" && pathname.startsWith("/services")) return true;
  if (item.to.startsWith("/packages") && pathname.startsWith("/packages")) return true;
  return false;
}

function ActiveIndicator() {
  return (
    <m.span
      layoutId="nav-indicator"
      className="absolute inset-x-3 -bottom-px h-0.5 rounded-full bg-bright"
      transition={{ type: "spring", stiffness: 420, damping: 36 }}
      aria-hidden="true"
    />
  );
}

function Dropdown({ item, active }: { item: NavItem; active: boolean }) {
  const [open, setOpen] = useState(false);
  const wrap = useRef<HTMLDivElement>(null);
  const id = `nav-${item.label.toLowerCase()}`;
  const { pathname } = useLocation();

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (!open) return;
    const onDoc = (e: PointerEvent) => {
      if (!wrap.current?.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        setOpen(false);
        wrap.current?.querySelector<HTMLButtonElement>("button")?.focus();
      }
    };
    document.addEventListener("pointerdown", onDoc);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDoc);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  return (
    <div
      ref={wrap}
      className="relative"
      onPointerEnter={(e) => e.pointerType === "mouse" && setOpen(true)}
      onPointerLeave={(e) => e.pointerType === "mouse" && setOpen(false)}
      onBlur={(e) => {
        if (!wrap.current?.contains(e.relatedTarget as Node)) setOpen(false);
      }}
    >
      <button
        type="button"
        className={`relative flex h-11 items-center gap-1 px-3 text-[0.9375rem] font-medium transition-colors ${
          active || open ? "text-white" : "text-muted hover:text-white"
        }`}
        aria-expanded={open}
        aria-controls={id}
        onClick={() => setOpen((o) => !o)}
      >
        {item.label}
        <ChevronDown className={`size-4 transition-transform duration-200 ${open ? "rotate-180" : ""}`} aria-hidden="true" />
        {active && <ActiveIndicator />}
      </button>
      <div
        id={id}
        hidden={!open}
        className="absolute left-1/2 top-full w-[19rem] -translate-x-1/2 pt-2"
      >
        <ul className="card bg-navy-900/95 p-2 shadow-2xl shadow-black/40 backdrop-blur-xl">
          {item.to === "/services" && (
            <li>
              <Link
                to="/services"
                className="block rounded-lg px-3 py-2.5 text-sm font-semibold text-white hover:bg-white/5"
              >
                All services
              </Link>
            </li>
          )}
          {item.children!.map((c) => (
            <li key={c.to}>
              <NavLink
                to={c.to}
                className={({ isActive }) =>
                  `block rounded-lg px-3 py-2.5 text-sm transition-colors hover:bg-white/5 hover:text-white ${
                    isActive ? "bg-white/5 text-white" : "text-muted"
                  }`
                }
              >
                <span className="block font-medium">{c.label}</span>
                {c.description && <span className="mt-0.5 block text-xs text-subtle">{c.description}</span>}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export function Header() {
  const { pathname } = useLocation();
  const [scrolled, setScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);
  const menuButton = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setMobileOpen(false), [pathname]);

  return (
    <header
      className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-300 ${
        scrolled ? "border-b border-line bg-navy-950/80 backdrop-blur-xl" : "border-b border-transparent"
      }`}
    >
      <div className="container-site flex h-[4.5rem] items-center justify-between gap-6">
        <Link to="/" className="flex min-h-11 shrink-0 items-center rounded-md" aria-label="IKom Media home">
          <Logo height={58} priority />
        </Link>

        <nav aria-label="Main" className="hidden lg:block">
          <ul className="flex items-center">
            {NAV.map((item) => {
              const active = isActive(item, pathname);
              return (
                <li key={item.label}>
                  {item.children ? (
                    <Dropdown item={item} active={active} />
                  ) : (
                    <Link
                      to={item.to}
                      aria-current={active ? "page" : undefined}
                      className={`relative flex h-11 items-center px-3 text-[0.9375rem] font-medium transition-colors ${
                        active ? "text-white" : "text-muted hover:text-white"
                      }`}
                    >
                      {item.label}
                      {active && <ActiveIndicator />}
                    </Link>
                  )}
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <ConsultationButton location="header" className="hidden !min-h-11 !px-5 sm:inline-flex">
            Book a Consultation
          </ConsultationButton>
          <button
            ref={menuButton}
            type="button"
            className="inline-flex size-11 items-center justify-center rounded-full border border-line-strong text-white lg:hidden"
            aria-label="Open menu"
            aria-expanded={mobileOpen}
            aria-controls="mobile-nav"
            onClick={() => setMobileOpen(true)}
          >
            <Menu className="size-5" aria-hidden="true" />
          </button>
        </div>
      </div>
      <MobileNav
        open={mobileOpen}
        onClose={() => {
          setMobileOpen(false);
          menuButton.current?.focus();
        }}
      />
    </header>
  );
}
