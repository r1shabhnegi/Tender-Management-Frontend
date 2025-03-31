import type { Config } from "tailwindcss";

export default {
  darkMode: ["class"],
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "primary-1": "#0077C2",
        "primary-2": "#59a5f5",
        "primary-3": "#c8ffff",
        "bg-color-1": "#FFFFFF",
        "bg-color-2": "#f5f5f5",
        "bg-color-3": "#cccccc",
        "text-color-1": "#333333",
        "text-color-2": "#5c5c5c",
        "accent-color-1": "#00BFFF",
        "accent-color-2": "#00619a",
        "card-color": "#f6f6f6",
      },

      borderRadius: {
        lg: "var(--radius)",
        md: "calc(var(--radius) - 2px)",
        sm: "calc(var(--radius) - 4px)",
      },
    },
  },
  // plugins: [require("tailwindcss-animate")],
} satisfies Config;
