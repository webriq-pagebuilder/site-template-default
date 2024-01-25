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
        "webriq-blue": "#296eff",
        "webriq-lightblue": "#d5e3ff",
        "webriq-darkblue": "#0045d8",
        "webriq-babyblue": "#3576ff",
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

// extend: {
// 	colors: {
// 	  border: "hsl(var(--border))",
// 	  background: "hsl(var(--background))",
// 	  primary: {
// 		DEFAULT: "#0045d8",
// 		foreground: "#296eff",
// 	  },
// 	  secondary: {
// 		DEFAULT: "hsl(var(--secondary))",
// 		foreground: "hsl(var(--secondary-foreground))",
// 	  },
// 	  muted: {
// 		DEFAULT: "hsl(var(--muted))",
// 		foreground: "hsl(var(--muted-foreground))",
// 	  },
// 	},
// 	borderRadius: {
// 	  lg: "var(--radius)",
// 	  md: "calc(var(--radius) - 2px)",
// 	  sm: "calc(var(--radius) - 4px)",
// 	},
