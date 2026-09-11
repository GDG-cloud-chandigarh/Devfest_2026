import type { Config } from "tailwindcss";
import typography from "@tailwindcss/typography";

const config: Config = {
  content: ["./src/**/*.{ts,tsx}", "./content/**/*.{ts,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        "google-blue": "#4285F4",
        "google-green": "#34A853",
        "google-red": "#EA4335",
        "google-yellow": "#FBBC05",
        "neutral-dark": "#1E1E1E",
        "neutral-light": "#F0F0F0",
      },
      fontFamily: {
        heading: ["var(--font-heading)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
        mono: ["var(--font-mono)", "monospace"],
      },
    },
  },
  plugins: [typography],
};

export default config;
