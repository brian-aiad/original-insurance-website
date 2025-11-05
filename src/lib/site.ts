export const site = {
  name: "Original Insurance",
  tagline: "Trusted coverage with personal service.",
  description:
    "Since 1999, Original Insurance has helped families and businesses find straightforward, affordable protection across auto, home, life, and commercial lines.",
  contact: {
    phone: "(310) 538 8666",
    phoneHref: "tel:+13105388666",
    email: "originalinsurance@gmail.com",
    emailHref: "mailto:originalinsurance@gmail.com",
    address: "9907-B Paramount Blvd, Downey, CA 90240-3805",
    mapsHref:
      "https://maps.google.com/maps?q=9907B+PARAMOUNT+BLVD,+DOWNEY,+CA+90240-3805",
  },
  socials: [
    { label: "Facebook", href: "#", icon: "Facebook" },
    { label: "Instagram", href: "#", icon: "Instagram" },
    { label: "LinkedIn", href: "#", icon: "LinkedIn" },
    { label: "Twitter", href: "#", icon: "Twitter" },
  ],
  services: [
    { key: "auto", title: "Auto Insurance", blurb: "Liability, comp & collision, SR-22 support, and multi-car discounts." },
    { key: "home", title: "Home & Renters", blurb: "Protect dwelling, belongings, and liability with right-sized coverage." },
    { key: "life", title: "Life Insurance", blurb: "Term & whole life options that protect your family’s future." },
    { key: "commercial", title: "Commercial", blurb: "General liability, BOP, commercial auto, and workers’ comp." },
    { key: "moto", title: "Motorcycle", blurb: "Coverage for riders with gear and accessory protection." },
    { key: "rec", title: "Recreational", blurb: "RV, boat, and specialty toys — enjoy the weekend safely." },
    { key: "notary", title: "Notary Public", blurb: "Fast, reliable notarization for personal and business documents." },
    { key: "reg", title: "Registration Services", blurb: "Skip the DMV lines. Title transfers, renewals, and plates." },
    { key: "translate", title: "Document Translation", blurb: "Accurate translation in Arabic, Spanish, and English." },
  ],
  faqs: [
    {
      q: "What is an insurance broker?",
      a: "A licensed professional who shops multiple carriers on your behalf to match coverage, price, and service to your needs.",
    },
    {
      q: "Which lines do you offer?",
      a: "Auto, home/renters, commercial, life, motorcycle, recreational, notary public, registration services, and document translation.",
    },
    {
      q: "How do I get a quote?",
      a: "Call, email, or use the contact form. We collect a few details and present options from multiple carriers.",
    },
    {
      q: "How do I file a claim?",
      a: "Call your carrier’s claims line listed on your policy, then notify us. We’ll help you navigate documentation and next steps.",
    },
  ],
  testimonials: [
    {
      name: "Michelle McFarland",
      source: "Google Reviews",
      quote:
        "They always find the coverage I need in my price range. Friendly, helpful, and patient with questions.",
    },
    {
      name: "Yesenia Villalvaso",
      source: "Google Reviews",
      quote:
        "Five years with the office — honest, responsive, and consistently great service. I’ve referred all my family",
    },
    {
      name: "Ivania Jimenez",
      source: "Google Reviews",
      quote:
        "Very friendly and they found the best deal for me. Professional team that truly cares about customers.",
    },
    {
      name: "Gamel Helmi",
      source: "Google Reviews",
      quote:
        "Over 10 years with the agency. They always answer my calls and address my concerns quickly.",
    },
  ],
  carriersLogos: Array.from({ length: 8 }).map((_, i) =>
    new URL(`../assets/clients/client-${i + 1}.png`, import.meta.url).href
  ),
};
