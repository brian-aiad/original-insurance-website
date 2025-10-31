// src/pages/Services.tsx
// Original Insurance — Services (premium: tabs + URL-sync search + SEO ItemList)

import { useEffect, useMemo, useState } from "react";
import { Link, NavLink, useLocation, useNavigate } from "react-router-dom";
import { site } from "../lib/site";

/* ────────────────────────────────────────────────────────────
   Small utils
   ──────────────────────────────────────────────────────────── */
type RawService = { key?: string; name?: string; title?: string; desc?: string; blurb?: string };
type Service = { key: string; name: string; desc: string; cat: "Personal" | "Business" | "Specialty" };

function normalize(s: RawService, i: number): Service {
  const name = s.name || s.title || s.key || `Service ${i + 1}`;
  const n = name.toLowerCase();
  const cat: Service["cat"] =
    /bop|commercial|liability|workers|business|comp|bond/.test(n)
      ? "Business"
      : /rv|boat|motorcycle|sr-?22|umbrella|special/.test(n)
      ? "Specialty"
      : "Personal";
  return {
    key: s.key || s.name || s.title || `svc-${i}`,
    name,
    desc: s.desc || s.blurb || "Coverage tailored to your needs and budget.",
    cat,
  };
}

function clsx(...v: (string | false | undefined)[]) {
  return v.filter(Boolean).join(" ");
}

/* ────────────────────────────────────────────────────────────
   Icons
   ──────────────────────────────────────────────────────────── */
function SIcon({ name, className = "h-8 w-8" }: { name: string; className?: string }) {
  const n = name.toLowerCase();
  const path =
    /auto|sr-?22|car|vehicle/.test(n)
      ? "M3 13h1l1-3h10l1 3h1a2 2 0 012 2v3h-2v-2H5v2H3v-3a2 2 0 012-2zm3-6h8l2 3H4l2-3z"
      : /home|rent/.test(n)
      ? "M3 11l9-7 9 7v9h-6v-6H9v6H3v-9z"
      : /life|term|whole/.test(n)
      ? "M12 21s-7-4.5-7-10a7 7 0 1114 0c0 5.5-7 10-7 10z"
      : /commercial|business|liability|bop|workers|comp|bond/.test(n)
      ? "M4 20h16V8l-8-5-8 5v12zm8-9l8-5M4 6l8 5"
      : /motorcycle/.test(n)
      ? "M5 16a3 3 0 100-6 3 3 0 000 6zm14-5h-4l-2-3H9v3H7"
      : /rv|recreational|boat|toy|umbrella/.test(n)
      ? "M3 16h18v3H3v-3zm2-6h14l2 4H3l2-4z"
      : "M4 6h16v12H4z";
  return (
    <svg aria-hidden viewBox="0 0 24 24" className={clsx(className, "text-brand-700")} fill="currentColor">
      <path d={path} />
    </svg>
  );
}

/* ────────────────────────────────────────────────────────────
   Quick CTA ribbon at page bottom
   ──────────────────────────────────────────────────────────── */
function BottomCTA() {
  return (
    <section className="mt-10">
      <div className="container">
        <div className="rounded-2xl bg-brand-700 text-white px-5 py-6 md:px-8 flex flex-col md:flex-row md:items-center md:justify-between gap-3 ring-1 ring-white/10 shadow-hard">
          <div>
            <h3 className="text-xl font-semibold">Ready for a better rate?</h3>
            <p className="text-white/90">Get a custom quote in minutes — no pressure, no spam.</p>
          </div>
          <div className="flex gap-2">
            <a className="btn btn-ghost hidden sm:inline-flex" href={site.contact.phoneHref}>
              Call {site.contact.phone}
            </a>
            <NavLink className="btn btn-primary" to="/contact">
              Request a Quote
            </NavLink>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   FAQs (compact) with JSON-LD
   ──────────────────────────────────────────────────────────── */
function FAQs() {
  const qa = [
    { q: "Do you charge a broker fee?", a: "No broker fee for standard quotes. We’re paid by the carrier when you bind." },
    { q: "How fast can I get a quote?", a: "Most quotes are ready in 10–15 minutes after we collect basic details." },
    { q: "Do you help with SR-22?", a: "Yes. We file SR-22 and match you with carriers that support it." },
    { q: "Can I bundle policies?", a: "Absolutely. We’ll scan multi-policy discounts across our carriers." },
  ];
  useEffect(() => {
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "FAQPage",
      mainEntity: qa.map((x) => ({
        "@type": "Question",
        name: x.q,
        acceptedAnswer: { "@type": "Answer", text: x.a },
      })),
    });
    document.head.appendChild(el);
    return () => el.remove();
  }, []);
  return (
    <section className="pt-10">
      <div className="container">
        <h3 className="text-xl font-semibold">FAQ</h3>
        <div className="mt-4 grid md:grid-cols-2 gap-3">
          {qa.map(({ q, a }) => (
            <details key={q} className="card px-4 py-3">
              <summary className="font-semibold cursor-pointer list-none">{q}</summary>
              <p className="mt-2 text-sm text-slate-600">{a}</p>
            </details>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ────────────────────────────────────────────────────────────
   Main
   ──────────────────────────────────────────────────────────── */
export default function Services() {
  const location = useLocation();
  const navigate = useNavigate();

  // Normalize incoming services
  const allServices: Service[] = useMemo(
    () => (site.services as RawService[]).map(normalize),
    []
  );

  // Search state + URL sync (?q=)
  const urlQ = new URLSearchParams(location.search).get("q") || "";
  const [query, setQuery] = useState(urlQ);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    const q = params.get("q") || "";
    if (q !== query) setQuery(q);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [location.search]);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    if (query) params.set("q", query);
    else params.delete("q");
    const next = `${location.pathname}?${params.toString()}`;
    if (next !== location.pathname + location.search) navigate(next, { replace: true });
  }, [query]); // eslint-disable-line react-hooks/exhaustive-deps

  // Tabs
  const TABS: Service["cat"][] = ["Personal", "Business", "Specialty"];
  const [tab, setTab] = useState<Service["cat"]>("Personal");

  const quickFilters = ["Auto", "Home", "Renters", "Life", "Commercial", "Motorcycle", "Recreational", "SR-22"];

  const filtered = useMemo(() => {
    const q = query.trim().toLowerCase();
    const byTab = allServices.filter((s) => s.cat === tab);
    if (!q) return byTab;
    return byTab.filter((s) => s.name.toLowerCase().includes(q) || s.desc.toLowerCase().includes(q));
  }, [allServices, query, tab]);

  // SEO: Breadcrumb + ItemList
  useEffect(() => {
    const itemList = allServices.map((s, i) => ({
      "@type": "ListItem",
      position: i + 1,
      url: `${window.location.origin}/services?q=${encodeURIComponent(s.name)}`,
      name: s.name,
    }));
    const el = document.createElement("script");
    el.type = "application/ld+json";
    el.text = JSON.stringify({
      "@context": "https://schema.org",
      "@type": "BreadcrumbList",
      itemListElement: [
        { "@type": "ListItem", position: 1, name: "Home", item: `${window.location.origin}/` },
        { "@type": "ListItem", position: 2, name: "Services", item: `${window.location.origin}/services` },
      ],
      potentialAction: {
        "@type": "SearchAction",
        target: `${window.location.origin}/services?q={search_term_string}`,
        "query-input": "required name=search_term_string",
      },
      mainEntity: { "@type": "ItemList", itemListElement: itemList },
    });
    document.head.appendChild(el);
    return () => el.remove();
  }, [allServices]);

  return (
    <main className="pb-12">
      {/* Hero / Header */}
      <section className="bg-gradient-to-b from-[color:var(--brand-900)] to-[color:var(--brand-700)] text-white" aria-labelledby="services-title">
        <div className="container py-10 md:py-14">
          <nav className="text-[13px] text-white/80">
            <NavLink to="/" className="hover:underline">Home</NavLink>
            <span className="mx-2">/</span>
            <span>Services</span>
          </nav>

          <h1 id="services-title" className="mt-2 text-3xl md:text-4xl font-semibold tracking-tight">
            Services
          </h1>
          <p className="mt-2 max-w-2xl text-white/90">
            We compare multiple carriers to match coverage to your needs and budget — not just a price.
          </p>

          {/* Search + quick filters */}
          <div className="mt-5 flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search services (e.g., Auto, Home, SR-22)…"
                className="w-full rounded-xl bg-white/95 text-slate-900 placeholder:text-slate-500 px-4 py-2.5 ring-1 ring-black/10 focus:outline-none focus:ring-2 focus:ring-brand-300"
                aria-label="Search services"
              />
              {query && (
                <button
                  onClick={() => setQuery("")}
                  className="absolute right-2 top-1/2 -translate-y-1/2 text-sm text-slate-700 hover:opacity-80"
                  aria-label="Clear search"
                >
                  ✕
                </button>
              )}
            </div>
            <NavLink to="/contact" className="btn btn-primary shrink-0">
              Request a Quote
            </NavLink>
          </div>

          <div className="mt-3 flex flex-wrap gap-1.5">
            {quickFilters.map((t) => (
              <button
                key={t}
                onClick={() => { setQuery(t); }}
                className={clsx(
                  "px-3 py-1 text-[12px] rounded-full ring-1 transition",
                  query.toLowerCase() === t.toLowerCase()
                    ? "bg-white text-slate-900 ring-white"
                    : "bg-white/20 text-white/90 ring-white/30 hover:bg-white/30"
                )}
              >
                {t}
              </button>
            ))}
          </div>

          {/* Tabs */}
          <div className="mt-6 inline-flex rounded-lg bg-white/10 p-1 ring-1 ring-white/20">
            {["Personal", "Business", "Specialty"].map((t) => {
              const count = allServices.filter((s) => s.cat === (t as Service["cat"])).length;
              const active = tab === t;
              return (
                <button
                  key={t}
                  onClick={() => setTab(t as Service["cat"])}
                  className={clsx(
                    "px-3 py-1.5 text-sm rounded-md transition",
                    active ? "bg-white text-slate-900 font-semibold" : "text-white/90 hover:bg-white/10"
                  )}
                >
                  {t} <span className={clsx("ml-1 text-[11px]", active ? "text-slate-500" : "text-white/70")}>({count})</span>
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Services grid */}
      <section className="pt-8">
        <div className="container">
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {filtered.map((s) => {
              const popular =
                /auto|home|bop|commercial|sr-?22|umbrella/.test(s.name.toLowerCase());
              return (
                <article key={s.key} className="card rounded-2xl p-5 hover:shadow-hard transition group">
                  <div className="flex items-start gap-3">
                    <SIcon name={s.name} className="h-9 w-9" />
                    <div className="min-w-0">
                      <div className="flex items-center gap-2">
                        <h3 className="font-semibold text-slate-900 truncate">{s.name}</h3>
                        {popular && (
                          <span className="text-[10px] rounded-full px-2 py-[2px] bg-brand-50 text-brand-800 ring-1 ring-brand-200">
                            Popular
                          </span>
                        )}
                      </div>
                      <p className="mt-1 text-sm text-slate-600 leading-7 line-clamp-3">{s.desc}</p>
                    </div>
                  </div>

                  <div className="mt-4 flex items-center justify-between">
                    <Link
                      to="/contact"
                      className="text-sm font-semibold text-[color:var(--brand-700)] hover:underline"
                      aria-label={`Request a quote for ${s.name}`}
                      data-svc={s.name}
                    >
                      Request a quote →
                    </Link>
                    <span className="text-[11px] text-slate-400 group-hover:text-slate-500">Multiple carriers</span>
                  </div>
                </article>
              );
            })}
          </div>

          {/* Empty state */}
          {filtered.length === 0 && (
            <div className="mt-10 card p-8 text-center">
              <p className="text-slate-700">
                No services matched “<span className="font-semibold">{query}</span>”.
              </p>
              <div className="mt-3 flex flex-wrap justify-center gap-2">
                {["Auto", "Home", "Commercial"].map((t) => (
                  <button
                    key={t}
                    className="px-3 py-1 text-[12px] rounded-full ring-1 ring-slate-300 hover:bg-slate-50"
                    onClick={() => setQuery(t)}
                  >
                    Try “{t}”
                  </button>
                ))}
              </div>
              <NavLink to="/contact" className="btn btn-primary mt-4">
                Start a Quote
              </NavLink>
            </div>
          )}
        </div>
      </section>

      {/* Extras: reasons + bundles */}
      <section className="pt-8">
        <div className="container grid md:grid-cols-3 gap-6">
          <div className="card p-5">
            <h4 className="font-semibold text-slate-900">Why choose a broker?</h4>
            <p className="mt-1 text-sm text-slate-600">
              We quote across many carriers to find fit + value. You get options explained in plain language.
            </p>
          </div>
          <div className="card p-5">
            <h4 className="font-semibold text-slate-900">Claims guidance</h4>
            <p className="mt-1 text-sm text-slate-600">
              If something happens, call us first. We’ll help you report, document, and follow up.
            </p>
          </div>
          <div className="card p-5">
            <h4 className="font-semibold text-slate-900">Multilingual help</h4>
            <p className="mt-1 text-sm text-slate-600">Arabic • Spanish • English</p>
          </div>
        </div>
      </section>

      {/* Popular bundles strip */}
      <section className="pt-8">
        <div className="container">
          <div className="rounded-2xl ring-1 ring-slate-200 bg-white p-5">
            <div className="flex items-center gap-2">
              <SIcon name="Auto" className="h-6 w-6" />
              <SIcon name="Home" className="h-6 w-6" />
              <SIcon name="Umbrella" className="h-6 w-6" />
              <h4 className="font-semibold text-slate-900">Popular bundles</h4>
              <span className="text-[12px] text-slate-500">(discounts vary by carrier)</span>
            </div>
            <div className="mt-3 flex flex-wrap gap-2">
              {["Auto + Home", "Auto + Renters", "Home + Umbrella", "Business + Workers’ Comp"].map((b) => (
                <span key={b} className="px-2.5 py-1 text-[12px] rounded-full bg-slate-50 ring-1 ring-slate-200">
                  {b}
                </span>
              ))}
            </div>
            <NavLink to="/contact" className="btn btn-primary mt-4">
              Ask about bundle savings
            </NavLink>
          </div>
        </div>
      </section>

      <FAQs />
      <BottomCTA />
    </main>
  );
}
