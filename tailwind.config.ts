import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#030305",
        surface: "#1D1D1F",
        cyan: {
          DEFAULT: "#06B6D4",
          light: "#22D3EE",
          glow: "#00D4FF",
        },
        gold: {
          DEFAULT: "#C9A962",
          light: "#D4B76E",
        },
        muted: "#86868B",
        border: "#424245",
      },
      fontFamily: {
        sans: ["Inter", "sans-serif"],
        mono: ["JetBrains Mono", "monospace"],
      },
      maxWidth: {
        content: "960px",
      },
    },
  },
  plugins: [],
} satisfies Config;
