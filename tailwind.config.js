/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: { center: true, padding: "1rem" },
    extend: {
      fontFamily: {
        sans: ["Inter", "system-ui", "Segoe UI", "Roboto", "Helvetica", "Arial", "sans-serif"],
        display: ["Poppins", "Inter", "system-ui", "sans-serif"],
      },
      colors: {
        brand: {
          50:"#f0f6ff",100:"#e4efff",200:"#c9defe",300:"#a6c7fb",
          400:"#6ea2f6",500:"#2f73ee",600:"#1f5bd4",700:"#1646aa",
          800:"#123a8b",900:"#0e2f71",
        },
      },
      boxShadow: {
        soft: "0 2px 8px rgba(2, 18, 64, 0.06)",
        hard: "0 10px 30px rgba(7, 26, 88, 0.16)",
      },
      backgroundImage: {
        "grid-light":
          "radial-gradient(rgba(255,255,255,0.7) 1px, transparent 1px), radial-gradient(rgba(255,255,255,0.3) 1px, transparent 1px)",
      },
      backgroundSize: { "grid-14": "14px 14px, 28px 28px" },
    },
  },
  plugins: [], // ← no extra plugins
};
