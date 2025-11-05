// src/components/Footer.tsx
// Original Insurance — Footer (refined: blue separator bar, tighter layout, Sat by appt., JSON-LD)

import { useEffect, useMemo } from "react";
import { site } from "../lib/site";
import { Icons } from "./Icons";

// Short hours line used in the contact list
const HOURS_SHORT: string =
  (site as any)?.hoursShort ?? "Mon–Fri 9–6, Sat by appt.";

// Local office hours for status + JSON-LD
// Note: Saturday is by appointment (no fixed open/close)
const HOURS = [
  { day: "Mon", open: { h: 9, m: 0 }, close: { h: 18, m: 0 } },
  { day: "Tue", open: { h: 9, m: 0 }, close: { h: 18, m: 0 } },
  { day: "Wed", open: { h: 9, m: 0 }, close: { h: 18, m: 0 } },
  { day: "Thu", open: { h: 9, m: 0 }, close: { h: 18, m: 0 } },
  { day: "Fri", open: { h: 9, m: 0 }, close: { h: 18, m: 0 } },
  { day: "Sat", open: null as any, close: null as any, byAppt: true as const },
  { day: "Sun", open: null as any, close: null as any },
];

function useOpenNow() {
  return useMemo(() => {
    const now = new Date();
    const idx = (now.getDay() + 6) % 7; // Mon=0 ... Sun=6
    const today: any = HOURS[idx];

    if (today?.byAppt) return { open: false, label: "By appt." };
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

  // JSON-LD for LocalBusiness / InsuranceAgency
  useEffect(() => {
    const dayMap = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const openingHoursSpecification = HOURS.map((h, i) =>
      h.open && h.close
        ? {
            "@type": "OpeningHoursSpecification",
            dayOfWeek: dayMap[i],
            opens: `${String(h.open.h).padStart(2, "0")}:${String(h.open.m).padStart(2, "0")}`,
            closes: `${String(h.close.h).padStart(2, "0")}:${String(h.close.m).padStart(2, "0")}`,
          }
        : { "@type": "OpeningHoursSpecification", dayOfWeek: dayMap[i] }
    );

    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "InsuranceAgency",
      name: site.name,
      url: window.location.origin,
      telephone: site.contact?.phone,
      email: site.contact?.email,
      sameAs: (site.socials || []).map((s: any) => s.href).filter(Boolean),
      address: {
        "@type": "PostalAddress",
        streetAddress: site.contact?.address,
        addressLocality: "Downey",
        addressRegion: "CA",
        postalCode: "90240",
        addressCountry: "US",
      },
      byAppointmentOnly: true, // Saturdays by appointment
      openingHoursSpecification,
      areaServed: "California",
    });
    document.head.appendChild(el);
    return () => el.remove();
  }, []);

  const links = [
    { label: "Home", href: "/" },
    { label: "Services", href: "/services" },
    { label: "Locations", href: "/locations" },
    { label: "About", href: "/about" },
    { label: "Contact", href: "/contact" },
  ];

  return (
    <footer className="mt-20 border-t border-slate-200 bg-white">
      {/* Blue top separator bar */}
      <div className="h-1.5 bg-gradient-to-r from-[var(--brand-800)] via-[var(--brand-700)] to-[var(--brand-600)]" />

      {/* Row A — Brand + quick actions (tight, level-aligned) */}
      <div className="container py-6">
        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-baseline gap-2">
              <h3 className="font-display text-lg font-semibold text-slate-900">{site.name}</h3>
              <span
                className={[
                  "inline-flex items-center gap-1 rounded-full px-2 py-[3px] text-[11px]",
                  label === "By appt."
                    ? "bg-amber-50 text-amber-700 ring-1 ring-amber-200"
                    : open
                    ? "bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200"
                    : "bg-slate-100 text-slate-600 ring-1 ring-slate-200",
                ].join(" ")}
                aria-live="polite"
              >
                <span
                  className={[
                    "inline-block h-2 w-2 rounded-full",
                    label === "By appt."
                      ? "bg-amber-500"
                      : open
                      ? "bg-emerald-500"
                      : "bg-slate-400",
                  ].join(" ")}
                />
                {label}
              </span>
            </div>
          </div>

          <div className="flex flex-wrap gap-2 sm:gap-3">
            <a href={site.contact.phoneHref} className="btn btn-ghost">
              <Icons.Phone className="w-4 h-4" /> Call
            </a>
            <a href="/contact" className="btn btn-primary" aria-label="Request a quote">
              Request a Quote
            </a>
          </div>
        </div>
      </div>

      {/* Row B — Three clean columns with even rhythm */}
      <div className="container pb-10">
        <div className="grid gap-8 sm:grid-cols-3">
          {/* Contact */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Contact</h4>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li>
                <a className="hover:text-brand-700" href={site.contact.phoneHref}>
                  {site.contact.phone}
                </a>
              </li>
              <li>
                <a className="hover:text-brand-700" href={site.contact.emailHref}>
                  {site.contact.email}
                </a>
              </li>
              <li>
                <a
                  className="hover:text-brand-700"
                  href={site.contact.mapsHref}
                  target="_blank"
                  rel="noreferrer"
                >
                  {site.contact.address}
                </a>
              </li>
              <li className="text-[12px] text-slate-500">{HOURS_SHORT}</li>
            </ul>
          </div>

          {/* Quick links */}
          <nav aria-label="Quick links">
            <h4 className="text-sm font-semibold text-slate-900">Links</h4>
            <ul className="mt-3 grid gap-2 text-sm text-slate-700">
              {links.map((l) => (
                <li key={l.href}>
                  <a className="hover:text-brand-700" href={l.href}>
                    {l.label}
                  </a>
                </li>
              ))}
            </ul>
          </nav>

          {/* Socials */}
          <div>
            <h4 className="text-sm font-semibold text-slate-900">Follow</h4>
            <div className="mt-3 flex items-center gap-2">
              {(site.socials || []).map((s: any) => {
                const Icon = (Icons as any)[s.icon]; // Facebook / Instagram / LinkedIn / Twitter
                return (
                  <a
                    key={s.label}
                    href={s.href}
                    aria-label={s.label}
                    className="grid h-9 w-9 place-items-center rounded-full ring-1 ring-slate-200 bg-slate-50 hover:bg-white hover:ring-slate-300 transition"
                  >
                    <Icon className="w-5 h-5 text-brand-700" />
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>

      {/* Bottom bar — subtle, even spacing */}
      <div className="border-t border-slate-200 bg-slate-50">
        <div className="container py-4 flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between text-[13px]">
          <p className="text-slate-600">© {year} Original Group Inc.</p>
          <div className="flex items-center gap-4 text-slate-600">
            <a href="/privacy" className="hover:text-slate-800">Privacy</a>
            <a href="/terms" className="hover:text-slate-800">Terms</a>
            <a href="#top" className="hover:text-slate-800">Back to top ↑</a>
          </div>
          <p className="text-slate-500">Designed by Brian Aiad</p>
        </div>
      </div>
    </footer>
  );
}
