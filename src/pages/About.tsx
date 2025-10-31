// src/pages/About.tsx
import { site } from "../lib/site";

function IconCheck(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="w-4 h-4" {...props}>
      <path
        fill="currentColor"
        d="M9.6 16.6 4.9 12l1.8-1.8 2.9 2.9 6.7-6.7L18 8.2 9.6 16.6z"
      />
    </svg>
  );
}

function IconHeart(props: React.SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 24 24" aria-hidden className="w-5 h-5" {...props}>
      <path
        fill="currentColor"
        d="M12 21s-8.5-5.6-8.5-11c0-2.9 2.3-5 5-5 1.9 0 3.1.9 3.5 1.7.4-.8 1.6-1.7 3.5-1.7 2.7 0 5 2.1 5 5 0 5.4-8.5 11-8.5 11z"
      />
    </svg>
  );
}

function Stat({ value, label }: { value: string; label: string }) {
  return (
    <div className="card px-6 py-5 text-center">
      <div className="text-2xl md:text-3xl font-semibold text-brand-700">{value}</div>
      <div className="text-xs md:text-sm text-slate-600">{label}</div>
    </div>
  );
}

export default function About() {
  return (
    <main id="main-content">
      {/* Mini hero */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(180deg, var(--brand-900), var(--brand-800))" }}
      >
        <div className="container py-12 md:py-16">
          <p className="text-brand-200 uppercase tracking-[0.16em] text-[11px] font-semibold">
            About us
          </p>
          <h1 className="mt-2 font-display text-3xl md:text-4xl font-semibold">
            {site.name}: trusted coverage with personal service
          </h1>
          <p className="mt-3 text-white/90 max-w-prose">
            {site.description}
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href="/services" className="btn btn-ghost">Browse Services</a>
            <a href="/contact" className="btn btn-primary">Request a Quote</a>
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="py-10 bg-slate-50">
        <div className="container">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <Stat value="25+" label="Years serving CA" />
            <Stat value="30+" label="Carriers quoted" />
            <Stat value="4.8★" label="Client review average" />
            <Stat value="3" label="Languages spoken" />
          </div>
        </div>
      </section>

      {/* Mission / Values / Promise */}
      <section className="py-16 bg-white">
        <div className="container grid lg:grid-cols-3 gap-6">
          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-900">Our mission</h3>
            <p className="mt-2 text-sm text-slate-700">
              Make insurance simple and transparent by doing the heavy lifting:
              shopping multiple carriers, explaining coverages in plain language,
              and advocating for you at claim time.
            </p>
            <div className="mt-4 inline-flex items-center gap-2 text-brand-700">
              <IconHeart />
              <span className="text-sm font-medium">People over policies.</span>
            </div>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-900">What we value</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <IconCheck className="mt-[2px] text-brand-700" />
                Clear, plain-language guidance
              </li>
              <li className="flex items-start gap-2">
                <IconCheck className="mt-[2px] text-brand-700" />
                Fast responses from a real local team
              </li>
              <li className="flex items-start gap-2">
                <IconCheck className="mt-[2px] text-brand-700" />
                Honest recommendations — not one-brand quotas
              </li>
            </ul>
          </div>

          <div className="card p-6">
            <h3 className="text-lg font-semibold text-slate-900">Our promise</h3>
            <ul className="mt-3 space-y-2 text-sm text-slate-700">
              <li className="flex items-start gap-2">
                <IconCheck className="mt-[2px] text-brand-700" />
                Multi-carrier discount scan on every quote
              </li>
              <li className="flex items-start gap-2">
                <IconCheck className="mt-[2px] text-brand-700" />
                Same-day eID cards whenever possible
              </li>
              <li className="flex items-start gap-2">
                <IconCheck className="mt-[2px] text-brand-700" />
                Renewal checkups and claim support
              </li>
            </ul>
          </div>
        </div>
      </section>

      {/* Story / Timeline */}
      <section className="py-16 bg-slate-50">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-8 items-start">
            <div>
              <h2 className="text-2xl font-semibold text-slate-900">Our story</h2>
              <p className="mt-2 text-slate-700 max-w-prose">
                We opened our doors in 1999 to give neighbors a better way to buy insurance:
                unbiased options, friendly explanations, and real help when life happens.
                Today we serve clients across California — in English, Spanish, and Arabic —
                with the same one-to-one service we started with.
              </p>
            </div>
            <ol className="relative pl-6">
              {[
                { year: "1999", text: "Original Insurance founded in Downey, CA." },
                { year: "2007", text: "Expanded carrier network and added commercial lines." },
                { year: "2016", text: "Digital service: eID cards, text, and email support." },
                { year: "Today", text: "30+ carriers shopped with fast, transparent quotes." },
              ].map((item, idx) => (
                <li key={idx} className="mb-5">
                  <div className="absolute left-0 top-1 h-3 w-3 rounded-full bg-brand-600" />
                  <div className="ml-4">
                    <p className="text-sm font-semibold text-brand-700">{item.year}</p>
                    <p className="text-sm text-slate-700">{item.text}</p>
                  </div>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </section>

      {/* Why a broker */}
      <section className="py-16 bg-white">
        <div className="container">
          <h2 className="text-2xl font-semibold text-slate-900">Why choose a broker?</h2>
          <p className="mt-2 text-slate-700 max-w-prose">
            Brokers aren’t tied to one brand. We compare quotes and coverage across multiple companies,
            so you get options — not ultimatums.
          </p>

          <div className="mt-6 grid md:grid-cols-3 gap-4">
            {[
              {
                title: "More options",
                points: ["30+ carriers quoted", "Tailored coverage fit"],
              },
              {
                title: "Better guidance",
                points: ["Plain-language explanations", "Discounts and bundles checked"],
              },
              {
                title: "Real support",
                points: ["Claims triage & follow-up", "Renewal checkups"],
              },
            ].map((card) => (
              <div key={card.title} className="card p-6">
                <h3 className="text-lg font-semibold text-slate-900">{card.title}</h3>
                <ul className="mt-3 space-y-2 text-sm text-slate-700">
                  {card.points.map((p) => (
                    <li key={p} className="flex items-start gap-2">
                      <IconCheck className="mt-[2px] text-brand-700" />
                      {p}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Licenses & affiliations (placeholder badges) */}
      <section className="py-12 bg-slate-50">
        <div className="container">
          <h2 className="text-2xl font-semibold text-slate-900">Licenses & Affiliations</h2>
          <p className="mt-2 text-slate-700 max-w-prose">
            Licensed California brokerage. Member of industry groups committed to ethical standards and consumer advocacy.
          </p>

          <div className="mt-6 grid grid-cols-2 md:grid-cols-4 gap-4">
            {["CA DOI Licensed", "IIAB Member", "Better Business", "Local Chamber"].map((b) => (
              <div
                key={b}
                className="rounded-lg bg-white ring-1 ring-slate-200 px-4 py-3 text-center text-sm text-slate-700"
              >
                {b}
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Closing CTA */}
      <section className="bg-brand-800 text-white">
        <div className="container py-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl font-semibold">Let’s find the right coverage.</h3>
            <p className="mt-2 text-white/90">
              Quick answers from a local, licensed broker — by phone, email, or message.
            </p>
          </div>
          <div className="flex md:justify-end gap-3">
            <a className="btn btn-ghost" href={site.contact.phoneHref}>
              Call {site.contact.phone}
            </a>
            <a className="btn btn-primary" href="/contact">
              Start a Quote
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
