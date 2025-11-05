// src/pages/Locations.tsx
import { useEffect, useMemo, useState } from "react";
import { site } from "../lib/site";
import { Icons } from "../components/Icons";

/* ────────────────────────────────────────────────────────────
   Local helpers
   ──────────────────────────────────────────────────────────── */
const LANGS = ["Arabic", "Spanish", "English"] as const;

type HourRow =
  | { label: string; open: string; close: string; closed?: false; appt?: false }
  | { label: string; open?: ""; close?: ""; closed?: false; appt: true }
  | { label: string; open?: ""; close?: ""; closed: true; appt?: false };

const HOURS: HourRow[] = [
  { label: "Monday", open: "09:00 AM", close: "06:00 PM" },
  { label: "Tuesday", open: "09:00 AM", close: "06:00 PM" },
  { label: "Wednesday", open: "09:00 AM", close: "06:00 PM" },
  { label: "Thursday", open: "09:00 AM", close: "06:00 PM" },
  { label: "Friday", open: "09:00 AM", close: "06:00 PM" },
  { label: "Saturday", appt: true },
  { label: "Sunday", closed: true },
];

function clsx(...v: (string | false | null | undefined)[]) {
  return v.filter(Boolean).join(" ");
}

/* ────────────────────────────────────────────────────────────
   Page
   ──────────────────────────────────────────────────────────── */
export default function Locations() {
  const [copied, setCopied] = useState(false);

  // Monday=0 … Sunday=6 (for row highlight)
  const todayIdx = (new Date().getDay() + 6) % 7;

  // Short line reused across header/footer
  const hoursShort = "Mon–Fri 9–6 • Sat by appt.";

  // LocalBusiness JSON-LD (simple + clean)
  useEffect(() => {
    const dayMap = ["Monday","Tuesday","Wednesday","Thursday","Friday","Saturday","Sunday"];
    const openingHoursSpecification = HOURS.map((h, i) => {
      // For “by appointment” and “closed”, omit opens/closes
      if ("appt" in h && h.appt) {
        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: dayMap[i],
          // Intentionally omit opens/closes for “by appointment”
        };
      }
      if ("closed" in h && h.closed) {
        return {
          "@type": "OpeningHoursSpecification",
          dayOfWeek: dayMap[i],
        };
      }
      return {
        "@type": "OpeningHoursSpecification",
        dayOfWeek: dayMap[i],
        opens: h.open!.replace(" AM", ":00").replace(" PM", ":00"),
        closes: h.close!.replace(" AM", ":00").replace(" PM", ":00"),
      };
    });

    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "InsuranceAgency",
      name: site.name,
      url: window.location.origin + "/locations",
      telephone: site.contact.phone,
      email: site.contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: site.contact.address,
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

  // Copy address
  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(site.contact.address);
      setCopied(true);
      setTimeout(() => setCopied(false), 1400);
    } catch {/* no-op */}
  };

  const todayRowClass = useMemo(
    () => "bg-brand-50/60 ring-1 ring-brand-200 text-brand-900",
    []
  );

  return (
    <main id="main-content">
      {/* Mini hero (clean + concise) */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(180deg, var(--brand-900), var(--brand-800))" }}
        aria-label="Our Office"
      >
        <div className="container py-10 md:py-14">
          <p className="text-brand-200 uppercase tracking-[0.16em] text-[11px] font-semibold">
            Visit us
          </p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl font-semibold">
            Our Office in Downey, CA
          </h1>
          <p className="mt-3 text-white/90 max-w-prose">
            Street parking available. {hoursShort}. Call for fast help from a licensed broker.
          </p>
          <div className="mt-5 flex flex-wrap gap-2">
            <a href={site.contact.phoneHref} className="btn btn-primary">
              <Icons.Phone className="w-4 h-4" />
              Call {site.contact.phone}
            </a>
            <a href={site.contact.mapsHref} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <Icons.MapPin className="w-4 h-4" />
              Directions
            </a>
            <a href={site.contact.emailHref} className="btn btn-ghost">
              ✉ Email
            </a>
          </div>
        </div>
      </section>

      {/* Content */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            {/* Left: Address + Map */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-slate-900">Visit</h2>

              <div className="mt-3 flex flex-col gap-2 text-sm">
                <div className="flex items-start gap-2 text-slate-700">
                  <Icons.MapPin className="w-5 h-5 text-brand-700 mt-0.5" />
                  <div>
                    <a
                      className="hover:text-brand-700"
                      href={site.contact.mapsHref}
                      target="_blank"
                      rel="noreferrer"
                    >
                      {site.contact.address}
                    </a>
                    <div className="mt-2 flex gap-2">
                      <button
                        type="button"
                        onClick={handleCopy}
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12px] ring-1 ring-slate-200 hover:ring-slate-300"
                        aria-live="polite"
                      >
                        <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor">
                          <path d="M8 8V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2h-4v4a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2v-8a2 2 0 0 1 2-2h4z" />
                        </svg>
                        {copied ? "Copied!" : "Copy"}
                      </button>
                      <a
                        href={site.contact.mapsHref}
                        target="_blank"
                        rel="noreferrer"
                        className="inline-flex items-center gap-1 rounded-md px-2 py-1 text-[12px] ring-1 ring-slate-200 hover:ring-slate-300"
                      >
                        <Icons.MapPin className="w-3.5 h-3.5" />
                        Open in Maps
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex items-start gap-2 text-slate-700">
                  <Icons.Phone className="w-5 h-5 text-brand-700 mt-0.5" />
                  <a className="hover:text-brand-700" href={site.contact.phoneHref}>
                    {site.contact.phone}
                  </a>
                </div>

                <div className="flex items-start gap-2 text-slate-700">
                  <svg viewBox="0 0 24 24" className="w-5 h-5 text-brand-700 mt-0.5" fill="currentColor" aria-hidden>
                    <path d="M4 6h16a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H4a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2zm0 2v.4l8 5 8-5V8l-8 5-8-5z" />
                  </svg>
                  <a className="hover:text-brand-700" href={site.contact.emailHref}>
                    {site.contact.email}
                  </a>
                </div>
              </div>

              <div className="mt-5 aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-slate-900/10">
                <iframe
                  title="Map to our office"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1323.4536432142705!2d-118.2979079!3d33.9010092!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bae3e93f75f9%3A0xf8e0a9d1b3d7472d!2s9907B%20PARAMOUNT%20BLVD%2C%20DOWNEY%2C%20CA%2090240-3805!5e0!3m2!1sen!2sus!4v1623703061556"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>

              <div className="mt-4 rounded-lg bg-slate-50 ring-1 ring-slate-200 px-3 py-3 text-sm text-slate-700">
                <p className="font-medium text-slate-900">Parking & Access</p>
                <ul className="mt-1 list-disc pl-5 space-y-1">
                  <li>Street parking available on Paramount Blvd.</li>
                  <li>Wheelchair-accessible entrance.</li>
                  <li>Call us if you need after-hours assistance.</li>
                </ul>
              </div>
            </div>

            {/* Right: Hours / Languages / CTA */}
            <div className="card p-6">
              <h2 className="text-lg font-semibold text-slate-900">Hours</h2>
              <div className="mt-3 overflow-hidden rounded-xl ring-1 ring-slate-200">
                <ul className="divide-y divide-slate-200 text-sm">
                  {HOURS.map((h, i) => (
                    <li
                      key={h.label}
                      className={clsx(
                        "px-4 py-2 grid grid-cols-2",
                        i === todayIdx && !("closed" in h && h.closed) && !("appt" in h && h.appt) && todayRowClass
                      )}
                    >
                      <span className="text-slate-700">{h.label}</span>
                      <span className={clsx("text-right", ("closed" in h && h.closed) ? "text-slate-400" : "text-slate-900")}>
                        {"appt" in h && h.appt
                          ? "By appointment — call"
                          : ("closed" in h && h.closed)
                          ? "Closed"
                          : `${(h as any).open} – ${(h as any).close}`}
                      </span>
                    </li>
                  ))}
                </ul>
              </div>

              <h3 className="mt-6 text-lg font-semibold text-slate-900">Languages</h3>
              <div className="mt-2 flex flex-wrap gap-2">
                {LANGS.map((l) => (
                  <span
                    key={l}
                    className="inline-flex items-center gap-1 rounded-full bg-slate-50 text-slate-700 ring-1 ring-slate-200 px-2.5 py-1 text-[12px]"
                  >
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" fill="currentColor" aria-hidden>
                      <path d="M12 2a10 10 0 1 0 0 20 10 10 0 0 0 0-20Zm1 17.9V18h-2v1.9A8.1 8.1 0 0 1 3.1 13H5v-2H3.1A8.1 8.1 0 0 1 11 4.1V6h2V4.1A8.1 8.1 0 0 1 20.9 11H19v2h1.9A8.1 8.1 0 0 1 13 19.9Z" />
                    </svg>
                    {l}
                  </span>
                ))}
              </div>

              <h3 className="mt-6 text-lg font-semibold text-slate-900">Contact</h3>
              <div className="mt-2 grid grid-cols-2 gap-2">
                <a href={site.contact.phoneHref} className="btn btn-ghost">
                  <Icons.Phone className="w-4 h-4" />
                  Call
                </a>
                <a href="/contact" className="btn btn-primary">
                  Message Us
                </a>
              </div>

              <div className="mt-4 rounded-lg bg-white ring-1 ring-slate-200 p-3">
                <p className="text-sm text-slate-700">
                  <span className="font-medium text-slate-900">{site.name}</span> serves clients across{" "}
                  <span className="font-medium">California</span>. Phone and email quotes available.
                </p>
              </div>
            </div>
          </div>

          {/* Bottom CTA */}
          <div className="mt-8 grid md:grid-cols-3 gap-3">
            <a href={site.contact.phoneHref} className="btn btn-ghost">
              <Icons.Phone className="w-4 h-4" />
              Call {site.contact.phone}
            </a>
            <a href={site.contact.mapsHref} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <Icons.MapPin className="w-4 h-4" />
              Get Directions
            </a>
            <a href="/contact" className="btn btn-primary">
              Start a Quote
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
