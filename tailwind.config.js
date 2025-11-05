/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "1rem",
        md: "1.25rem",
        lg: "2rem",
        xl: "2.5rem",
        "2xl": "3rem",
      },
    },
    extend: {
      colors: {
        // Brand palette used across components (bg-brand-700, text-brand-600, etc.)
        brand: {
          50:  "#f0f6ff",
          100: "#e4efff",
          200: "#c9defe",
          300: "#a6c7fb",
          400: "#6ea2f6",
          500: "#2f73ee",
          600: "#1f5bd4",
          700: "#1646aa",
          800: "#123a8b",
          900: "#0e2f71",
        },
      },
      boxShadow: {
        soft: "0 1px 2px rgba(15, 23, 42, 0.06), 0 1px 1px rgba(15, 23, 42, 0.04)",
        hard: "0 10px 25px -8px rgba(15, 23, 42, 0.25)",
      },
      borderRadius: {
        xl: "0.75rem",
        "2xl": "1rem",
      },
      fontFamily: {
        sans: ["Inter", "ui-sans-serif", "system-ui", "Segoe UI", "Roboto", "Helvetica Neue", "Arial", "Noto Sans", "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji"],
      },
    },
  },
  plugins: [],
};
