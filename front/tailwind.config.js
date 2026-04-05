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
           PRIMARY BRAND (Royal Blue)
        ========================= */

        brand: "#2563EB",

        primaryHoverDark: "#3B82F6",
        primaryHoverLight: "#1D4ED8",

        primaryMutedDark: "#1E3A8A",
        primaryMutedLight: "#DBEAFE",

        /* =========================
           SECONDARY BRAND (Creative Purple)
        ========================= */

        secondaryDark: "#8B5CF6",
        secondaryLight: "#7C3AED",

        secondaryHoverDark: "#A78BFA",
        secondaryHoverLight: "#6D28D9",

        secondaryMutedDark: "#2B2148",
        secondaryMutedLight: "#EFE9FF",

        /* =========================
           ACCENT (Highlight / CTA)
        ========================= */

        accentDark: "#60A5FA",
        accentLight: "#3B82F6",

        accentHoverDark: "#93C5FD",
        accentHoverLight: "#2563EB",

        accentMutedDark: "#1E293B",
        accentMutedLight: "#E0ECFF",

        /* =========================
           FEEDBACK COLORS
        ========================= */

        successDark: "#34D399",
        successLight: "#10B981",

        warningDark: "#FBBF24",
        warningLight: "#F59E0B",

        errorDark: "#F87171",
        errorLight: "#EF4444",

        infoDark: "#60A5FA",
        infoLight: "#3B82F6",

        /* =========================
           OVERLAY / BACKDROP
        ========================= */

        overlayDark: "rgba(0,0,0,0.6)",
        overlayLight: "rgba(0,0,0,0.35)",

        /* =========================
           SYSTEM COLORS
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
            primary: "#2563EB",
          },
        },
        dark: {
          colors: {
            background: "#161618",
            foreground: "#F5F5F5",
            card: "#18181B",
            divider: "#2C2C30",
            primary: "#2563EB",
          },
        },
      },
    }),
  ],
};

module.exports = config;
