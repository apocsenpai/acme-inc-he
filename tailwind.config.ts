import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ["var(--font-barlow)"],
        alt: ["var(--font-khand)"],
      },
      colors: {
        primary: "#EA943B",
        secondary: "#ed1c24",
        button: "#000",
        background: "#fff"
      },
    },
  },
  plugins: [],
};
export default config;
