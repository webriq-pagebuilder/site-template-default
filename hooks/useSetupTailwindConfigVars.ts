import { getRGBColor } from "utils/colors";

const newThemeConfig = {
  extend: {
    colors: {
      primary: "#FFFF00",
      secondary: "#FFA500",
      success: "green",
    },
    spacing: {
      tiny: "0.25rem",
      huge: "4rem",
    },
    fontFamily: {
      serif: ["Georgia", "serif"],
    },
  },
};

export default function useSetupTailwindConfigVars() {
  const primaryColor = getRGBColor(
    newThemeConfig.extend.colors.primary,
    "primary"
  );

  return `:root { ${primaryColor} }`;
}
