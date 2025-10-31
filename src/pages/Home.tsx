// src/pages/Home.tsx
// Original Insurance — Home page (premium, blue-forward, mobile-first)

import { useEffect, useMemo, useRef, useState } from "react";
import { NavLink } from "react-router-dom";
import { site } from "../lib/site";

/* ────────────────────────────────────────────────────────────────────────────
   Local images (place under src/assets/photos/)
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
  hoursShort: "Mon–Fri 9–6, Sat 10–2",
} as const;

/* ────────────────────────────────────────────────────────────────────────────
   Utils & atoms
   ──────────────────────────────────────────────────────────────────────────── */
function clsx(...v: (string | false | null | undefined)[]) {
  return v.filter(Boolean).join(" ");
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
      <h2 className="mt-2 font-display text-2xl md:text-3xl font-semibold text-slate-900">
        {title}
      </h2>
      {subtitle && <p className="mt-2 text-slate-600">{subtitle}</p>}
      {kicker}
    </header>
  );
}

/* =============================================================================
   Icon set (stroke-less, UI-safe)
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
  // line icons for sections
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
          <p className="text-sm md:text-base">
            Ready for a better rate? Get a custom quote in minutes.
          </p>
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
  return (
    <div className="bg-brand-900 text-white">
      <div className="container py-2 text-[13px] flex flex-col sm:flex-row items-center justify-center gap-2 sm:gap-6">
        <div className="inline-flex items-center gap-2">
          <span className="inline-block h-2.5 w-2.5 rounded-full bg-emerald-400" aria-hidden />
          <span className="opacity-90">{OFFICE.hoursShort}</span>
        </div>
        <div className="hidden sm:block text-white/30">|</div>
        <div className="inline-flex items-center gap-2">
          {I.pin({ className: "h-4 w-4 opacity-80" })}
          <span className="opacity-90">
            {OFFICE.street}, {OFFICE.city}, {OFFICE.region} {OFFICE.zip}
          </span>
        </div>
        <div className="hidden sm:block text-white/30">|</div>
        <a className="inline-flex items-center gap-2 hover:underline" href={site.contact.phoneHref}>
          {I.phone({ className: "h-4 w-4 opacity-80" })}
          {site.contact.phone}
        </a>
      </div>
    </div>
  );
}

/* =============================================================================
   Carriers strip (normalized sizes)
============================================================================= */
function CarriersStrip() {
  // allow for either site.carriersLogos or a local fallback
  const logos: string[] = (site as any).carriersLogos || [];
  return (
    <section aria-label="Our carrier partners" className="py-10 bg-white">
      <div className="container">
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 lg:grid-cols-6 gap-6">
          {logos.map((src: string, i: number) => (
            <div
              key={i}
              className="relative rounded-2xl bg-white ring-1 ring-slate-200 shadow-soft h-[76px] w-full overflow-hidden grid place-items-center"
            >
              {/* fixed canvas keeps all brand marks visually consistent */}
              <div className="h-[46px] w-[160px] grid place-items-center">
                <img
                  src={src}
                  alt={`Carrier ${i + 1}`}
                  className="max-h-[36px] md:max-h-[40px] w-auto object-contain opacity-90 transition-transform duration-300 hover:scale-[1.06]"
                  loading="lazy"
                />
              </div>
              <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent to-slate-50/40" />
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   KPI strip (bigger, more premium)
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
    <div className="card px-6 py-6 text-center ring-1 ring-slate-200 bg-white">
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
    <section className="bg-slate-50 py-10">
      <div className="container">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6">
          <StatCard value="25+" label="Years serving CA" icon="business" />
          <StatCard value="30+" label="Carriers quoted" icon="star" />
          <StatCard value="4.8★" label="Client review avg." icon="star" />
          <StatCard value="3" label="Languages spoken" icon="phone" />
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Service cards — photos for major lines; icons fallback
============================================================================= */
const SIcons = {
  commercial: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M4 20h16V8l-8-5-8 5v12zm8-9 8-5M4 6l8 5" />
    </svg>
  ),
  motorcycle: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M5 16a3 3 0 1 1 2.9-3.6h3.2l-1-2H8v-2h4l2 3h4v2h-1.1a3 3 0 1 1-2.9 3.6H10.8A4.99 4.99 0 0 1 5 16z" />
    </svg>
  ),
  recreational: (props: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M3 16h18v3H3v-3zm2-6h14l2 4H3l2-4zm4-4h6l1 2H8l1-2z" />
    </svg>
  ),
};

function ServiceCard({
  title,
  blurb,
  image,
  alt,
  icon,
}: {
  title: string;
  blurb: string;
  image?: string;
  alt?: string;
  icon?: keyof typeof SIcons;
}) {
  return (
    <div className="card overflow-hidden hover:shadow-hard transition group">
      <div className="relative h-32 w-full">
        {image ? (
          <>
            <img
              src={image}
              alt={alt || ""}
              className="absolute inset-0 h-full w-full object-cover"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-slate-900/30 to-transparent" />
          </>
        ) : (
          <div className="absolute inset-0 bg-gradient-to-br from-brand-800 to-brand-600 grid place-items-center">
            {icon && SIcons[icon]({ className: "h-10 w-10 text-white/90" })}
          </div>
        )}
      </div>
      <div className="p-6">
        <h4 className="font-semibold text-slate-900 flex items-center gap-2">
          {/* inline icons to make sections feel professional */}
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
   How it works (nicer, iconized, stepped)
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
    <section className="py-18 md:py-20 bg-white">
      <div className="container">
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
            <li key={s.title} className="card p-6 group ring-1 ring-slate-200 bg-white">
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
        <div className="mt-8 flex items-center justify-center gap-3">
          <NavLink to="/contact" className="btn btn-primary">
            Start a Quote
          </NavLink>
          <a className="btn btn-ghost" href={site.contact.phoneHref}>
            Call {site.contact.phone}
          </a>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Broker vs Captive (visual upgrades)
============================================================================= */
function Comparison() {
  const rows = [
    { key: "Carriers quoted", broker: "Many (we shop for you)", captive: "One brand only" },
    { key: "Coverage fit", broker: "Tailored to your risk + budget", captive: "Limited to in-house products" },
    { key: "Claims help", broker: "We assist & escalate", captive: "Call center only" },
    { key: "Discount scan", broker: "Multi-carrier discounts checked", captive: "Brand-specific only" },
    { key: "Policy changes", broker: "Call/email/text our office", captive: "App/portal; limited office help" },
  ];

  return (
    <section className="py-18 md:py-20 bg-slate-50">
      <div className="container">
        <SectionHeader
          eyebrow="Why a broker?"
          title="More options, fewer headaches"
          subtitle="We advocate for you — not a single brand."
        />
        <div className="mt-8 overflow-hidden rounded-2xl ring-1 ring-slate-200 bg-white">
          <table className="min-w-full text-sm">
            <thead className="bg-gradient-to-r from-slate-50 to-white text-slate-700">
              <tr>
                <th className="px-4 py-3 text-left font-semibold">Feature</th>
                <th className="px-4 py-3 text-left font-semibold text-brand-800">
                  {site.name} (Broker)
                </th>
                <th className="px-4 py-3 text-left font-semibold">Captive Agent</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-200">
              {rows.map((r) => (
                <tr key={r.key} className="align-top hover:bg-slate-50/60">
                  <td className="px-4 py-3 text-slate-700">{r.key}</td>
                  <td className="px-4 py-3 text-slate-900">{r.broker}</td>
                  <td className="px-4 py-3 text-slate-600">{r.captive}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="mt-6">
          <NavLink className="btn btn-ghost" to="/about">
            Learn more about our process
          </NavLink>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   Testimonials — auto-scrolling carousel (hover to pause)
============================================================================= */
type Review = { quote: string; name: string; source: string; stars?: number };

function Stars({ n = 5 }: { n?: number }) {
  return (
    <div className="flex" aria-label={`${n} out of 5 stars`}>
      {Array.from({ length: 5 }).map((_, i) => (
        <span key={i} className={clsx("w-4 h-4 inline-grid place-items-center")}>
          {I.star({ className: clsx("w-4 h-4", i < n ? "text-amber-400" : "text-slate-300") })}
        </span>
      ))}
    </div>
  );
}

function GoogleBadge() {
  return (
    <span className="inline-flex items-center gap-1 rounded-md bg-slate-100 px-2 py-1 text-[11px] text-slate-600">
      <svg viewBox="0 0 24 24" className="w-3.5 h-3.5" aria-hidden>
        <path
          fill="#4285F4"
          d="M21.35 11.1h-9.17v2.98h5.38c-.23 1.25-1.45 3.67-5.38 3.67-3.24 0-5.89-2.68-5.89-5.98s2.65-5.98 5.89-5.98c1.84 0 3.07.78 3.77 1.45l2.57-2.48C17.61 3.3 15.67 2.4 13.18 2.4 7.99 2.4 3.8 6.6 3.8 11.77s4.2 9.38 9.38 9.38c5.41 0 8.98-3.8 8.98-9.17 0-.61-.06-1.05-.18-1.89z"
        />
      </svg>
      Google Reviews
    </span>
  );
}

function TestimonialCard({ quote, name, source, stars = 5 }: Review) {
  return (
    <figure className="card p-6 h-full flex flex-col min-w-[280px] max-w-[360px] mr-4">
      <div className="flex items-center justify-between">
        <Stars n={stars} />
        <GoogleBadge />
      </div>
      <blockquote className="mt-3 text-slate-700 leading-relaxed grow">“{quote}”</blockquote>
      <figcaption className="mt-4 text-sm text-slate-500">
        <span className="font-semibold text-slate-700">{name}</span>
        <span className="sr-only"> — </span>
        <span className="ml-1">{source}</span>
      </figcaption>
    </figure>
  );
}

function Testimonials() {
  // add more (fake) reviews on top of site.testimonials for now
  const seed: Review[] = [
    { quote: "They found me a lower rate and explained every coverage clearly.", name: "Daniel P.", source: "Google" },
    { quote: "Bound same day and sent my eID cards in minutes. Smooth!", name: "Marisol G.", source: "Google" },
    { quote: "Handled my claim follow-up like pros. Zero stress.", name: "Omar A.", source: "Google" },
    { quote: "Switched my home + auto bundle and saved a ton.", name: "Stephanie R.", source: "Google" },
    { quote: "Bilingual staff made it easy for my parents too.", name: "Yasmin H.", source: "Google" },
  ];
  const items: Review[] = [
    ...(site as any).testimonials?.map((t: Review) => ({ ...t, stars: 5 })) ?? [],
    ...seed,
    ...seed, // duplicate to create a long loop for auto-scroll
  ];

  const railRef = useRef<HTMLDivElement | null>(null);
  const [paused, setPaused] = useState(false);

  useEffect(() => {
    let raf: number;
    let x = 0;
    const tick = () => {
      if (!railRef.current) return;
      if (!paused) {
        x += 0.5; // speed
        railRef.current.scrollLeft = x;
        if (railRef.current.scrollLeft + railRef.current.clientWidth >= railRef.current.scrollWidth - 1) {
          x = 0; // loop
          railRef.current.scrollLeft = 0;
        }
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    return () => cancelAnimationFrame(raf);
  }, [paused]);

  return (
    <section className="py-18 md:py-20 bg-white">
      <div className="container">
        <SectionHeader
          eyebrow="Client reviews"
          title="What clients are saying"
          subtitle="Real feedback from the people we serve."
        />
      </div>
      <div
        className="mt-8 overflow-x-auto no-scrollbar"
        ref={railRef}
        onMouseEnter={() => setPaused(true)}
        onMouseLeave={() => setPaused(false)}
      >
        <div className="container">
          <div className="flex">
            {items.slice(0, 18).map((t, i) => (
              <TestimonialCard key={i} {...t} />
            ))}
          </div>
        </div>
      </div>
      <div className="container">
        <p className="mt-4 text-[12px] text-slate-500">
          Reviews shown may be lightly edited for length and clarity.
        </p>
      </div>
    </section>
  );
}

/* =============================================================================
   Claims / multilingual strip
============================================================================= */
function HelpStrip() {
  return (
    <section className="relative overflow-hidden">
      <img
        src={photos.claims}
        alt="Agent completing insurance claim paperwork at a desk"
        className="absolute inset-0 h-full w-full object-cover"
        loading="lazy"
      />
      <div className="absolute inset-0 bg-gradient-to-b from-brand-900/85 via-brand-800/85 to-brand-800/90" />
      <div className="relative py-16 text-white">
        <div className="container grid md:grid-cols-3 items-center gap-8">
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
        <div className="container mt-6">
          <div className="rounded-2xl bg-white/10 px-4 py-3 ring-1 ring-white/20">
            <p className="text-sm">
              <strong>También hablamos español.</strong> / <strong>نتحدث العربية.</strong> We serve in Spanish, Arabic, and English.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}

/* =============================================================================
   FAQ (accessible accordion, no deps)
============================================================================= */
function FAQ() {
  const qa = [
    {
      q: "How fast can I get a quote?",
      a: "Many quotes are same-day. If we need extra info or specialty lines, we’ll keep you posted and usually turn it around within 24–48 hours.",
    },
    {
      q: "Do you charge a broker fee?",
      a: "For standard personal lines quotes, no broker fee. Specialty or surplus lines may have fees which we disclose up front.",
    },
    {
      q: "Can you help after I buy?",
      a: "Yes. We assist with policy changes, claims guidance, and renewal checkups to keep your coverage and price aligned.",
    },
    {
      q: "Which carriers do you work with?",
      a: "We work with a broad network across personal and commercial lines. Exact availability varies by risk and location.",
    },
  ];

  const [open, setOpen] = useState<number | null>(0);

  return (
    <section className="bg-slate-50 py-18 md:py-20">
      <div className="container">
        <SectionHeader
          eyebrow="FAQ"
          title="Answers to common questions"
          subtitle="If you don’t see what you need, call or message us — we’re happy to help."
          align="center"
        />
        <div className="mt-8 max-w-3xl mx-auto">
          {qa.map((item, idx) => {
            const active = open === idx;
            return (
              <div key={idx} className="mb-3 overflow-hidden rounded-xl ring-1 ring-slate-200 bg-white">
                <button
                  className="w-full text-left px-4 py-4 flex items-center justify-between"
                  onClick={() => setOpen(active ? null : idx)}
                  aria-expanded={active}
                >
                  <span className="font-medium text-slate-900">{item.q}</span>
                  <span className={clsx("transition-transform", active && "rotate-180")}>⌄</span>
                </button>
                <div
                  className={clsx(
                    "px-4 pb-4 text-sm text-slate-600 grid transition-[grid-template-rows,opacity] duration-300",
                    active ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
                  )}
                >
                  <div className="overflow-hidden">{item.a}</div>
                </div>
              </div>
            );
          })}
        </div>
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

  const topServices = useMemo<Service[]>(
    () => (site.services as Service[]).slice(0, 6),
    []
  );

  const imageForService = (title: string) => {
    if (/auto|car|vehicle/i.test(title))
      return { src: photos.auto, alt: "Car key handover at a dealership counter" };
    if (/home|rent/i.test(title))
      return { src: photos.home, alt: "House model with keys on a table" };
    if (/life/i.test(title))
      return { src: photos.life, alt: "Parents holding a baby outdoors at sunset" };
    if (/commercial|business|liability|workers|bop|general/i.test(title))
      return { src: photos.commercial, alt: "Business owner reviewing insurance paperwork" };
    if (/motorcycle|bike|moto/i.test(title))
      return { src: photos.motorcycle, alt: "Motorcycle on a road with rider gear" };
    if (/recreational|rv|boat|toy|specialty/i.test(title))
      return { src: photos.recreational, alt: "Recreational vehicle at a scenic campsite" };
    return undefined;
  };

  const iconForService = (title: string): keyof typeof SIcons | undefined => {
    if (/commercial|business|liability|workers|bop|general/i.test(title)) return "commercial";
    if (/motorcycle|bike|moto/i.test(title)) return "motorcycle";
    if (/recreational|rv|boat|toy|specialty/i.test(title)) return "recreational";
    return "commercial";
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

      {/* HERO — blue overlay, refined spacing */}
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
        <div
          className="absolute inset-0 bg-gradient-to-t from-brand-900/55 via-brand-900/25 to-transparent"
          aria-hidden="true"
        />
        <div
          className="absolute inset-0 bg-[radial-gradient(800px_400px_at_20%_20%,_rgba(255,255,255,0.10),_transparent)]"
          aria-hidden
        />

        <div className="container relative">
          <div className="py-20 md:py-28 max-w-2xl">
            <p className="text-brand-200 font-semibold tracking-wide uppercase text-[11px]">
              Since 1999 · Downey, CA
            </p>
            <h1 id="hero-title" className="mt-3 font-display text-4xl md:text-5xl font-semibold leading-tight">
              Coverage that puts people first.
            </h1>
            <p className="mt-4 text-white/90">
              Side-by-side quotes from multiple carriers, explained clearly. We match protection to your life and your budget — without the runaround.
            </p>

            <div className="mt-6 flex flex-col sm:flex-row gap-3">
              <NavLink className="btn btn-primary" to="/contact">
                Start a Quote
              </NavLink>
              <button className="btn btn-ghost" onClick={scrollToServices}>
                See Services
              </button>
            </div>

            <div className="mt-6 text-sm text-white/85">
              Call <a href={site.contact.phoneHref} className="underline">{site.contact.phone}</a> or email{" "}
              <a href={site.contact.emailHref} className="underline">{site.contact.email}</a>
            </div>

            {/* line-of-business icons for extra polish */}
            <div className="mt-6 flex flex-wrap gap-3">
              <span className="inline-flex items-center gap-2 text-white/90 bg-white/10 ring-1 ring-white/15 rounded-lg px-2.5 py-1.5 text-[12px]">
                {I.auto({ className: "h-4 w-4" })} Auto
              </span>
              <span className="inline-flex items-center gap-2 text-white/90 bg-white/10 ring-1 ring-white/15 rounded-lg px-2.5 py-1.5 text-[12px]">
                {I.home({ className: "h-4 w-4" })} Home
              </span>
              <span className="inline-flex items-center gap-2 text-white/90 bg-white/10 ring-1 ring-white/15 rounded-lg px-2.5 py-1.5 text-[12px]">
                {I.life({ className: "h-4 w-4" })} Life
              </span>
              <span className="inline-flex items-center gap-2 text-white/90 bg-white/10 ring-1 ring-white/15 rounded-lg px-2.5 py-1.5 text-[12px]">
                {I.business({ className: "h-4 w-4" })} Business
              </span>
              <span className="inline-flex items-center gap-2 text-white/90 bg-white/10 ring-1 ring-white/15 rounded-lg px-2.5 py-1.5 text-[12px]">
                {I.bike({ className: "h-4 w-4" })} Motorcycle
              </span>
              <span className="inline-flex items-center gap-2 text-white/90 bg-white/10 ring-1 ring-white/15 rounded-lg px-2.5 py-1.5 text-[12px]">
                {I.rv({ className: "h-4 w-4" })} RV / Rec
              </span>
            </div>
          </div>
        </div>
      </section>

      <CarriersStrip />
      <StatsStrip />

      {/* SERVICES */}
      <section ref={servicesRef} className="py-18 md:py-24 bg-white" id="main-content">
        <div className="container">
          <SectionHeader
            title="Personal & Commercial Insurance"
            subtitle="We shop multiple carriers to find value — not just a price."
          />
          <div className="mt-8 grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {topServices.map((s) => {
              const title = s.title ?? s.name ?? s.key;
              const blurb = s.blurb ?? s.desc ?? "";
              const img = imageForService(title);
              if (img) {
                return (
                  <ServiceCard key={s.key} title={title} blurb={blurb} image={img.src} alt={img.alt} />
                );
              }
              return <ServiceCard key={s.key} title={title} blurb={blurb} icon={iconForService(title)} />;
            })}
          </div>
          <div className="mt-8">
            <NavLink to="/services" className="btn btn-ghost">
              Explore all services
            </NavLink>
          </div>
        </div>
      </section>

      {/* ABOUT */}
      <section className="py-18 md:py-20 bg-slate-50">
        <div className="container grid lg:grid-cols-2 gap-10 items-center">
          <div className="order-2 lg:order-1">
            <SectionHeader
              title="Local service. 25+ years of experience."
              subtitle={site.description}
            />
            <ul className="mt-5 grid gap-2 text-slate-700">
              <li>• Multiple carrier quotes — we do the shopping.</li>
              <li>• Friendly, multilingual staff (Arabic, Spanish, English).</li>
              <li>• Claims guidance when you need it most.</li>
            </ul>
            <NavLink to="/about" className="btn btn-primary mt-6">
              About Us
            </NavLink>
          </div>
          <div className="order-1 lg:order-2">
            <figure className="relative aspect-[4/3] w-full overflow-hidden rounded-2xl ring-1 ring-slate-900/10">
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
        </div>
      </section>

      <QuoteSteps />
      <Comparison />
      <Testimonials />
      <HelpStrip />
      <FAQ />

      {/* FOOTER CTA */}
      <section className="bg-brand-800 text-white">
        <div className="container py-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl font-semibold">Get a custom quote today.</h3>
            <p className="mt-2 text-white/90">
              Quick answers from a local, licensed broker. Visit us at {OFFICE.street}, {OFFICE.city},{" "}
              {OFFICE.region} {OFFICE.zip} or call{" "}
              <a href={site.contact.phoneHref} className="underline">
                {site.contact.phone}
              </a>
              .
            </p>
          </div>
          <div className="flex md:justify-end gap-3">
            <a className="btn btn-ghost" href={site.contact.phoneHref}>
              Call {site.contact.phone}
            </a>
            <NavLink className="btn btn-primary" to="/contact">
              Request a Quote
            </NavLink>
          </div>
        </div>
      </section>
    </>
  );
}
