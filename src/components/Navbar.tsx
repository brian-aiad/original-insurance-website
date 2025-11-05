// src/components/Navbar.tsx
// Original Insurance — Navbar (simplified mobile: no dup headers, tidy sheet, Sat appt-only)

import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { site } from "../lib/site";
import logo from "../assets/logo.png";
import { Icons } from "./Icons";

function cx(...v: (string | false | null | undefined)[]) {
  return v.filter(Boolean).join(" ");
}

// Desktop-only utility hours (Sat = appt only)
const HOURS_SHORT: string = (site as any)?.hoursShort ?? "Mon–Fri 9–6, Sat appt only";

/* ────────────────────────────────────────────────────────────
   Desktop nav item
   ──────────────────────────────────────────────────────────── */
function DesktopNavItem({ to, children }: { to: string; children: React.ReactNode }) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        cx(
          "relative px-3 py-2 rounded-lg text-[15px] font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
          isActive ? "text-white bg-white/10" : "text-white/90 hover:text-white hover:bg-white/10"
        )
      }
    >
      {({ isActive }) => (
        <>
          <span>{children}</span>
          <span
            className={cx(
              "pointer-events-none absolute left-3 right-3 -bottom-[6px] h-[2px] rounded-full transition",
              isActive ? "bg-white/70" : "bg-transparent"
            )}
            aria-hidden
          />
        </>
      )}
    </NavLink>
  );
}

/* ────────────────────────────────────────────────────────────
   Mobile list row
   ──────────────────────────────────────────────────────────── */
function MobileLink({
  to,
  children,
  onClick,
}: {
  to: string;
  children: React.ReactNode;
  onClick?: () => void;
}) {
  return (
    <NavLink
      to={to}
      onClick={onClick}
      className={({ isActive }) =>
        cx(
          "flex items-center justify-between rounded-xl px-4 py-3.5 text-[16px] font-medium",
          "bg-white/[0.06] hover:bg-white/[0.10] transition",
          isActive ? "ring-1 ring-white/25 shadow-[inset_3px_0_0_0_rgba(255,255,255,.7)]" : ""
        )
      }
    >
      <span className="text-white">{children}</span>
      <svg className="w-4 h-4 text-white/65" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 6l6 6-6 6" />
      </svg>
    </NavLink>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const toggleRef = useRef<HTMLButtonElement | null>(null);
  const { pathname } = useLocation();

  // Close menu on route change
  useEffect(() => setOpen(false), [pathname]);

  // Elevation on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Lock page scroll while menu open
  useEffect(() => {
    const root = document.documentElement;
    if (open) root.classList.add("overflow-hidden");
    else root.classList.remove("overflow-hidden");
    return () => root.classList.remove("overflow-hidden");
  }, [open]);

  // ESC to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Outside click (ignore hamburger button)
  useEffect(() => {
    if (!open) return;
    const handler = (e: Event) => {
      const t = e.target as Node;
      if (panelRef.current?.contains(t)) return;
      if (toggleRef.current?.contains(t)) return;
      setOpen(false);
    };
    document.addEventListener("mousedown", handler);
    document.addEventListener("touchstart", handler, { passive: true });
    return () => {
      document.removeEventListener("mousedown", handler);
      document.removeEventListener("touchstart", handler);
    };
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* Skip to content */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-[calc(env(safe-area-inset-top)+8px)] focus:left-2 focus:z-[60] focus:bg-white focus:text-slate-900 focus:px-3 focus:py-2 focus:rounded-lg focus:ring-2 focus:ring-brand-300"
      >
        Skip to content
      </a>

      {/* Utility bar — DESKTOP ONLY (no mobile duplicate) */}
      <div className="hidden md:block bg-brand-900 text-white/90">
        <div className="container text-[13px] py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-5">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden />
              {HOURS_SHORT}
            </span>
            <span className="opacity-40 select-none">|</span>
            <span className="inline-flex items-center gap-2">
              <Icons.MapPin className="w-3.5 h-3.5 opacity-80" />
              {site.contact.address}
            </span>
            <span className="opacity-40 select-none">|</span>
            <span>Arabic • Spanish • English</span>
          </div>
          <div className="flex items-center gap-4">
            <a className="hover:underline" href={site.contact.phoneHref}>
              {site.contact.phone}
            </a>
            <a className="hover:underline" href={site.contact.emailHref}>
              {site.contact.email}
            </a>
          </div>
        </div>
      </div>

      {/* Main bar */}
      <div
        className={cx(
          "header-blur text-white",
          "bg-gradient-to-b from-brand-900/95 via-brand-800/95 to-brand-800/90",
          "border-t border-white/10",
          scrolled ? "shadow-lg shadow-black/10 ring-1 ring-black/10" : ""
        )}
        role="navigation"
        aria-label="Primary"
      >
        <div className="container flex items-center justify-between py-3 md:py-3.5">
          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt={site.name}
              className="h-10 w-10 rounded-lg bg-white p-1 ring-1 ring-white/20 object-contain"
            />
            <div className="leading-tight">
              <div className="font-semibold tracking-tight text-[18px] md:text-[19px]">{site.name}</div>
              <div className="text-[12px] text-white/75 line-clamp-1">{site.tagline}</div>
            </div>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-3">
            <DesktopNavItem to="/">Home</DesktopNavItem>
            <DesktopNavItem to="/services">Services</DesktopNavItem>
            <DesktopNavItem to="/locations">Locations</DesktopNavItem>
            <DesktopNavItem to="/about">About</DesktopNavItem>
            <DesktopNavItem to="/contact">Contact</DesktopNavItem>

            <a href={site.contact.phoneHref} className="ml-1 btn btn-ghost">
              <Icons.Phone className="w-4 h-4" />
              <span className="hidden xl:inline">{site.contact.phone}</span>
              <span className="xl:hidden">Call</span>
            </a>
            <NavLink to="/contact" className="btn btn-primary ml-1">
              Request a Quote
            </NavLink>
          </nav>

          {/* Mobile toggle */}
          <button
            ref={toggleRef}
            className={cx(
              "lg:hidden p-2.5 rounded-lg text-white/95 hover:bg-white/10",
              "focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
              open ? "ring-1 ring-white/20 bg-white/10" : ""
            )}
            aria-controls="mobile-nav"
            aria-expanded={open}
            aria-label={open ? "Close menu" : "Open menu"}
            onClick={() => setOpen((s) => !s)}
          >
            {open ? (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" strokeLinejoin="round" d="M6 18 18 6M6 6l12 12" />
              </svg>
            ) : (
              <svg className="w-6 h-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
                <path strokeLinecap="round" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            )}
          </button>
        </div>

        {/* Mobile sheet — minimal, no duplicate headers/chips */}
        <div
          id="mobile-nav"
          className={cx(
            "lg:hidden overflow-hidden border-t border-white/10 transition-all duration-300",
            open ? "max-h-[80vh]" : "max-h-0"
          )}
          aria-hidden={!open}
        >
          <div
            ref={panelRef}
            className={cx(
              "container will-change-transform",
              open ? "translate-y-0 opacity-100" : "-translate-y-2 opacity-0"
            )}
            style={{ transition: "transform .25s, opacity .25s" }}
          >
            <div className="py-3 grid gap-3">
              {/* Primary actions */}
              <div className="grid grid-cols-2 gap-3">
                <a
                  href={site.contact.phoneHref}
                  className="rounded-xl bg-white/[0.06] hover:bg-white/[0.10] ring-1 ring-white/15 p-3 text-sm text-white/90 flex items-center justify-center gap-2"
                >
                  <Icons.Phone className="w-4 h-4" />
                  Call
                </a>
                <NavLink
                  to="/contact"
                  className="rounded-xl bg-white text-brand-800 font-semibold p-3 text-sm text-center shadow hover:shadow-md"
                  onClick={() => setOpen(false)}
                >
                  Request a Quote
                </NavLink>
              </div>

              {/* Nav list */}
              <div className="grid gap-2">
                <MobileLink to="/" onClick={() => setOpen(false)}>Home</MobileLink>
                <MobileLink to="/services" onClick={() => setOpen(false)}>Services</MobileLink>
                <MobileLink to="/locations" onClick={() => setOpen(false)}>Locations</MobileLink>
                <MobileLink to="/about" onClick={() => setOpen(false)}>About</MobileLink>
                <MobileLink to="/contact" onClick={() => setOpen(false)}>Contact</MobileLink>
              </div>

              {/* Tiny footer line (one line, no chips) */}
              <div className="mt-3 text-[12px] text-white/70 flex flex-wrap items-center gap-x-3 gap-y-1 py-2">
                <span className="inline-flex items-center gap-1.5">
                  <span className="h-2 w-2 rounded-full bg-emerald-400" />
                  Mon–Fri 9–6, Sat appt only
                </span>
                <span className="hidden xs:inline opacity-40">•</span>
                <span className="inline-flex items-center gap-1.5">
                  <Icons.Phone className="w-3.5 h-3.5 opacity-80" />
                  <a className="hover:underline" href={site.contact.phoneHref}>{site.contact.phone}</a>
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
