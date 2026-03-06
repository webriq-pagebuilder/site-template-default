import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./node_modules/@stackshift-ui/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        primary: "rgba(var(--color-primary, 0, 69, 216), <alpha-value>)", // Default to #0045d8
        secondary: "rgba(var(--color-secondary, 53, 118, 255), <alpha-value>)", // Default to #3576ff
        background:
          "rgba(var(--color-background, 249, 250, 251), <alpha-value>)", // Default to #F9FAFB
        "primary-foreground":
          "rgba(var(--color-primary-foreground, 255, 255, 255), <alpha-value>)", // Default to #FFFFFF
        "secondary-foreground":
          "rgba(var(--color-secondary-foreground, 255, 255, 255), <alpha-value>)", // Default to #FFFFFF

        // ── PublishForge brand palette ──────────────────────────
        // Deep navy hero and section backgrounds
        "pf-navy-deep": "#071430",
        "pf-navy":      "#0d1f3c",
        "pf-navy-mid":  "#0a2a5e",
        // Primary blue (buttons, links, accents)
        "pf-blue":      "#093fe0",
        "pf-blue-mid":  "#1a56db",
        // Cyan highlight (hero badge, AI indicators, glow effects)
        "pf-cyan":      "#00cfde",
        "pf-cyan-light":"#e0fafd",
        // Orange CTA (primary call-to-action buttons)
        "pf-orange":    "#f97316",
        "pf-orange-dk": "#ea580c",
      },
      borderRadius: {
        none: "0px",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        full: "9999px",
        global: "var(--border-radius, 0.25rem)",
      },
      spacing: {
        sm: "384px",
        md: "448px",
        lg: "512px",
        xl: "576px",
        "2xl": "672px",
      },
      fontFamily: {
        sans: "Open Sans",
        serif: "Lora",
        mono: "Roboto Mono",
        global: "var(font-family)",
      },
      fontSize: {
        xs: "0.75rem", // 12px
        sm: "0.875rem", // 14px
        base: "1rem", // 16px
        lg: "1.125rem", // 18px
        xl: "1.25rem", // 20px
        "2xl": "1.5rem", // 24px
        "3xl": "1.857rem", // 30px
        "4xl": "2.25rem", // 36px
        "5xl": "3rem", // 48px
        global: "calc(0.10rem + var(--font-size))",
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        global: "calc(100 + var(--font-weight))",
      },

      // ── PublishForge animations ────────────────────────────
      keyframes: {
        "pf-gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%":       { backgroundPosition: "100% 50%" },
        },
        "pf-pulse-glow": {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(0, 207, 222, 0.3)" },
          "50%":      { boxShadow: "0 0 0 12px rgba(0, 207, 222, 0)" },
        },
        "pf-fade-up": {
          from: { opacity: "0", transform: "translateY(28px)" },
          to:   { opacity: "1", transform: "translateY(0)" },
        },
        "pf-fade-in": {
          from: { opacity: "0" },
          to:   { opacity: "1" },
        },
      },
      animation: {
        "pf-gradient":   "pf-gradient-shift 12s ease infinite",
        "pf-glow":       "pf-pulse-glow 2s ease-in-out infinite",
        "pf-fade-up":    "pf-fade-up 0.7s ease both",
        "pf-fade-in":    "pf-fade-in 0.6s ease both",
      },

      // ── PublishForge background gradients ──────────────────
      backgroundImage: {
        "pf-hero":    "linear-gradient(135deg, #071430 0%, #0d1f3c 40%, #0a2a5e 70%, #071430 100%)",
        "pf-stats":   "linear-gradient(135deg, #093fe0, #1a56db)",
        "pf-brand":   "linear-gradient(135deg, #093fe0, #00cfde)",
        "pf-cta":     "linear-gradient(135deg, #071430, #0a2a5e, #071430)",
        "pf-section": "linear-gradient(135deg, #071430, #0d2b6e)",
      },

      // ── PublishForge box shadows ───────────────────────────
      boxShadow: {
        "pf-btn-primary": "0 4px 20px rgba(249, 115, 22, 0.35)",
        "pf-btn-blue":    "0 4px 20px rgba(9, 63, 224, 0.30)",
        "pf-card":        "0 8px 30px rgba(9, 63, 224, 0.08)",
        "pf-glow-cyan":   "0 0 24px rgba(0, 207, 222, 0.40)",
      },
    },
  },
} satisfies Config;
