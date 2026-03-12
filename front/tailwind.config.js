import { heroui } from "@heroui/theme";

/** @type {import('tailwindcss').Config} */
const config = {
  content: [
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@heroui/react/dist/**/*.{js,ts,jsx,tsx}",
  ],

  darkMode: "class",

  theme: {
    extend: {
      fontFamily: {
        sfLight: ["var(--font-sf-light)"],
        sfMed: ["var(--font-sf-medium)"],
        sfBold: ["var(--font-sf-bold)"],
      },

      colors: {
        /* =========================
           BASE
        ========================= */

        baseDark: "#0F0F10",
        baseLight: "#F7F6F3",

        /* =========================
           BACKGROUNDS
        ========================= */

        backgroundPrimaryDark: "#0F0F10",
        backgroundPrimaryLight: "#F7F6F3",

        backgroundSecondaryDark: "#161618",
        backgroundSecondaryLight: "#FFFFFF",

        backgroundTertiaryDark: "#1F1F22",
        backgroundTertiaryLight: "#F1F1F1",

        /* =========================
           SURFACES (cards, modals)
        ========================= */

        surfacePrimaryDark: "#18181B",
        surfacePrimaryLight: "#FFFFFF",

        surfaceSecondaryDark: "#222226",
        surfaceSecondaryLight: "#F3F3F4",

        surfaceElevatedDark: "#2A2A2F",
        surfaceElevatedLight: "#E9E9EC",

        /* =========================
           TEXT
        ========================= */

        textPrimaryDark: "#F5F5F5",
        textPrimaryLight: "#111111",

        textSecondaryDark: "#C6C6C9",
        textSecondaryLight: "#4B4B4F",

        textTertiaryDark: "#8A8A90",
        textTertiaryLight: "#7A7A80",

        textPlaceholderDark: "#6A6A70",
        textPlaceholderLight: "#9A9AA0",

        textOnAccentDark: "#0F0F10",
        textOnAccentLight: "#FFFFFF",

        /* =========================
           BORDERS
        ========================= */

        borderSubtleDark: "#2C2C30",
        borderSubtleLight: "#E2E2E6",

        borderDefaultDark: "#3A3A40",
        borderDefaultLight: "#CFCFD5",

        borderStrongDark: "#4A4A50",
        borderStrongLight: "#B8B8BE",

        /* =========================
           PRIMARY BRAND (Fashion Gold)
        ========================= */

        primaryDark: "#D4A94A",
        primaryLight: "#B88A28",

        primaryHoverDark: "#E2B85C",
        primaryHoverLight: "#9F741F",

        primaryMutedDark: "#3B321B",
        primaryMutedLight: "#F3E8C8",

        /* =========================
           SECONDARY BRAND (Creative Plum)
        ========================= */

        secondaryDark: "#7A3E6D",
        secondaryLight: "#9B4E8A",

        secondaryHoverDark: "#8C4B7E",
        secondaryHoverLight: "#823C72",

        secondaryMutedDark: "#2D1B2A",
        secondaryMutedLight: "#F3E5F0",

        /* =========================
           ACCENT (Highlight / CTA)
        ========================= */

        accentDark: "#4F7DF3",
        accentLight: "#3F6AE0",

        accentHoverDark: "#6A93FF",
        accentHoverLight: "#3558C2",

        accentMutedDark: "#1E2A48",
        accentMutedLight: "#E5ECFF",

        /* =========================
           FEEDBACK COLORS
        ========================= */

        successDark: "#3FAF7A",
        successLight: "#2F9E6C",

        warningDark: "#E6A23C",
        warningLight: "#D48F22",

        errorDark: "#E05252",
        errorLight: "#C93C3C",

        infoDark: "#4F8BFF",
        infoLight: "#3E72E0",

        /* =========================
           OVERLAY / BACKDROP
        ========================= */

        overlayDark: "rgba(0,0,0,0.6)",
        overlayLight: "rgba(0,0,0,0.35)",

        /* =========================
           ANY COLOR
        ========================= */
        blue: "#0a84ff",
        green: "#30d158",
        indigo: "#5e5ce6",
        orange: "#ff9f0a",
        pink: "#ff375f",
        red: "#ff453a",
        teal: "#40c8e0",
        yellow: "#ffd60a",
      },
    },
  },

  plugins: [
    heroui({
      themes: {
        light: {
          colors: {
            background: "#F7F6F3",
            foreground: "#111111",
            card: "#FFFFFF",
            divider: "#E2E2E6",
            primary: "#F1F1F1",
          },
        },
        dark: {
          colors: {
            background: "#161618",
            foreground: "#F5F5F5",
            card: "#18181B",
            divider: "#2C2C30",
            primary: "#1F1F22",
          },
        },
      },
    }),
  ],
};

module.exports = config;
