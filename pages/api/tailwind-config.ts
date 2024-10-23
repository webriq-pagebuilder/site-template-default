// pages/api/tailwind-config.js
export default async function handler(req, res) {
  // Simulate fetching or generating Tailwind config
  const tailwindConfig = {
    theme: {
      extend: {
        colors: {
          primary: "#3490dc",
          secondary: "#ffed4a",
          danger: "#e3342f",
        },
        spacing: {
          small: "0.5rem",
          medium: "1rem",
          large: "2rem",
        },
        fontFamily: {
          sans: ["Helvetica", "Arial", "sans-serif"],
        },
      },
    },
  };

  // Return the configuration as a JSON response
  res.status(200).json(tailwindConfig);
}
