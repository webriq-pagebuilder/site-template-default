/* ./src/brand/styles/variables.css */
import { buildLegacyTheme } from "sanity";

const props = {
  "--primary-foreground": "#093fe0",
  "--studio-white": "#ffffff",
  "--secondary": "#000000",
  "--secondary--inverted": "#3576ff",
  "--state-success-color": "#0f9d58",
  "--state-warning-color": "#f4b400",
  "--state-danger-color": "#db4437",
};

export const DefaultStudioTheme = buildLegacyTheme({
  /* Base theme colors */
  "--gray": "#666",
  "--gray-base": "#666",

  "--component-bg": props["--studio-white"],
  "--component-text-color": props["--secondary"],

  /* Brand */
  "--brand-primary": props["--primary-foreground"],

  // Default button
  "--default-button-color": "#093fe0",
  "--default-button-primary-color": props["--primary-foreground"],
  "--default-button-success-color": props["--primary-foreground"],
  "--default-button-warning-color": props["--primary-foreground"],
  "--default-button-danger-color": props["--primary-foreground"],

  /* State */
  "--state-info-color": props["--primary-foreground"],
  "--state-success-color": props["--state-success-color"],
  "--state-warning-color": props["--state-warning-color"],
  "--state-danger-color": props["--state-danger-color"],

  /* Navbar */
  "--main-navigation-color": props["--secondary"],
  "--main-navigation-color--inverted": props["--studio-white"],

  "--focus-color": props["--primary-foreground"],
});
