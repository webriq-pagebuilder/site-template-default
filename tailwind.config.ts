import type { Config } from "tailwindcss";
import defaultTheme from "tailwindcss/defaultTheme";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#0045d8",
        "primary-foreground": "#296eff",
        secondary: "#3576ff",
        "secondary-foreground": "#d5e3ff",
        yellow: "#7f7f27",
        light: "#F9FAFB",
        "light-foreground": "#F3F4F6",
        dark: "#1F2937",
        "dark-foreground": "#111827",
        border: "#9CA3AF",
      },
      borderRadius: {
        none: "0px",
        sm: "0.125rem",
        DEFAULT: "0.25rem",
        md: "0.375rem",
        lg: "0.5rem",
        xl: "0.75rem",
        "2xl": "1rem",
        "3xl": "1.5rem",
        full: "9999px",
      },
      spacing: {
        sm: "384px",
        md: "448px",
        lg: "512px",
        xl: "576px",
        "2xl": "672px",
      },
      fontFamily: {
        sans: ['"Segoe UI"', ...defaultTheme.fontFamily.sans],
      },
    },
  },
} satisfies Config;
