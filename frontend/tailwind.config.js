/** @type {import('tailwindcss').Config} */
module.exports = {
  blocklist: ["overline"],
  darkMode: ["class"],
  content: ["./src/**/*.{js,jsx,ts,tsx}", "./public/index.html"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Fredoka", "cursive", "sans-serif"],
        body: ['"Plus Jakarta Sans"', "sans-serif"],
        hand: ["Caveat", "cursive"],
        mono: ['"Space Mono"', "monospace"],
      },
      colors: {
        paper: "#FFF5F7",
        paper2: "#FFEAF1",
        ink: "#4A1F3D",
        candy: {
          DEFAULT: "#EC4899",
          deep: "#DB2777",
          soft: "#F9A8C9",
          pale: "#FCE7F3",
        },
        cosmic: {
          DEFAULT: "#100E1E",
          night: "#1B1733",
        },
        gold: "#FBBF24",
        portal: "#10B981",
        cream: "#FFF8EF",
      },
      boxShadow: {
        glow: "0 0 40px rgba(236,72,153,0.35)",
        card: "0 10px 34px rgba(74,31,61,0.12)",
      },
      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
      keyframes: {
        marquee: {
          to: { transform: "translateX(-50%)" },
        },
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
      },
      animation: {
        marquee: "marquee 38s linear infinite",
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
      },
    },
  },
  plugins: [require("tailwindcss-animate")],
};
