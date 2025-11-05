// src/pages/About.tsx
import { site } from "../lib/site";

/* ─────────────────────────────
   Micro UI atoms (no checkmarks)
───────────────────────────── */
function Card({ children, className = "" }: { children: React.ReactNode; className?: string }) {
  return <div className={`card ring-1 ring-slate-200 ${className}`}>{children}</div>;
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <Card className="px-5 py-4 text-center">
      <div className="text-xl md:text-2xl font-semibold text-brand-800">{value}</div>
      <div className="text-[12px] md:text-[13px] text-slate-600">{label}</div>
    </Card>
  );
}

function Eyebrow({ children }: { children: React.ReactNode }) {
  return (
    <p className="text-brand-200 uppercase tracking-[0.16em] text-[10px] font-semibold">
      {children}
    </p>
  );
}

function SectionHeader({
  title,
  blurb,
  center = false,
}: {
  title: string;
  blurb?: string;
  center?: boolean;
}) {
  return (
    <header className={center ? "text-center max-w-xl mx-auto" : "max-w-xl"}>
      <h2 className="text-[20px] md:text-[22px] font-semibold text-slate-900">{title}</h2>
      {blurb && <p className="mt-1.5 text-[13px] text-slate-700">{blurb}</p>}
    </header>
  );
}

/* ─────────────────────────────
   Icon set (subtle, circular bg)
───────────────────────────── */
const I = {
  heart: (p: any) => (
    <svg viewBox="0 0 24 24" aria-hidden fill="currentColor" {...p}>
      <path d="M12 21s-8.5-5.6-8.5-11c0-2.9 2.3-5 5-5 1.9 0 3.1.9 3.5 1.7.4-.8 1.6-1.7 3.5-1.7 2.7 0 5 2.1 5 5 0 5.4-8.5 11-8.5 11z" />
    </svg>
  ),
  shield: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 2 4 6v6c0 5 3.6 8.7 8 10 4.4-1.3 8-5 8-10V6l-8-4z" />
    </svg>
  ),
  headset: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 3a9 9 0 0 0-9 9v4a3 3 0 0 0 3 3h2v-6H6v-1a6 6 0 0 1 12 0v1h-2v6h2a3 3 0 0 0 3-3v-4a9 9 0 0 0-9-9z" />
    </svg>
  ),
  spark: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="m12 2 1.7 5.3L19 9l-5.3 1.7L12 16l-1.7-5.3L5 9l5.3-1.7L12 2z" />
    </svg>
  ),
  layers: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M12 3 2 9l10 6 10-6-10-6zm0 10L2 7v2l10 6 10-6V7l-10 6zm0 4L2 11v2l10 6 10-6v-2l-10 6z" />
    </svg>
  ),
  star: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="m12 17.3 6 3.6-1.6-6.9 5.3-4.5-7-.6L12 2 9.3 8.9l-7 .6 5.3 4.5L6 20.9z" />
    </svg>
  ),
  doc: (p: any) => (
    <svg viewBox="0 0 24 24" fill="currentColor" {...p}>
      <path d="M6 2h8l4 4v14a2 2 0 0 1-2 2H6a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2zm7 1v4h4" />
    </svg>
  ),
};

/* FeatureRow: icon in subtle circle, title + caption */
function FeatureRow({
  icon,
  title,
  caption,
}: {
  icon: keyof typeof I;
  title: string;
  caption: string;
}) {
  const Icon = I[icon];
  return (
    <div className="flex items-start gap-3">
      <span className="grid place-items-center shrink-0 h-8 w-8 rounded-full bg-brand-50 ring-1 ring-brand-100">
        <Icon className="h-4 w-4 text-brand-700" />
      </span>
      <div>
        <div className="text-[13px] font-medium text-slate-900">{title}</div>
        <p className="text-[12px] text-slate-600">{caption}</p>
      </div>
    </div>
  );
}

/* Pill (used as small badges) */
function Pill({ children }: { children: React.ReactNode }) {
  return (
    <span className="inline-flex items-center rounded-full bg-slate-50 ring-1 ring-slate-200 px-2.5 py-1 text-[11px] text-slate-700">
      {children}
    </span>
  );
}

/* ─────────────────────────────
   Page
───────────────────────────── */
export default function About() {
  return (
    <main id="main-content">
      {/* Mini-hero (compact) */}
      <section
        className="relative text-white"
        style={{ background: "linear-gradient(180deg, var(--brand-900), var(--brand-800))" }}
      >
        <div className="container py-7 md:py-9">
          <Eyebrow>About us</Eyebrow>
          <h1 className="mt-1 font-display text-[24px] md:text-[28px] font-semibold leading-snug">
            {site.name}: trusted coverage with personal service
          </h1>
          <p className="mt-2 text-white/90 max-w-prose text-[13px]">{site.description}</p>
          <div className="mt-4 flex flex-wrap gap-1.5">
            <a href="/services" className="btn btn-ghost !px-3 !py-1.5 !text-[13px]">Browse Services</a>
            <a href="/contact" className="btn btn-primary !px-3 !py-1.5 !text-[13px]">Request a Quote</a>
          </div>
        </div>
      </section>

      {/* Stats (denser) */}
      <section className="py-6 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            <Stat value="25+" label="Years serving CA" />
            <Stat value="30+" label="Carriers quoted" />
            <Stat value="4.8★" label="Client review average" />
            <Stat value="3" label="Languages spoken" />
          </div>
        </div>
      </section>

      {/* Mission / Values / Promise — REWORKED (no checkmarks) */}
      <section className="py-9 md:py-10 bg-white">
        <div className="container grid lg:grid-cols-3 gap-3 md:gap-4">
          {/* Mission */}
          <Card className="p-4 md:p-5">
            <h3 className="text-[15px] font-semibold text-slate-900">Our mission</h3>
            <p className="mt-1.5 text-[13px] text-slate-700 leading-relaxed">
              Make insurance simple and transparent by doing the heavy lifting: shopping multiple carriers,
              explaining coverages in plain language, and advocating for you at claim time.
            </p>
            <div className="mt-3">
              <FeatureRow
                icon="heart"
                title="People first"
                caption="Advice that puts your situation ahead of sales targets."
              />
            </div>
          </Card>

          {/* Values */}
          <Card className="p-4 md:p-5">
            <h3 className="text-[15px] font-semibold text-slate-900">What we value</h3>
            <div className="mt-2 grid gap-2.5">
              <FeatureRow
                icon="layers"
                title="Clarity over jargon"
                caption="Plain-language guidance for real decisions."
              />
              <FeatureRow
                icon="headset"
                title="Real responsiveness"
                caption="Talk to a licensed local team, not a call center."
              />
              <FeatureRow
                icon="spark"
                title="Unbiased options"
                caption="We’re not tied to one brand or quota."
              />
            </div>
          </Card>

          {/* Promise */}
          <Card className="p-4 md:p-5">
            <h3 className="text-[15px] font-semibold text-slate-900">Our promise</h3>
            <div className="mt-2 grid gap-2.5">
              <FeatureRow
                icon="star"
                title="Discount scan, every time"
                caption="We compare multi-carrier savings on each quote."
              />
              <FeatureRow
                icon="doc"
                title="Same-day essentials"
                caption="eID cards and bind assistance whenever possible."
              />
              <FeatureRow
                icon="shield"
                title="Advocacy on claims"
                caption="Guidance and follow-ups through the process."
              />
            </div>
          </Card>
        </div>
      </section>

      {/* Story + Timeline (slim) */}
      <section className="py-9 md:py-10 bg-slate-50">
        <div className="container grid lg:grid-cols-2 gap-5 md:gap-7 items-start">
          <div>
            <SectionHeader
              title="Our story"
              blurb="We opened our doors in 1999 to give neighbors a better way to buy insurance: unbiased options, friendly explanations, and real help when life happens. Today we serve clients across California — in English, Spanish, and Arabic — with the same one-to-one service we started with."
            />
          </div>

          <ol className="relative pl-4">
            <span className="absolute left-1 top-1 bottom-1 w-[2px] bg-slate-200 rounded" aria-hidden />
            {[
              { year: "1999", text: "Original Insurance founded in Downey, CA." },
              { year: "2007", text: "Expanded carrier network and added commercial lines." },
              { year: "2016", text: "Digital service: eID cards, text, and email support." },
              { year: "Today", text: "30+ carriers shopped with fast, transparent quotes." },
            ].map((item) => (
              <li key={item.year} className="mb-3 last:mb-0">
                <div className="relative ml-3">
                  <span className="absolute -left-3 top-1 h-2 w-2 rounded-full bg-brand-600 ring-2 ring-white" aria-hidden />
                  <p className="text-[12px] font-semibold text-brand-700">{item.year}</p>
                  <p className="text-[13px] text-slate-700">{item.text}</p>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Why a broker? (cards with badges, no lists) */}
      <section className="py-9 md:py-10 bg-white">
        <div className="container">
          <SectionHeader
            title="Why choose a broker?"
            blurb="Brokers aren’t tied to one brand. We compare quotes and coverage across multiple companies, so you get options — not ultimatums."
          />
          <div className="mt-4 grid md:grid-cols-3 gap-3 md:gap-4">
            <Card className="p-4 md:p-5">
              <div className="flex items-center gap-2">
                <span className="grid place-items-center h-9 w-9 rounded-full bg-brand-50 ring-1 ring-brand-100">
                  {I.layers({ className: "h-5 w-5 text-brand-700" })}
                </span>
                <h3 className="text-[15px] font-semibold text-slate-900">More options</h3>
              </div>
              <p className="mt-2 text-[13px] text-slate-600">
                We scan 30+ carriers for fit and value.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Pill>Multi-carrier</Pill>
                <Pill>Bundle scan</Pill>
                <Pill>SR-22 friendly</Pill>
              </div>
            </Card>

            <Card className="p-4 md:p-5">
              <div className="flex items-center gap-2">
                <span className="grid place-items-center h-9 w-9 rounded-full bg-brand-50 ring-1 ring-brand-100">
                  {I.heart({ className: "h-5 w-5 text-brand-700" })}
                </span>
                <h3 className="text-[15px] font-semibold text-slate-900">Better guidance</h3>
              </div>
              <p className="mt-2 text-[13px] text-slate-600">
                Straight talk on coverages and trade-offs.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Pill>Plain-language</Pill>
                <Pill>Local team</Pill>
                <Pill>No quotas</Pill>
              </div>
            </Card>

            <Card className="p-4 md:p-5">
              <div className="flex items-center gap-2">
                <span className="grid place-items-center h-9 w-9 rounded-full bg-brand-50 ring-1 ring-brand-100">
                  {I.headset({ className: "h-5 w-5 text-brand-700" })}
                </span>
                <h3 className="text-[15px] font-semibold text-slate-900">Real support</h3>
              </div>
              <p className="mt-2 text-[13px] text-slate-600">
                From quoting to claims, we’re your advocate.
              </p>
              <div className="mt-3 flex flex-wrap gap-1.5">
                <Pill>Claims triage</Pill>
                <Pill>Renewal checkups</Pill>
                <Pill>Same-day eID</Pill>
              </div>
            </Card>
          </div>
        </div>
      </section>

      {/* Badges / affiliations (minimal) */}
      <section className="py-8 bg-slate-50">
        <div className="container">
          <SectionHeader
            title="Licenses & affiliations"
            blurb="Licensed California brokerage. Member of industry groups committed to ethical standards and consumer advocacy."
          />
          <div className="mt-3 grid grid-cols-2 md:grid-cols-4 gap-3 md:gap-4">
            {["CA DOI Licensed", "IIAB Member", "Better Business", "Local Chamber"].map((b) => (
              <div
                key={b}
                className="rounded-lg bg-white ring-1 ring-slate-200 px-3 py-2.5 text-center text-[12px] text-slate-700"
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>
      
    </main>
  );
}
