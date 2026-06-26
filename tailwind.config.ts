import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        green: {
          brand: "#3CC120",
          dark:  "#1E6B2E",
          mid:   "#2D9142",
          light: "#3DB356",
        },
        yellow: {
          DEFAULT: "#FFD600",
          light:   "#FFE94D",
          dark:    "#CCB000",
        },
        flame: {
          orange: "#FF6B00",
          red:    "#E8230A",
        },
        dark:       "#0F0F0F",
        "off-white": "#FAFAF0",
      },
      fontFamily: {
        heading: ["var(--font-playfair)", "serif"],
        body:    ["var(--font-inter)", "sans-serif"],
      },
      animation: {
        "float":         "float 3s ease-in-out infinite",
        "flame-flicker": "flicker 1.5s ease-in-out infinite alternate",
        "pulse-glow":    "pulseGlow 2s ease-in-out infinite",
        "slide-up":      "slideUp 0.6s ease-out",
      },
      keyframes: {
        float: {
          "0%,100%": { transform: "translateY(0px)" },
          "50%":     { transform: "translateY(-12px)" },
        },
        flicker: {
          "0%":   { opacity: "0.8", transform: "scaleY(1)" },
          "100%": { opacity: "1",   transform: "scaleY(1.06)" },
        },
        pulseGlow: {
          "0%,100%": { boxShadow: "0 0 20px rgba(255,214,0,0.4)" },
          "50%":     { boxShadow: "0 0 40px rgba(255,214,0,0.9)" },
        },
        slideUp: {
          "0%":   { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
