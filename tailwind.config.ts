import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{ts,tsx}",
    "./components/**/*.{ts,tsx}",
    "./hooks/**/*.{ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        display: ["var(--font-display)", "Georgia", "serif"],
        body:    ["var(--font-body)", "system-ui", "sans-serif"],
      },
      colors: {
        cream:     "#FAF8F5",
        "cream-d": "#F2EDE6",
        blush:     "#F0E0D6",
        rose:      "#C4826A",
        "rose-d":  "#A3614C",
        charcoal:  "#1A1614",
        muted:     "#7A6E6A",
        border:    "#E8DDD6",
      },
      boxShadow: {
        "card":   "0 2px 20px rgba(26,22,20,0.06)",
        "card-lg":"0 8px 40px rgba(26,22,20,0.10)",
        "rose":   "0 4px 20px rgba(196,130,106,0.30)",
      },
    },
  },
  plugins: [],
};

export default config;
