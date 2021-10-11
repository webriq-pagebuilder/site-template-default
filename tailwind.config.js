module.exports = {
  purge: {
    enabled: false,
    content: [
      "./pages/**/*.{js,ts,jsx,tsx}",
      "./component/**/*.{js,ts,jsx,tsx}",
    ],
  },
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        "webriq-blue": "#296eff",
        "webriq-lightblue": "#d5e3ff",
        "webriq-darkblue": "#0045d8",
        "webriq-babyblue": "#3576ff",
      },
    },
  },
  variants: {
    extend: {
      visibility: ["hover", "focus"],
      animation: ["motion-reduce"],
    },
  },
  plugins: [require("@tailwindcss/aspect-ratio")],
};
