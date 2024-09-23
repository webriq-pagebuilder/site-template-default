import { SANITY_PROJECT_ID } from "studio/config";

export const defaultThemeConfig = {
  _id: `${SANITY_PROJECT_ID}-theme-settings`,
  _type: "themeSettings",
  name: "Theme Settings",
  currentTheme: "Default Theme",
  themes: [
    {
      _key: "9a0c4cc90fe78a9e34e43c579d4e53b1",
      name: "Default Theme",
      mode: "light",
      font: "Open Sans",
      "font-size": "1rem",
      "font-weight": "400",
      "border-radius": "0.25rem",
      scope: "global",
      colors: {
        light: {
          primary: "#0045d8",
          secondary: "#3576ff",
          background: "#F9FAFB",
        },
        dark: {
          primary: "#0045d8",
          secondary: "#3576ff",
          background: "#1F2937",
        },
      },
    },
  ],
};
