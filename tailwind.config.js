// See Tailwind config guide for reference: https://tailwindcss.com/docs/configuration

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#0045d8",
          foreground: "#296eff",
        },
        brand: {
          primary: {
            DEFAULT: "#0045d8",
            foreground: "#296eff",
          },
          secondary: {
            DEFAULT: "#3576ff",
            foreground: "#d5e3ff",
          },
        },
        neutral: {
          light: {
            DEFAULT: "#F9FAFB",
            foreground: "#F3F4F6",
          },
          dark: {
            DEFAULT: "#1F2937",
            foreground: "#111827",
          },
        },
        border: "#9CA3AF",
      },
    },
  },
};
