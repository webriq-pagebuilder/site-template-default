import type { Config } from "tailwindcss";
import themeConfig from "./theme.config";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ...themeConfig?.colors,
      },
      borderRadius: {
        ...themeConfig?.borderRadius,
      },
      spacing: {
        ...themeConfig?.spacing,
      },
    },
  },
} satisfies Config;
