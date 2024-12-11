import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      keyframes: {
        float: {
          "0%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "0.3",
          },
          "33%": {
            transform: "translate(30px, -30px) scale(1.2)",
            opacity: "0.6",
          },
          "66%": {
            transform: "translate(-20px, 20px) scale(0.8)",
            opacity: "0.4",
          },
          "100%": {
            transform: "translate(0, 0) scale(1)",
            opacity: "0.3",
          },
        },
      },
      animation: {
        float: "float var(--duration, 20s) ease-in-out infinite",
      },
    },
  },
  plugins: [],
} satisfies Config;
