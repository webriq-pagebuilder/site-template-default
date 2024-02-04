// See Tailwind config guide for reference: https://tailwindcss.com/docs/configuration

/** @type {import('tailwindcss').Config} */
const defaultTheme = require("tailwindcss/defaultTheme");
module.exports = {
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
        light: "#F9FAFB",
        "light-foreground": "#F3F4F6",
        dark: "#1F2937",
        "dark-foreground": "#111827",
        border: "#9CA3AF",
      },
      screens: {
        ...defaultTheme.screens,
      },
      borderRadius: {
        ...defaultTheme.borderRadius,
      },
      spacing: {
        sm: "384px",
        md: "448px",
        lg: "512px",
        xl: "576px",
        "2xl": "672px",
      },
    },
  },
};
