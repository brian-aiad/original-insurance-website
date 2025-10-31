// src/pages/Contact.tsx
// Original Insurance — Contact Page (refined: callback-first, minimal friction, brand-aligned)

import { useState } from "react";
import { site } from "../lib/site";
import { Icons } from "../components/Icons";

function clsx(...v: (string | false | null | undefined)[]) {
  return v.filter(Boolean).join(" ");
}

export default function Contact() {
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    <main id="main-content">
      {/* Header / intro */}
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
            <a href={site.contact.emailHref} className="btn btn-ghost">
              ✉ Email
            </a>
            <a href={site.contact.mapsHref} target="_blank" rel="noreferrer" className="btn btn-ghost">
              <Icons.MapPin className="w-4 h-4" /> Directions
            </a>
          </div>
        </div>
      </section>

      {/* Contact form + info */}
      <section className="py-16 bg-white">
        <div className="container">
          <div className="grid lg:grid-cols-2 gap-6 items-start">
            {/* Callback form */}
            <form
              onSubmit={handleSubmit}
              className="card p-6 grid gap-4"
            >
              <h2 className="text-lg font-semibold text-slate-900">
                Request a Callback
              </h2>
              <p className="text-sm text-slate-600">
                Leave your info and we’ll contact you within business hours.
              </p>

              <div>
                <label className="text-sm font-medium text-slate-700">Name</label>
                <input
                  className="mt-1 w-full rounded-lg border-slate-300 focus:border-brand-500 focus:ring-brand-500"
                  required
                />
              </div>
              <div>
                <label className="text-sm font-medium text-slate-700">Phone or Email</label>
                <input
                  className="mt-1 w-full rounded-lg border-slate-300 focus:border-brand-500 focus:ring-brand-500"
                  required
                />
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  What type of coverage?
                </label>
                <div className="mt-2 flex flex-wrap gap-2">
                  {["Auto", "Home", "Life", "Business", "SR-22"].map((opt) => (
                    <label
                      key={opt}
                      className="cursor-pointer inline-flex items-center gap-1 rounded-full bg-slate-50 ring-1 ring-slate-200 px-2.5 py-1 text-sm hover:bg-slate-100"
                    >
                      <input type="checkbox" className="accent-brand-600" />
                      {opt}
                    </label>
                  ))}
                </div>
              </div>

              <div>
                <label className="text-sm font-medium text-slate-700">
                  Short note (optional)
                </label>
                <textarea
                  rows={3}
                  className="mt-1 w-full rounded-lg border-slate-300 focus:border-brand-500 focus:ring-brand-500"
                  placeholder="e.g. I need a quick quote for my car..."
                />
              </div>

              <button type="submit" className="btn btn-primary mt-1">
                {sent ? "Message Sent!" : "Send Message"}
              </button>

              <p className="text-xs text-slate-500 mt-2">
                Prefer email?{" "}
                <a className="underline" href={site.contact.emailHref}>
                  {site.contact.email}
                </a>
              </p>
            </form>

            {/* Office info card */}
            <div className="card p-6">
              <h3 className="text-lg font-semibold text-slate-900">
                Visit or Call
              </h3>
              <p className="mt-2 text-sm text-slate-700">{site.contact.address}</p>

              <div className="mt-3 grid gap-2 text-sm">
                <a href={site.contact.phoneHref} className="underline">
                  {site.contact.phone}
                </a>
                <a href={site.contact.emailHref} className="underline">
                  {site.contact.email}
                </a>
                <a
                  href={site.contact.mapsHref}
                  className="underline"
                  target="_blank"
                  rel="noreferrer"
                >
                  Open in Maps
                </a>
              </div>

              <div className="mt-6 aspect-[4/3] w-full overflow-hidden rounded-xl ring-1 ring-slate-900/10">
                <iframe
                  title="Map to our office"
                  src="https://www.google.com/maps/embed?pb=!1m14!1m8!1m3!1d1323.4536432142705!2d-118.2979079!3d33.9010092!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x80c2bae3e93f75f9%3A0xf8e0a9d1b3d7472d!2s9907B%20PARAMOUNT%20BLVD%2C%20DOWNEY%2C%20CA%2090240-3805!5e0!3m2!1sen!2sca!4v1623703061556"
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  loading="lazy"
                />
              </div>

              <div className="mt-6 text-sm text-slate-700">
                <p>
                  <strong>Hours:</strong> Mon–Fri 9–6, Sat 10–2
                </p>
                <p className="mt-1">Arabic · Spanish · English</p>
              </div>

              <a href="/services" className="btn btn-ghost mt-6 w-full">
                Browse Services
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Trust / CTA strip */}
      <section className="bg-brand-800 text-white">
        <div className="container py-10 grid md:grid-cols-2 gap-6 items-center">
          <div>
            <h3 className="text-2xl font-semibold">Need help with a claim?</h3>
            <p className="mt-2 text-white/90">
              We’ll help you report, document, and follow up — even after hours.
            </p>
          </div>
          <div className="flex md:justify-end gap-3">
            <a href={site.contact.phoneHref} className="btn btn-ghost">
              Call {site.contact.phone}
            </a>
            <a href="/contact" className="btn btn-primary">
              Request a Quote
            </a>
          </div>
        </div>
      </section>
    </main>
  );
}
