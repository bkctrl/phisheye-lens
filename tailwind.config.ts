import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--off-grey)",
        'simple-light': '#F6F8FF',
        'simple-dark': '#322214',
        'beige': '#F5DBCB',
        'light-grey': '#CACFD6',
        'off-grey': '#CACFD6',
        'dark-green': '#517664',
        'light-cyan': '#9FD8CB',
        'deep-blue': '#0A2540',
      },
    },
  },
  plugins: [],
} satisfies Config;
