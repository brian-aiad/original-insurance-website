// src/pages/Home.tsx
// Original Insurance — Home page (premium, blue-forward, mobile-first, v2.4)
// Fixes: remove hero “white box”, repair post-reviews section, add top-edge shadow
// to every major section, unify spacing, keep tuned service image crops.

import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { site } from "../lib/site";

/* ────────────────────────────────────────────────────────────────────────────
   Local images
   ──────────────────────────────────────────────────────────────────────────── */
const photos = {
  hero: new URL("../assets/photos/hero-team.jpg", import.meta.url).href,
  about: new URL("../assets/photos/about-handshake.jpg", import.meta.url).href,
  claims: new URL("../assets/photos/claims-docs.jpg", import.meta.url).href,
  auto: new URL("../assets/photos/service-auto-keys.jpg", import.meta.url).href,
  home: new URL("../assets/photos/service-home-house.jpg", import.meta.url).href,
  life: new URL("../assets/photos/service-life-family.jpg", import.meta.url).href,
  commercial: new URL("../assets/photos/service-commercial-papers.jpg", import.meta.url).href,
  motorcycle: new URL("../assets/photos/service-motorcycle-moto.jpg", import.meta.url).href,
  recreational: new URL("../assets/photos/service-recreational-rv.jpg", import.meta.url).href,
} as const;

/* ────────────────────────────────────────────────────────────────────────────
   Constants
   ──────────────────────────────────────────────────────────────────────────── */
const OFFICE = {
  street: "9907-B Paramount Blvd",
  city: "Downey",
  region: "CA",
  zip: "90240",
  hoursShort: "Mon–Fri 9–6, Sat by appt.",
} as const;

/* ────────────────────────────────────────────────────────────────────────────
   Small helpers
   ──────────────────────────────────────────────────────────────────────────── */
function clsx(...v: (string | false | null | undefined)[]) {
  return v.filter(Boolean).join(" ");
}

/** A soft gradient line that appears at the TOP of a section.
 *  Drop this as the very first child INSIDE each section. */
function TopEdge({ from = "from-slate-200/70" }: { from?: string }) {
  return <div className={clsx("pointer-events-none h-3 w-full bg-gradient-to-b", from, "to-transparent")} />;
}


function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-white/85 ring-1 ring-black/10 px-2.5 py-1 text-[12px] font-medium text-slate-700">
      {children}
    </span>
  );
}

function SectionHeader({
  eyebrow,
  title,
  subtitle,
  align = "left",
  kicker,
}: {
  eyebrow?: string;
  title: string;
  subtitle?: string;
  align?: "left" | "center";
  kicker?: React.ReactNode;
}) {
  return (
    <header className={clsx("max-w-3xl", align === "center" && "mx-auto text-center")}>
      {eyebrow && (
        <p className="text-[11px] uppercase tracking-[0.16em] font-semibold text-brand-600">
          {eyebrow}
        </p>
      )}
      <h2 className="mt-2 text-2xl md:text-3xl font-semibold text-slate-900">{title}</h2>
      {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
      {kicker}
    </header>
  );
}

/** SectionCard — soft, lifted wrapper for groups of content */
function SectionCard({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return (
    <div
      className={clsx(
        "rounded-2xl ring-1 ring-slate-200 bg-white shadow-soft relative overflow-hidden",
        className
      )}
    >
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-white to-slate-50/60" />
      <div className="relative">{children}</div>
    </div>
  );
}

/* =============================================================================
   Icons (solid)
============================================================================= */
const I = {
  phone: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M6.6 10.8c1.3 2.6 3.4 4.7 6 6l2-2c.2-.2.6-.3.9-.2 1 .3 2 .5 3.1.5.5 0 .9.4.9.9V20c0 .5-.4.9-.9.9C9.6 20.9 3.1 14.4 3.1 6.9c0-.5.4-.9.9-.9h2.2c.5 0 .9.4.9.9 0 1.1.2 2.1.5 3.1.1.3 0 .6-.2.9l-1.8 1.8z" />
    </svg>
  ),
  pin: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2A7 7 0 0 0 5 9c0 5.2 7 13 7 13s7-7.8 7-13a7 7 0 0 0-7-7zm0 9.5A2.5 2.5 0 1 1 12 6.5a2.5 2.5 0 0 1 0 5z" />
    </svg>
  ),
  auto: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M5 16a3 3 0 1 1 2.9-3.6h8.2A3 3 0 1 1 19 16H5zm2-6 2-3h6l2 3H7z" />
    </svg>
  ),
  home: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M3 11 12 4l9 7v8a1 1 0 0 1-1 1h-5v-6H9v6H4a1 1 0 0 1-1-1v-8z" />
    </svg>
  ),
  life: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M7 11a4 4 0 1 1 6.8-2.9A4 4 0 1 1 17 17H7a3 3 0 1 1 0-6z" />
    </svg>
  ),
  business: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M4 20h16V8l-8-5-8 5v12zm4-3h2v-3H8v3zm6 0h2v-6h-2v6z" />
    </svg>
  ),
  bike: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M5 18a3 3 0 1 1 2.9-3.6h3.2l-1-2H9v-2h4l2 3h4v2h-1.1A3 3 0 1 1 18 18H9.8A5 5 0 0 1 5 18z" />
    </svg>
  ),
  rv: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M3 16h18v3H3v-3zm2-6h14l2 4H3l2-4zm4-4h6l1 2H8l1-2z" />
    </svg>
  ),
  star: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="m12 17.3 6 3.6-1.6-6.9 5.3-4.5-7-.6L12 2 9.3 8.9l-7 .6 5.3 4.5L6 20.9z" />
    </svg>
  ),
};

/* =============================================================================
   Sticky ribbon (appears after scroll)
============================================================================= */
function StickyRibbon() {
  const [visible, setVisible] = useState(false);
  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > window.innerHeight * 0.55);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  if (!visible) return null;

  return (
    <div className="fixed bottom-4 left-0 right-0 z-40">
      <div className="container">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3 rounded-2xl bg-brand-700 text-white px-4 py-3 shadow-hard ring-1 ring-white/10">
          <p className="text-sm md:text-base">Ready for a better rate? Get a custom quote in minutes.</p>
          <div className="flex gap-2">
            <a className="btn btn-ghost hidden md:inline-flex" href={site.contact.phoneHref}>
              Call {site.contact.phone}
            </a>
            <NavLink className="btn btn-primary" to="/contact" aria-label="Request a quote">
              Request a Quote
            </NavLink>
          </div>
        </div>
      </div>
    </div>
  );
}

/* =============================================================================
   Top contact strip
============================================================================= */
function QuickContactBar() {
  const mapsHref = `https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(
    `${OFFICE.street}, ${OFFICE.city}, ${OFFICE.region} ${OFFICE.zip}`
  )}`;
  return (
    <div className="bg-brand-900 text-white">
      {/* bigger text + spacing */}
      <div className="container py-2.5 text-sm md:text-base lg:text-[17px] flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
        {/* hours */}
        <div className="inline-flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden />
          <span className="text-white/95 font-medium">{OFFICE.hoursShort}</span>
        </div>

        <div className="hidden sm:block text-white/30">|</div>

        {/* address (click → maps) */}
        <a
          className="inline-flex items-center gap-2 hover:underline"
          href={mapsHref}
          target="_blank"
          rel="noopener noreferrer"
          aria-label="Open office address in Google Maps"
        >
          {I.pin({ className: "h-5 w-5 opacity-90" })}{" "}
          <span className="text-white/95 font-medium">
            {OFFICE.street}, {OFFICE.city}, {OFFICE.region} {OFFICE.zip}
          </span>
        </a>

        <div className="hidden sm:block text-white/30">|</div>

        {/* phone */}
        <a className="inline-flex items-center gap-2 hover:underline" href={site.contact.phoneHref}>
          {I.phone({ className: "h-5 w-5 opacity-90" })}{" "}
          <span className="text-white/95 font-semibold">{site.contact.phone}</span>
        </a>
      </div>

      {/* keep the soft drop shadow under the bar */}
      <div className="h-[8px] w-full bg-gradient-to-b from-black/10 to-transparent" />
    </div>
  );
}


/* =============================================================================
   KPI strip
============================================================================= */
function StatCard({
  value,
  label,
  icon,
}: {
  value: React.ReactNode;
  label: string;
  icon?: keyof typeof I;
}) {
  return (
      <div className="card px-5 py-4 text-center ring-1 ring-slate-200 bg-white shadow-soft">
      <div className="mx-auto flex items-center justify-center gap-2">
        {icon && I[icon]({ className: "h-6 w-6 text-brand-700" })}
        <div className="text-3xl font-bold tracking-tight text-brand-800">{value}</div>
      </div>
      <div className="mt-1 text-[13px] text-slate-600">{label}</div>
    </div>
  );
}
function StatsStrip() {
  return (
    <section className="bg-slate-50 py-4 md:py-6">
      <div className="container">
        <div className="rounded-2xl bg-white/90 backdrop-blur-sm shadow-soft ring-1 ring-slate-200/0">
          <div className="px-4 md:px-5 py-4 md:py-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
              <StatCard value="25+" label="Years serving CA" icon="business" />
              <StatCard value="30+" label="Carriers quoted" icon="star" />
              <StatCard value="4.8★" label="Client review avg." icon="star" />
              <StatCard value="3" label="Languages spoken" icon="phone" />
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}

/* =============================================================================
   Service cards
============================================================================= */
function ServiceCard({
  title,
  blurb,
  image,
  alt,
  objectPos,
}: {
  title: string;
  blurb: string;
  image?: string;
  alt?: string;
  objectPos?: string;
}) {
  return (
    <div className="card overflow-hidden hover:shadow-hard transition group shadow-soft">
      <div className="relative h-36 w-full">
        {image ? (
          <>
            <img
              src={image}
              alt={alt || ""}
              className={clsx("absolute inset-0 h-full w-full object-cover", objectPos || "")}
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-800 to-brand-600 grid place-items-center" />
        )}
      </div>
      <div className="p-6">
        <h4 className="font-semibold text-slate-900 flex items-center gap-2">
          {title.match(/auto/i) && I.auto({ className: "h-5 w-5 text-brand-700" })}
          {title.match(/home|rent/i) && I.home({ className: "h-5 w-5 text-brand-700" })}
          {title.match(/life/i) && I.life({ className: "h-5 w-5 text-brand-700" })}
          {title.match(/commercial|business/i) && I.business({ className: "h-5 w-5 text-brand-700" })}
          {title.match(/motorcycle|moto/i) && I.bike({ className: "h-5 w-5 text-brand-700" })}
          {title.match(/rv|recreational|boat/i) && I.rv({ className: "h-5 w-5 text-brand-700" })}
          <span>{title}</span>
        </h4>
        <p className="mt-2 text-sm text-slate-600">{blurb}</p>
        <ul className="mt-3 text-[12px] text-slate-500 space-y-1">
          <li>• Licensed California brokerage</li>
          <li>• Multi-carrier discount scan</li>
          <li>• Claims guidance & renewal checkups</li>
        </ul>
        <NavLink
          to="/contact"
          className="btn btn-primary mt-4 w-full group-hover:translate-y-[-1px] transition"
          aria-label={`Request a ${title} quote`}
        >
          Request a Quote
        </NavLink>
      </div>
    </div>
  );
}

/* =============================================================================
   How it works
============================================================================= */
function QuoteSteps() {
  const steps = [
    {
      icon: "auto",
      title: "Tell us about you",
      body: "A few basics like name, address, and current policy (if any).",
      chips: ["Auto", "Home", "Life", "Business", "SR-22"],
    },
    {
      icon: "business",
      title: "We shop multiple carriers",
      body: "We compare coverages, discounts, and price across our network.",
      chips: ["Discount scan", "Bundle options", "Claim support"],
    },
    {
      icon: "star",
      title: "You choose confidently",
      body: "We review options in plain English and help bind coverage.",
      chips: ["Same-day bind", "eID cards", "Renewal checkups"],
    },
  ] as const;

  return (
    <section className="pt-20 md:pt-24 pb-24 md:pb-20 bg-white border-t border-slate-200 md:border-none">
      <div className="container">
        <SectionCard>
          <div className="px-4 md:px-6 py-10">
            <SectionHeader
              eyebrow="How it works"
              title="Get your quote in three simple steps"
              subtitle="No pressure, no spam — just straight answers from a licensed broker."
              align="center"
              kicker={
                <div className="mt-3 flex items-center justify-center gap-2">
                  <Pill>Average call: ~10 minutes</Pill>
                  <Pill>Most quotes same day</Pill>
                </div>
              }
            />
            <ol className="mt-10 grid md:grid-cols-3 gap-6">
              {steps.map((s, i) => (
                <li key={s.title} className="card p-6 ring-1 ring-slate-200 bg-white shadow-soft">
                  <div className="flex items-center gap-3">
                    <div className="h-10 w-10 rounded-xl bg-brand-600 text-white grid place-items-center">
                      {I[s.icon]({ className: "h-5 w-5" })}
                    </div>
                    <div className="h-10 w-10 rounded-xl bg-brand-100 text-brand-800 grid place-items-center font-semibold">
                      {i + 1}
                    </div>
                  </div>
                  <h4 className="mt-4 font-semibold text-slate-900">{s.title}</h4>
                  <p className="mt-2 text-sm text-slate-600">{s.body}</p>
                  <ul className="mt-3 flex flex-wrap gap-1.5">
                    {s.chips.map((c) => (
                      <Pill key={c}>{c}</Pill>
                    ))}
                  </ul>
                </li>
              ))}
            </ol>
          </div>
        </SectionCard>
      </div>
    </section>
  );
}
/* =============================================================================
   Testimonials — marquee (no bottom clipping)
============================================================================= */
function Testimonials() {
  const reviews: { quote: string; name: string }[] = [
    { quote: "They found me a lower rate and explained every coverage clearly.", name: "Daniel P." },
    { quote: "Bound same day and sent my eID cards in minutes. Smooth!", name: "Marisol G." },
    { quote: "Handled my claim follow-up like pros. Zero stress.", name: "Omar A." },
    { quote: "Switched my home + auto bundle and saved a ton.", name: "Stephanie R." },
    { quote: "Bilingual staff made it easy for my parents too.", name: "Yasmin H." },
    ...(site as any).testimonials?.map((t: any) => ({ quote: t.quote, name: t.name })) ?? [],
  ];
  const loop = [...reviews, ...reviews, ...reviews];

  return (
    <section className="relative pt-24 pb-28 md:py-28 bg-slate-50">
      <style>{`
        @keyframes marquee { 0% { transform: translateX(0) } 100% { transform: translateX(-50%) } }
        .marquee { display:flex; width:max-content; animation:marquee 100s linear infinite }
        @media (prefers-reduced-motion: reduce) { .marquee { animation:none; transform:none } }
      `}</style>

      <div className="container">
        <SectionHeader
          eyebrow="Client reviews"
          title="What clients are saying"
          subtitle="Real feedback from the people we serve."
        />
      </div>

      {/* IMPORTANT: allow Y to be visible so shadows/corners aren't chopped */}
      <div className="mt-8 overflow-x-hidden overflow-y-visible pb-2">
        <div className="container">
          <div className="marquee">
            {loop.map((t, i) => (
              <figure
                key={i}
                className="
                  card p-6 h-full flex flex-col
                  min-w-[300px] max-w-[360px] mr-4
                  ring-1 ring-slate-200 shadow-hard
                "
              >
                <div className="flex items-center justify-between">
                  <div aria-label="5 out of 5 stars" className="flex">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <span key={j} className="w-4 h-4 inline-grid place-items-center">
                        {I.star({ className: 'w-4 h-4 text-amber-400' })}
                      </span>
                    ))}
                  </div>
                  <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[11px] text-slate-600">
                    <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" aria-hidden>
                      <path
                        fill="#4285F4"
                        d="M21.35 11.1h-9.17v2.98h5.38c-.23 1.25-1.45 3.67-5.38 3.67-3.24 0-5.89-2.68-5.89-5.98s2.65-5.98 5.89-5.98c1.84 0 3.07.78 3.77 1.45l2.57-2.48C17.61 3.3 15.67 2.4 13.18 2.4 7.99 2.4 3.8 6.6 3.8 11.77s4.2 9.38 9.38 9.38c5.41 0 8.98-3.8 8.98-9.17 0-.61-.06-1.05-.18-1.89z"
                      />
                    </svg>
                    Google Reviews
                  </span>
                </div>

                <blockquote className="mt-3 text-slate-700 leading-relaxed grow">“{t.quote}”</blockquote>
                <figcaption className="mt-4 text-sm text-slate-500">
                  <span className="font-semibold text-slate-700">{t.name}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Carriers — full-bleed marquee (seamless + mobile/desktop speeds)
   - Seamless: duplicate track exactly twice, animate 0 → -50%
   - No hover pause, no click pause, non-draggable images
   - Faster on mobile, slower on desktop (edit --carrier-speed below)
============================================================================= */
function CarriersCarousel() {
  const fallback = Array.from({ length: 8 }, (_, i) =>
    new URL(`../assets/clients/client-${i + 1}.png`, import.meta.url).href
  );
  const logos: string[] =
    (Array.isArray((site as any).carriersLogos) && (site as any).carriersLogos.length > 0)
      ? (site as any).carriersLogos
      : fallback;

  // Exactly TWO copies → seamless when animating -50%
  const row = [...logos, ...logos];

  // Sizes
  const CARD_W = "w-[200px] sm:w-[260px]";
  const CARD_H = "h-24 sm:h-28";
  const IMG_H = "h-10 sm:h-12";
  const IMG_MAX_W = "max-w-[150px] sm:max-w-[180px]";

  return (
    <section aria-label="Our carrier partners" className="relative bg-white py-10 carriers">
      <div className="relative w-screen left-1/2 right-1/2 -ml-[50vw] -mr-[50vw]">

        {/* Speeds: mobile faster, desktop slower (edit the seconds here) */}
        <style>{`
          .carriers { --carrier-speed: 14s; }                 /* mobile speed (faster) */
          @media (min-width: 640px) { .carriers { --carrier-speed: 30s; } } /* desktop speed */

          @keyframes carriers-marquee {
            0%   { transform: translate3d(0,0,0); }
            100% { transform: translate3d(-50%,0,0); }
          }
          /* Important: NO gap/padding on the moving track; spacing via .card margin only */
          .logos-track {
            display: flex;
            width: max-content;
            animation: carriers-marquee var(--carrier-speed) linear infinite;
            pointer-events: none; /* user can't interact/slow it */
          }

          @media (prefers-reduced-motion: reduce) {
            .logos-track { animation: none; transform: none; }
          }
        `}</style>

        {/* Edge fades */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-16 sm:w-24 bg-gradient-to-r from-white to-transparent" />
        <div className="pointer-events-none absolute inset-y-0 right-0 w-16 sm:w-24 bg-gradient-to-l from-white to-transparent" />

        {/* No X overflow; allow Y for shadows; no left padding that would break seamless loop */}
        <div className="overflow-x-hidden overflow-y-visible py-5 select-none">
          <div className="logos-track">
            {row.map((src, i) => (
              <div
                key={i}
                className={[
                  "card rounded-2xl bg-white ring-1 ring-slate-200 shadow-soft grid place-items-center shrink-0",
                  CARD_W,
                  CARD_H,
                  "mx-2", // spacing moved to margin so both halves are identical
                ].join(" ")}
              >
                <img
                  src={src}
                  alt={`Carrier ${(i % logos.length) + 1}`}
                  className={["object-contain w-auto opacity-90", IMG_H, IMG_MAX_W].join(" ")}
                  loading="lazy"
                  draggable={false}
                />
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}




/* =============================================================================
   Help / claims strip — REPAIRED (clean structure, consistent lift)
============================================================================= */
function HelpStrip() {
  return (
    <section className="relative overflow-hidden">
      <TopEdge from="from-slate-200/60" />
      <img
        src={photos.claims}
        alt="Agent completing insurance claim paperwork at a desk"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-900/85 via-brand-800/85 to-brand-800/90" />
      <div className="relative py-16 text-white">
        <div className="container">
          {/* Clean panel with consistent lift (no white box artifacts) */}
          <div className="rounded-2xl ring-1 ring-white/15 bg-white/5 backdrop-blur-md shadow-soft">
            <div className="px-5 md:px-8 py-8">
              <div className="grid md:grid-cols-3 items-center gap-8">
                <div className="md:col-span-2">
                  <h4 className="text-2xl font-semibold">Need help with a claim?</h4>
                  <p className="mt-1 text-white/90">
                    We’ll help you report, document, and follow up — even if it’s after hours.
                  </p>
                  <div className="mt-3 flex flex-wrap gap-2">
                    <Pill>Claims triage</Pill>
                    <Pill>Next-step guidance</Pill>
                    <Pill>Adjuster coordination</Pill>
                  </div>
                </div>
                <div className="flex gap-3 md:justify-end">
                  <a className="btn btn-ghost" href={site.contact.phoneHref}>
                    Call {site.contact.phone}
                  </a>
                  <NavLink className="btn btn-primary" to="/contact">
                    Message Us
                  </NavLink>
                </div>
              </div>

              {/* Languages note — slimmer + cleaner so it doesn’t look “broken” */}
              <div className="mt-6">
                <div className="rounded-xl bg-white/10 px-4 py-3 ring-1 ring-white/20 shadow-hard">
                  <p className="text-sm">
                    <strong>También hablamos español.</strong> / <strong>نتحدث العربية.</strong>{" "}
                    We serve in Spanish, Arabic, and English.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>      
    </section>
  );
}

/* =============================================================================
   FAQ
============================================================================= */
function FAQ() {
  const qa = [
    { q: "How fast can I get a quote?", a: "Many quotes are same-day. If we need extra info or specialty lines, we’ll keep you posted and usually turn it around within 24–48 hours." },
    { q: "Do you offer free SR-22s?", a: "Yes — we provide free SR-22 filings with qualifying auto policies. Ask us when you get your quote." },
    { q: "Can you help after I buy?", a: "Yes. We assist with policy changes, claims guidance, and renewal checkups to keep your coverage and price aligned." },
    { q: "Which carriers do you work with?", a: "We work with a broad network across personal and commercial lines. Exact availability varies by risk and location." },
  ];

  return (
    <section className="bg-slate-50 pt-20 pb-24 md:py-24 border-t border-slate-200 md:border-0">
      <div className="container">
        <SectionCard>
          <div className="px-4 md:px-6 py-8">
            <SectionHeader
              eyebrow="FAQ"
              title="Answers to common questions"
              subtitle="If you don’t see what you need, call or message us — we’re happy to help."
              align="center"
            />
            <div className="mt-8 max-w-3xl mx-auto">
              {qa.map((item, idx) => (
                <details key={idx} className="mb-3 overflow-hidden rounded-xl ring-1 ring-slate-200 bg-white group shadow-soft">
                  <summary className="cursor-pointer list-none px-4 py-4 flex items-center justify-between">
                    <span className="font-medium text-slate-900">{item.q}</span>
                    <span className="transition-transform group-open:rotate-180">⌄</span>
                  </summary>
                  <div className="px-4 pb-4 text-sm text-slate-600">{item.a}</div>
                </details>
              ))}
            </div>
          </div>
        </SectionCard>
      </div>
    </section>
  );
}

/* =============================================================================
   Page
============================================================================= */
type Service = {
  key: string;
  title?: string;
  name?: string;
  blurb?: string;
  desc?: string;
};

export default function Home() {
  // SEO: Organization JSON-LD
  useEffect(() => {
    const org = document.createElement("script");
    org.type = "application/ld+json";
    org.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "InsuranceAgency",
      name: site.name,
      telephone: site.contact.phone,
      email: site.contact.email,
      address: {
        "@type": "PostalAddress",
        streetAddress: OFFICE.street,
        addressLocality: OFFICE.city,
        addressRegion: OFFICE.region,
        postalCode: OFFICE.zip,
        addressCountry: "US",
      },
      url: window.location.origin,
      areaServed: "California",
    });
    document.head.appendChild(org);
    return () => org.remove();
  }, []);

  const servicesRef = useRef<HTMLDivElement | null>(null);
  const scrollToServices = () =>
    servicesRef.current?.scrollIntoView({ behavior: "smooth", block: "start" });

  const topServices = useMemo<Service[]>(() => (site.services as Service[]).slice(0, 6), []);

  // Tuned image crops (raise Auto key, lower Life family)
  const imageForService = (title: string) => {
    if (/auto|car|vehicle/i.test(title))
      return { src: photos.auto, alt: "Car key handover", objectPos: "object-[center_63%]" };
    if (/home|rent/i.test(title))
      return { src: photos.home, alt: "House model with keys", objectPos: "object-[center_60%]" };
    if (/life/i.test(title))
      return { src: photos.life, alt: "Parents with child outdoors", objectPos: "object-[center_8%]" };
    if (/commercial|business|liability|workers|bop|general/i.test(title))
      return { src: photos.commercial, alt: "Business paperwork", objectPos: "object-[center_35%]" };
    if (/motorcycle|bike|moto/i.test(title))
      return { src: photos.motorcycle, alt: "Motorcycle on road", objectPos: "object-[center_85%]" };
    if (/recreational|rv|boat|toy|specialty/i.test(title))
      return { src: photos.recreational, alt: "RV at campsite", objectPos: "object-[center_55%]" };
    return undefined;
  };

  return (
    <>
      <a
        href="#main-content"
        className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-50 focus:bg-white focus:px-3 focus:py-2 focus:rounded-lg focus:ring-2 focus:ring-brand-500"
      >
        Skip to content
      </a>

      <QuickContactBar />
      <StickyRibbon />

      {/* HERO — no more white box; content sits directly over image/gradients */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(180deg, var(--brand-900), var(--brand-800))" }}
        aria-labelledby="hero-title"
      >
        <img
          src={photos.hero}
          alt="Advisors meeting with a client in a bright office"
          className="absolute inset-0 h-full w-full object-cover opacity-35"
          fetchPriority="high"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-brand-900/55 via-brand-900/25 to-transparent" />
        <div className="absolute inset-0 bg-[radial-gradient(900px_500px_at_18%_18%,_rgba(255,255,255,0.12),_transparent)]" />

        <div className="container relative py-10 md:py-16">
          <div className="max-w-3xl">
            <p className="text-brand-200 font-semibold tracking-wide uppercase text-[11px]">
              Since 1999 · Downey, CA
            </p>
            <h1 id="hero-title" className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">
              Coverage that puts people first.
            </h1>
            <p className="mt-4 text-white/90 max-w-prose">
              Side-by-side quotes from multiple carriers, explained clearly. We match protection to
              your life and your budget — without the runaround.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <NavLink className="btn btn-primary" to="/contact">
                Start a Quote
              </NavLink>
              <button className="btn btn-ghost" onClick={scrollToServices}>
                See Services
              </button>
            </div>

            

            {/* Slim chips row */}
            <div className="mt-6 overflow-x-auto [-webkit-overflow-scrolling:touch]">
              <div className="flex items-center gap-3 min-w-max">
                <span className="inline-flex items-center gap-2 text-white/90 bg-white/10 ring-1 ring-white/15 rounded-lg px-2.5 py-1.5 text-[12px] shadow-soft">
                  {I.auto({ className: "h-4 w-4" })} Auto
                </span>
                <span className="inline-flex items-center gap-2 text-white/90 bg-white/10 ring-1 ring-white/15 rounded-lg px-2.5 py-1.5 text-[12px] shadow-soft">
                  {I.home({ className: "h-4 w-4" })} Home
                </span>
                <span className="inline-flex items-center gap-2 text-white/90 bg-white/10 ring-1 ring-white/15 rounded-lg px-2.5 py-1.5 text-[12px] shadow-soft">
                  {I.life({ className: "h-4 w-4" })} Life
                </span>
                <span className="inline-flex items-center gap-2 text-white/90 bg-white/10 ring-1 ring-white/15 rounded-lg px-2.5 py-1.5 text-[12px] shadow-soft">
                  {I.business({ className: "h-4 w-4" })} Business
                </span>
                <span className="inline-flex items-center gap-2 text-white/90 bg-white/10 ring-1 ring-white/15 rounded-lg px-2.5 py-1.5 text-[12px] shadow-soft">
                  {I.bike({ className: "h-4 w-4" })} Motorcycle
                </span>
                <span className="inline-flex items-center gap-2 text-white/90 bg-white/10 ring-1 ring-white/15 rounded-lg px-2.5 py-1.5 text-[12px] shadow-soft">
                  {I.rv({ className: "h-4 w-4" })} RV / Rec
                </span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* KPIs */}
      <StatsStrip />

      {/* SERVICES */}
<section ref={servicesRef} className="pt-0 md:pt-0 pb-8 md:pb-10 bg-white" id="main-content">
        <div className="container">
          <SectionCard>
            <div className="px-4 md:px-6 py-8">
              <SectionHeader
                title="Personal & Commercial Insurance"
                subtitle="We shop multiple carriers to find value — not just a price."
              />
              <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {useMemo(() => topServices, [topServices]).map((s) => {
                  const title = s.title ?? s.name ?? s.key;
                  const blurb = s.blurb ?? s.desc ?? "";
                  const img = imageForService(title);
                  return (
                    <ServiceCard
                      key={s.key}
                      title={title}
                      blurb={blurb}
                      image={img?.src}
                      alt={img?.alt}
                      objectPos={img?.objectPos}
                    />
                  );
                })}
              </div>
              <div className="mt-3">
                <NavLink to="/services" className="btn btn-ghost">
                  Explore all services
                </NavLink>
              </div>
            </div>
          </SectionCard>
        </div>
      </section>

      {/* CARRIERS */}
      <CarriersCarousel />

      {/* ABOUT */}
      <section className="pt-16 md:pt-20 pb-24 md:pb-20 bg-slate-50">
        <div className="container grid lg:grid-cols-2 gap-10 items-center">
          <SectionCard className="order-2 lg:order-1">
            <div className="px-6 py-6">
              <SectionHeader title="Local service. 25+ years of experience." subtitle={site.description} />
              <ul className="mt-5 grid gap-2 text-slate-700">
                <li>• Multiple carrier quotes — we do the shopping.</li>
                <li>• Friendly, multilingual staff (Arabic, Spanish, English).</li>
                <li>• Claims guidance when you need it most.</li>
              </ul>
              <NavLink to="/about" className="btn btn-primary mt-6">
                About Us
              </NavLink>
            </div>
          </SectionCard>

          <figure className="order-1 lg:order-2 relative aspect-[4/3] w-full overflow-hidden rounded-2xl ring-1 ring-slate-900/10 shadow-soft">
            <img
              src={photos.about}
              alt="Handshake after reviewing coverage options with a licensed broker"
              className="h-full w-full object-cover"
              loading="lazy"
            />
            <figcaption className="absolute bottom-2 right-2 text-[11px] bg-black/40 text-white px-2 py-1 rounded">
              Personal service, clear guidance.
            </figcaption>
          </figure>
        </div>
      </section>

      {/* HOW IT WORKS */}
      <QuoteSteps />

      {/* REVIEWS */}
      <Testimonials />

      {/* HELP STRIP (fixed) */}
      <HelpStrip />

      {/* FAQ */}
      <FAQ />
    </>
  );
}
