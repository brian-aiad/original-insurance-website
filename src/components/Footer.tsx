// src/components/Footer.tsx
// Original Insurance — Footer (premium: blue-forward, live status, rich JSON-LD)

import { useEffect, useMemo } from "react";
import { site } from "../lib/site";
import { Icons } from "./Icons";

const HOURS_SHORT: string = (site as any)?.hoursShort ?? "Mon–Fri 9–6, Sat 10–2";

// Structured hours for status + JSON-LD (local office hours)
const HOURS = [
  { day: "Mon", open: { h: 9, m: 0 }, close: { h: 18, m: 0 } },
  { day: "Tue", open: { h: 9, m: 0 }, close: { h: 18, m: 0 } },
  { day: "Wed", open: { h: 9, m: 0 }, close: { h: 18, m: 0 } },
  { day: "Thu", open: { h: 9, m: 0 }, close: { h: 18, m: 0 } },
  { day: "Fri", open: { h: 9, m: 0 }, close: { h: 18, m: 0 } },
  { day: "Sat", open: { h: 10, m: 0 }, close: { h: 14, m: 0 } },
  { day: "Sun", open: null as any, close: null as any }, // closed
];

// Simple “open now” check in local time
function useOpenNow() {
  return useMemo(() => {
    const now = new Date();
    const idx = (now.getDay() + 6) % 7; // Mon=0 ... Sun=6
    const today = HOURS[idx];
    if (!today.open || !today.close) return { open: false, label: "Closed" };
    const start = new Date(now);
    start.setHours(today.open.h, today.open.m, 0, 0);
    const end = new Date(now);
    end.setHours(today.close.h, today.close.m, 0, 0);
    const open = now >= start && now <= end;
    return { open, label: open ? "Open now" : "Closed" };
  }, []);
}

export default function Footer() {
  const { open, label } = useOpenNow();
  const year = new Date().getFullYear();

  // Rich JSON-LD on every page (helps GMB/local)
  useEffect(() => {
    const socialUrls = (site.socials || []).map((s: any) => s.href).filter(Boolean);
    const openingHoursSpecification = HOURS.map((h, i) => {
      const dayMap = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
      return h.open && h.close
        ? {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: dayMap[i],
            opens: `${String(h.open.h).padStart(2, "0")}:${String(h.open.m).padStart(2, "0")}`,
            closes: `${String(h.close.h).padStart(2, "0")}:${String(h.close.m).padStart(2, "0")}`,
          }
        : {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: dayMap[i],
            opens: undefined,
            closes: undefined,
          };
    });

    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "InsuranceAgency",
      name: site.name,
      url: window.location.origin,
      email: site.contact?.email,
      telephone: site.contact?.phone,
      sameAs: socialUrls,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.contact?.address,
        addressLocality: "Downey",
        addressRegion: "CA",
        postalCode: "90240",
        addressCountry: "US",
      },
      openingHoursSpecification,
      areaServed: "California",
    });
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  const quickLinks = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Locations", href: "/locations" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="mt-24 border-t border-slate-200 bg-white">
      {/* Top CTA bar */}
      <div className="bg-[color:var(--brand-800)] text-white">
        <div className="container py-5 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm uppercase tracking-wide text-brand-200 font-semibold">
              Need help with a claim?
            </p>
            <p className="text-white/90">
              We’ll help you report, document, and follow up — even after hours.
            </p>
          </div>
          <div className="flex gap-2">
            <a className="btn btn-ghost" href={site.contact.phoneHref}>
              Call {site.contact.phone}
            </a>
            <a className="btn btn-primary" href="/contact" aria-label="Request a quote">
              Request a Quote
            </a>
          </div>
        </div>
      </div>

      {/* Main footer content */}
      <div className="container py-12 grid gap-10 lg:grid-cols-4">
        {/* Brand + socials */}
        <div className="lg:col-span-2">
          <div className="flex items-center gap-2">
            <h3 className="font-display text-xl font-semibold text-brand-800">{site.name}</h3>
            <span
              className={[
                "inline-flex items-center gap-1 rounded-full px-2 py-[3px] text-[11px]",
                open
                  ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                  : "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
              ].join(" ")}
              aria-live="polite"
            >
              <span
                className={[
                  "inline-block h-2 w-2 rounded-full",
                  open ? "bg-emerald-500" : "bg-slate-400",
                ].join(" ")}
              />
              {label}
            </span>
          </div>

          <p className="mt-2 text-slate-600 max-w-prose">{site.description}</p>

          <ul className="mt-3 text-[13px] text-slate-500">
            <li>
              Hours: <span className="font-medium text-slate-700">{HOURS_SHORT}</span>
            </li>
            <li className="mt-1">
              Multilingual: <span className="font-medium text-slate-700">Arabic • Spanish • English</span>
            </li>
            <li className="mt-1">No broker fee for standard quotes.</li>
          </ul>

          <div className="mt-4 flex gap-3" aria-label="Social links">
            {(site.socials || []).map((s: any) => {
              const Icon = (Icons as any)[s.icon];
              return (
                <a
                  key={s.label}
                  href={s.href}
                  aria-label={s.label}
                  className="p-2 rounded-lg bg-slate-100 hover:bg-slate-200 focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-300"
                >
                  <Icon className="w-5 h-5 text-brand-700" />
                </a>
              );
            })}
          </div>
        </div>

        {/* Quick links */}
        <nav aria-label="Footer">
          <h4 className="text-sm font-semibold text-slate-900">Quick links</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            {quickLinks.map((l) => (
              <li key={l.href}>
                <a className="hover:text-brand-700" href={l.href}>
                  {l.label}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        {/* Contact + hours */}
        <div>
          <h4 className="text-sm font-semibold text-slate-900">Contact</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>
              <a
                className="hover:text-brand-700"
                href={site.contact.phoneHref}
                aria-label={`Call ${site.contact.phone}`}
              >
                {site.contact.phone}
              </a>
            </li>
            <li>
              <a
                className="hover:text-brand-700"
                href={site.contact.emailHref}
                aria-label={`Email ${site.contact.email}`}
              >
                {site.contact.email}
              </a>
            </li>
            <li>
              <a
                className="hover:text-brand-700"
                href={site.contact.mapsHref}
                target="_blank"
                rel="noreferrer"
                aria-label="Open address in Google Maps"
              >
                {site.contact.address}
              </a>
              <div className="text-[12px] text-slate-500">Free parking behind the office.</div>
            </li>
          </ul>

          <h4 className="mt-5 text-sm font-semibold text-slate-900">Hours</h4>
          <ul className="mt-3 space-y-2 text-sm text-slate-600">
            <li>Mon–Fri: 9:00 AM – 6:00 PM</li>
            <li>Sat: 10:00 AM – 2:00 PM</li>
            <li>Sun: Closed</li>
          </ul>

          <a href="/contact" className="btn btn-primary w-full mt-4" aria-label="Request a quote">
            Request a Quote
          </a>
        </div>
      </div>

      {/* Bottom bar */}
      <div className="border-t border-slate-200">
        <div className="container py-6 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-sm text-slate-500">
          <p>© {year} Original Group Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <a href="/privacy" className="hover:text-slate-700">
              Privacy
            </a>
            <a href="/terms" className="hover:text-slate-700">
              Terms
            </a>
            <a href="#top" className="hover:text-slate-700">
              Back to top ↑
            </a>
          </div>
          <p className="sm:text-right">Designed by Brian Aiad</p>
        </div>
      </div>
    </footer>
  );
}
