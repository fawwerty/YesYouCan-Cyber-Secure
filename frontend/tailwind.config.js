/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: "#e8eaf2",
          100: "#c5cae0",
          200: "#9fa8cb",
          300: "#7986b6",
          400: "#5c6aa6",
          500: "#3f4e97",
          600: "#374789",
          700: "#2d3d77",
          800: "#243264",
          900: "#131e46",
          950: "#0A0F1E",
        },
        teal: {
          primary: "#0D7377",
          light: "#14A0A5",
          dark: "#085B5E",
        },
        accent: {
          green: "#00FF94",
          "green-dim": "#00CC77",
          "green-muted": "#00FF9420",
        },
        surface: {
          DEFAULT: "#111827",
          elevated: "#1a2235",
          card: "#1e2a40",
          border: "#2a3a54",
        },
      },
      fontFamily: {
        display: ["var(--font-syne)", "system-ui", "sans-serif"],
        body: ["var(--font-cabinet)", "system-ui", "sans-serif"],
        mono: ["var(--font-jetbrains)", "monospace"],
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "noise": "url('/noise.svg')",
        "grid-pattern": "linear-gradient(rgba(13,115,119,0.07) 1px, transparent 1px), linear-gradient(90deg, rgba(13,115,119,0.07) 1px, transparent 1px)",
      },
      backgroundSize: {
        "grid": "40px 40px",
      },
      animation: {
        "fade-in": "fadeIn 0.5s ease forwards",
        "slide-up": "slideUp 0.4s ease forwards",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "count-up": "countUp 1s ease-out forwards",
        "shimmer": "shimmer 2s infinite",
      },
      keyframes: {
        fadeIn: { "0%": { opacity: "0" }, "100%": { opacity: "1" } },
        slideUp: { "0%": { opacity: "0", transform: "translateY(20px)" }, "100%": { opacity: "1", transform: "translateY(0)" } },
        pulseGlow: { "0%, 100%": { boxShadow: "0 0 0 0 rgba(0,255,148,0)" }, "50%": { boxShadow: "0 0 20px 4px rgba(0,255,148,0.15)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
      },
      boxShadow: {
        "glow-green": "0 0 20px rgba(0,255,148,0.2)",
        "glow-teal": "0 0 20px rgba(13,115,119,0.3)",
        "card": "0 4px 24px rgba(0,0,0,0.4)",
        "card-hover": "0 8px 40px rgba(0,0,0,0.5)",
        "glass": "inset 0 1px 0 rgba(255,255,255,0.05), 0 4px 24px rgba(0,0,0,0.3)",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
