import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "selector",
  theme: {
    extend: {
      colors: {
        // primary: "#0045d8",
        // "primary-foreground": "#296eff",
        // secondary: "#3576ff",
        // "secondary-foreground": "#d5e3ff",
        // light: "#F9FAFB",
        // "light-foreground": "#F3F4F6",
        // dark: "#1F2937",
        // "dark-foreground": "#111827",
        // border: "#9CA3AF",
        primary: "rgba(var(--color-primary), <alpha-value>)",
        secondary: "rgba(var(--color-secondary), <alpha-value>)",
        background: "rgba(var(--color-background), <alpha-value>)",
      },
      borderRadius: {
        none: "0px",
        sm: "0.125rem",
        base: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        full: "9999px",
        global: "var(--border-radius)",
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
        global: "var(--font-size)",
      },
      fontWeight: {
        light: "300",
        normal: "400",
        medium: "500",
        semibold: "600",
        bold: "700",
        global: "var(--font-weight)",
      },
    },
  },
} satisfies Config;
