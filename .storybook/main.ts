import type { StorybookConfig } from "@storybook/nextjs";

const config: StorybookConfig = {
  stories: [
    "../components/ui/Theme/Theme.mdx", // first page to open when starting up storybook
    "../**/*.mdx",
    "../**/*.stories.@(js|jsx|mjs|ts|tsx)",
    "../**/*.dynamic.@(js|jsx|mjs|ts|tsx)",
  ],
  managerHead: (head) => `
    ${head}
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link href="https://fonts.googleapis.com/css2?family=Roboto&display=swap" rel="stylesheet">
  `,
  staticDirs: ["../public"],
  addons: [
    "@storybook/addon-links",
    "@storybook/addon-essentials",
    "@storybook/addon-onboarding",
    "@storybook/addon-interactions",
    "@storybook/addon-docs",
    "@storybook/addon-mdx-gfm",
    "./preset",
  ],
  framework: {
    name: "@storybook/nextjs",
    options: {},
  },
  docs: {
    autodocs: "tag",
  },
  core: {
    disableTelemetry: true, // 👈 Disables telemetry
  },
};
export default config;
