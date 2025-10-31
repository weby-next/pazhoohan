import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/react/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sfLight: ["var(--font-sf-light)"],
        sfMed: ["var(--font-sf-medium)"],
        sfBold: ["var(--font-sf-bold)"],
      },
      colors: {
        primary_btn: "#A3B18A",
        primary_btn_hover: "#707C56",
        accent: "#C19A6B",
      },
    },
  },
  darkMode: "class",
  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#F5F2E7",
            foreground: "#3A3A3A",
            secondary_text: "#707C56",
            card: "#FFFFFF",
          },
        },
        dark: {
          colors: {
            background: "#1A1A1A",
            foreground: "#F5F2E7",
            secondary_text: "#C7C7C7",
            card: "#4A4A4A",
          },
        },
      },
    }),
  ],
};

module.exports = config;
