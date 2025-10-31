// src/components/Navbar.tsx
// Original Insurance — Navbar (premium: utility bar, mobile-first, blue-forward, safe-area)

import { useEffect, useRef, useState } from "react";
import { NavLink, useLocation } from "react-router-dom";
import { site } from "../lib/site";
import logo from "../assets/logo.png";
import { Icons } from "./Icons";

function cx(...v: (string | false | null | undefined)[]) {
  return v.filter(Boolean).join(" ");
}

// Safe hours string (avoid type errors if site.hoursShort isn't declared)
const HOURS_SHORT: string = (site as any)?.hoursShort ?? "Mon–Fri 9–6, Sat 10–2";

function NavItem({
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
      className={({ isActive }) =>
        cx(
          "relative px-3 py-2 rounded-lg text-sm font-medium transition focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40",
          isActive ? "text-white bg-white/10" : "text-white/90 hover:text-white hover:bg-white/10"
        )
      }
      onClick={onClick}
    >
      {({ isActive }) => (
        <>
          <span>{children}</span>
          <span
            className={cx(
              "pointer-events-none absolute left-3 right-3 -bottom-1 h-[2px] rounded-full transition",
              isActive ? "bg-white/70" : "bg-transparent"
            )}
            aria-hidden
          />
        </>
      )}
    </NavLink>
  );
}

export default function Navbar() {
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const panelRef = useRef<HTMLDivElement | null>(null);
  const { pathname } = useLocation();

  // Close mobile on route change
  useEffect(() => setOpen(false), [pathname]);

  // Elevation on scroll
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 4);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // ESC close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    if (open) window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Click outside close (mobile panel)
  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (!open) return;
      if (panelRef.current && !panelRef.current.contains(e.target as Node)) {
        setOpen(false);
      }
    };
    if (open) document.addEventListener("click", onClick);
    return () => document.removeEventListener("click", onClick);
  }, [open]);

  return (
    <header className="sticky top-0 z-50">
      {/* a11y: skip link */}
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-[calc(env(safe-area-inset-top)+8px)] focus:left-2 focus:z-[60] focus:bg-white focus:text-slate-900 focus:px-3 focus:py-2 focus:rounded-lg focus:ring-2 focus:ring-brand-300"
      >
        Skip to content
      </a>

      {/* Utility bar — desktop only */}
      <div className="hidden sm:block bg-brand-900 text-white/90">
        <div className="container text-[13px] py-1.5 flex items-center justify-between">
          <div className="flex items-center gap-4">
            <span className="inline-flex items-center gap-2">
              <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden />
              {HOURS_SHORT}
            </span>
            <span className="opacity-40">|</span>
            <span className="inline-flex items-center gap-2">
              <Icons.MapPin className="w-3.5 h-3.5 opacity-80" />
              {site.contact.address}
            </span>
            <span className="opacity-40">|</span>
            <span>Arabic • Spanish • English</span>
          </div>
          <div className="flex items-center gap-3">
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
          "border-t border-white/10", // subtle top line
          scrolled ? "shadow-lg shadow-black/10 ring-1 ring-black/10" : ""
        )}
        role="navigation"
        aria-label="Primary"
        style={{ paddingTop: "env(safe-area-inset-top)" }}
      >
        <div className="container flex items-center justify-between py-3">
          {/* Brand */}
          <NavLink to="/" className="flex items-center gap-3 group">
            <img
              src={logo}
              alt={site.name}
              className="h-10 w-10 rounded-lg bg-white p-1 ring-1 ring-white/20 object-contain"
            />
            <div className="leading-tight">
              <div className="font-semibold tracking-tight text-[18px]">{site.name}</div>
              <div className="text-xs text-white/70">{site.tagline}</div>
            </div>
          </NavLink>

          {/* Desktop nav */}
          <nav className="hidden md:flex items-center gap-2">
            <NavItem to="/">Home</NavItem>
            <NavItem to="/services">Services</NavItem>
            <NavItem to="/locations">Locations</NavItem>
            <NavItem to="/about">About</NavItem>
            <NavItem to="/contact">Contact</NavItem>

            <a href={site.contact.phoneHref} className="ml-1 btn btn-ghost">
              <Icons.Phone className="w-4 h-4" />
              <span className="hidden lg:inline">{site.contact.phone}</span>
              <span className="lg:hidden">Call</span>
            </a>
            <NavLink to="/contact" className="btn btn-primary ml-1">
              Request a Quote
            </NavLink>
          </nav>

          {/* Mobile toggle */}
          <button
            className="md:hidden p-2 rounded-lg text-white/90 hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
            aria-label={open ? "Close menu" : "Open menu"}
            aria-expanded={open}
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

        {/* Mobile panel */}
        <div
          className={cx(
            "md:hidden overflow-hidden transition-[max-height] duration-300 ease-out border-t border-white/10",
            open ? "max-h-[560px]" : "max-h-0"
          )}
        >
          <div
            ref={panelRef}
            className="container py-3 grid gap-2 pb-6"
            style={{ paddingBottom: "calc(1rem + env(safe-area-inset-bottom))" }}
          >
            {/* quick info card for mobile */}
            <div className="rounded-lg bg-white/10 ring-1 ring-white/15 p-3 text-[13px] text-white/90 shadow-[inset_0_1px_0_rgba(255,255,255,0.06)]">
              <div className="flex items-center justify-between">
                <span className="inline-flex items-center gap-2">
                  <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden />
                  {HOURS_SHORT}
                </span>
                <span className="opacity-60">Arabic • Spanish • English</span>
              </div>
            </div>

            <NavItem to="/" onClick={() => setOpen(false)}>
              Home
            </NavItem>
            <NavItem to="/services" onClick={() => setOpen(false)}>
              Services
            </NavItem>
            <NavItem to="/locations" onClick={() => setOpen(false)}>
              Locations
            </NavItem>
            <NavItem to="/about" onClick={() => setOpen(false)}>
              About
            </NavItem>
            <NavItem to="/contact" onClick={() => setOpen(false)}>
              Contact
            </NavItem>

            <div className="mt-2 grid grid-cols-2 gap-2">
              <a href={site.contact.phoneHref} className="btn btn-ghost">
                <Icons.Phone className="w-4 h-4" />
                Call
              </a>
              <NavLink to="/contact" className="btn btn-primary">
                Quote
              </NavLink>
            </div>

            {Array.isArray(site.socials) && site.socials.length > 0 && (
              <div className="mt-2 flex items-center gap-3">
                {site.socials.map((s: any) => {
                  const Icon = (Icons as any)[s.icon];
                  return (
                    <a
                      key={s.label}
                      href={s.href}
                      aria-label={s.label}
                      className="p-2 rounded-lg bg-white/10 hover:bg-white/15 focus:outline-none focus-visible:ring-2 focus-visible:ring-white/40"
                    >
                      <Icon className="w-5 h-5 text-white" />
                    </a>
                  );
                })}
              </div>
            )}
          </div>
        </div>
      </div>
    </header>
  );
}
