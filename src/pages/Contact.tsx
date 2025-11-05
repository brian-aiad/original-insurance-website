// src/pages/Contact.tsx
// Original Insurance — Contact (premium UI, spam-safe, Web3Forms integration via ENV)

import { useMemo, useState } from "react";
import { site } from "../lib/site";
import { Icons } from "../components/Icons";

type Coverage = "Auto" | "Home" | "Life" | "Business" | "SR-22";

function cx(...v: (string | false | null | undefined)[]) {
  return v.filter(Boolean).join(" ");
}

const COVERAGE_OPTS: Coverage[] = ["Auto", "Home", "Life", "Business", "SR-22"];

export default function Contact() {
  const [name, setName] = useState("");
  const [contact, setContact] = useState(""); // phone or email
  const [coverages, setCoverages] = useState<Coverage[]>([]);
  const [note, setNote] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [sent, setSent] = useState<null | "ok" | "err">(null);

  // honeypot (hidden, blocks bots)
  const [company, setCompany] = useState(""); // DO NOT show in UI

  const canSubmit = useMemo(() => name.trim() && contact.trim(), [name, contact]);

  const toggle = (opt: Coverage) =>
    setCoverages((s) => (s.includes(opt) ? s.filter((x) => x !== opt) : [...s, opt]));

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!canSubmit || submitting) return;

    // If honeypot filled, silently "succeed"
    if (company.trim().length > 0) {
      setSent("ok");
      return;
    }

    try {
      setSubmitting(true);
      setSent(null);

      // Web3Forms endpoint + access key from .env.local
      const endpoint = import.meta.env.VITE_CONTACT_WEBHOOK_URL; // "https://api.web3forms.com/submit"
      const key = import.meta.env.VITE_W3F_ACCESS_KEY;           // your access key
      if (!endpoint || !key) throw new Error("Missing Web3Forms envs");

      // Send as urlencoded so it's a “simple request” (no CORS preflight)
      const params = new URLSearchParams();
      params.set("access_key", key);
      params.set("subject", `New lead — ${site.name}: ${name}`);
      params.set("from_name", site.name);
      params.set("name", name);
      params.set("contact", contact);
      params.set("coverages", coverages.join(",")); // comma list
      params.set("note", note);
      params.set("page", typeof window !== "undefined" ? window.location.href : "");
      params.set("company", company); // honeypot field

      const r = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded;charset=utf-8" },
        body: params.toString(),
      });

      if (!r.ok) throw new Error("Bad status " + r.status);

      setSent("ok");
      setName("");
      setContact("");
      setCoverages([]);
      setNote("");
    } catch {
      setSent("err");
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main id="main-content">
      {/* Header */}
      <section
        className="relative overflow-hidden text-white"
        style={{ background: "linear-gradient(180deg, var(--brand-900), var(--brand-800))" }}
      >
        <div className="container py-12 md:py-16">
          <h1 className="font-display text-3xl md:text-4xl font-semibold">
            Contact Original Insurance
          </h1>
          <p className="mt-3 text-white/85 max-w-prose">
            Quick help from a licensed broker — no call centers, no bots.
          </p>
          <div className="mt-6 flex flex-wrap gap-2">
            <a href={site.contact.phoneHref} className="btn btn-primary">
              <Icons.Phone className="w-4 h-4" /> Call {site.contact.phone}
            </a>
            <a href={site.contact.emailHref} className="btn btn-ghost">✉ Email</a>
            <a href={site.contact.mapsHref} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <Icons.MapPin className="w-4 h-4" /> Directions
            </a>
          </div>
        </div>
      </section>

      {/* Form + Office card */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            {/* Form */}
            <form onSubmit={handleSubmit} className="card p-6 grid gap-4" noValidate>
              <div className="flex items-center justify-between">
                <h2 className="text-lg font-semibold text-slate-900">Request a Callback</h2>
                <span aria-live="polite">
                  {sent === "ok" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-200 px-2 py-[3px] text-[12px]">
                      <span className="h-2 w-2 rounded-full bg-emerald-500" /> Message sent
                    </span>
                  )}
                  {sent === "err" && (
                    <span className="inline-flex items-center gap-1 rounded-full bg-red-50 text-red-700 ring-1 ring-red-200 px-2 py-[3px] text-[12px]">
                      <span className="h-2 w-2 rounded-full bg-red-500" /> Try again
                    </span>
                  )}
                </span>
              </div>

              <p className="text-sm text-slate-600">
                Leave your info and we’ll contact you within business hours.
              </p>

              {/* Honeypot (hidden) */}
              <label className="sr-only">
                Company
                <input
                  autoComplete="organization"
                  tabIndex={-1}
                  value={company}
                  onChange={(e) => setCompany(e.target.value)}
                  className="hidden"
                />
              </label>

              <div className="grid gap-4">
                <label className="text-sm font-medium text-slate-700">
                  Name
                  <div className="mt-1 relative">
                    <input
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="peer w-full rounded-lg border-slate-300 pl-10 focus:border-brand-500 focus:ring-brand-500"
                      placeholder="Your full name"
                      required
                    />
                    {/* leading icon */}
                    <svg viewBox="0 0 24 24" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="currentColor" aria-hidden>
                      <path d="M12 12a5 5 0 1 0-5-5 5 5 0 0 0 5 5zm0 2c-5 0-9 2.5-9 5v1h18v-1c0-2.5-4-5-9-5z" />
                    </svg>
                  </div>
                </label>

                <label className="text-sm font-medium text-slate-700">
                  Phone or Email
                  <div className="mt-1 relative">
                    <input
                      value={contact}
                      onChange={(e) => setContact(e.target.value)}
                      className="peer w-full rounded-lg border-slate-300 pl-10 focus:border-brand-500 focus:ring-brand-500"
                      placeholder="(310) 538-8666 or you@email.com"
                      required
                    />
                    <svg viewBox="0 0 24 24" className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-slate-400" fill="currentColor" aria-hidden>
                      <path d="M3 7l9 6 9-6M5 19h14a2 2 0 0 0 2-2V7a2 2 0 0 0-2-2H5a2 2 0 0 0-2 2v10a2 2 0 0 0 2 2z"/>
                    </svg>
                  </div>
                </label>
              </div>

              <div>
                <span className="text-sm font-medium text-slate-700">What type of coverage?</span>
                <div className="mt-2 flex flex-wrap gap-2">
                  {COVERAGE_OPTS.map((opt) => {
                    const active = coverages.includes(opt);
                    return (
                      <button
                        type="button"
                        key={opt}
                        onClick={() => toggle(opt)}
                        className={cx(
                          "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-sm ring-1 transition",
                          active
                            ? "bg-brand-50 text-brand-800 ring-brand-200"
                            : "bg-slate-50 ring-slate-200 hover:bg-slate-100"
                        )}
                        aria-pressed={active}
                      >
                        <span className={cx("h-1.5 w-1.5 rounded-full", active ? "bg-brand-600" : "bg-slate-300")} />
                        {opt}
                      </button>
                    );
                  })}
                </div>
              </div>

              <label className="text-sm font-medium text-slate-700">
                Short note (optional)
                <textarea
                  rows={3}
                  value={note}
                  onChange={(e) => setNote(e.target.value)}
                  className="mt-1 w-full rounded-lg border-slate-300 focus:border-brand-500 focus:ring-brand-500"
                  placeholder="e.g. I need a quick quote for my car..."
                />
              </label>

              <button
                type="submit"
                disabled={!canSubmit || submitting}
                className={cx(
                  "btn btn-primary mt-1 inline-flex items-center justify-center",
                  (!canSubmit || submitting) && "opacity-50 cursor-not-allowed"
                )}
              >
                {submitting ? "Sending…" : "Send Message"}
              </button>

              <p className="text-xs text-slate-500 mt-2">
                Prefer email?{" "}
                <a className="underline" href={site.contact.emailHref}>
                  {site.contact.email}
                </a>
              </p>
            </form>

            {/* Office card */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-900">Visit or Call</h3>
              <p className="mt-2 text-sm text-slate-700">{site.contact.address}</p>

              <div className="mt-3 grid gap-2 text-sm">
                <a href={site.contact.phoneHref} className="underline">{site.contact.phone}</a>
                <a href={site.contact.emailHref} className="underline">{site.contact.email}</a>
                <a href={site.contact.mapsHref} className="underline" target="_blank" rel="noreferrer">
                  Open in Maps
                </a>
              </div>

              <div className="mt-6 aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-slate-900/10">
                <iframe
                  title="Map to our office"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1323.4536432142705!2d-118.2979079!3d33.9010092!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bae3e93f75f9%3A0xf8e0a9d1b3d7472d!2s9907B%20PARAMOUNT%20BLVD%2C%20DOWNEY%2C%20CA%2090240-3805!5e0!3m2!1sen!2sus!4v1623703061556"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>

              <div className="mt-6 text-sm text-slate-700">
                <p><strong>Hours:</strong> Mon–Fri 9–6, Sat 10–2</p>
                <p className="mt-1">Arabic · Spanish · English</p>
              </div>

              <a href="/services" className="btn btn-ghost mt-6 w-full">Browse Services</a>
            </div>
          </div>
        </div>
      </section>

      {/* CTA strip */}
      <section className="bg-brand-800 text-white">
        <div className="container py-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl font-semibold">Need help with a claim?</h3>
            <p className="mt-2 text-white/90">
              We’ll help you report, document, and follow up — even after hours.
            </p>
          </div>
          <div className="flex md:justify-end gap-3">
            <a href={site.contact.phoneHref} className="btn btn-ghost">Call {site.contact.phone}</a>
            <a href="/contact" className="btn btn-primary">Request a Quote</a>
          </div>
        </div>
      </section>
    </main>
  );
}
