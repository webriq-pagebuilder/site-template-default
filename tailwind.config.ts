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
    },
  },
} satisfies Config;
