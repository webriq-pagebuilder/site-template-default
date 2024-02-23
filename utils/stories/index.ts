// reference: Dynamic Stories POC
// https://stackblitz.com/edit/github-h2rgfk
// POC also defined on "Generating stories with an alternative API" https://storybook.js.org/docs/api/main-config-indexers#examples

import type { DynamicConfig } from "../../types/stories";
export const defineStories = async (config: DynamicConfig) => config;
export * from "../../types/stories";
