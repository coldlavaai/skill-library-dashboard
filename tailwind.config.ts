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
        'cl-bg': '#030305',
        'cl-darker': '#030305',
        'cl-dark': '#0a0a0c',
        'cl-surface': '#1D1D1F',
        'cl-card': '#111111',
        'cl-border': '#1a1a1a',
        'cl-cyan': '#06B6D4',
        'cl-cyan-light': '#22D3EE',
        'cl-cyan-dark': '#0891b2',
        'cl-cyan-glow': '#00D4FF',
        'cl-gold': '#C9A962',
        'cl-red': '#dc2626',
        'cl-green': '#22c55e',
        'cl-yellow': '#eab308',
        'cl-blue': '#3b82f6',
        'cl-text': '#FFFFFF',
        'cl-text-secondary': '#E5E7EB',
        'cl-muted': '#86868B',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'Inter', 'sans-serif'],
        mono: ['var(--font-jetbrains-mono)', 'JetBrains Mono', 'monospace'],
      },
      maxWidth: {
        content: '960px',
      },
    },
  },
  plugins: [],
} satisfies Config;
