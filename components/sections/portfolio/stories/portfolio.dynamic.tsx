import { filterArgsByVariant } from "components/common";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

// NOTE: If this component has a custom component, comment out this line and import that instead
// Example: import { portfolioSchema } from "schemas/custom/sanity-plugin-schema-default/src/schemas/sections/portfolio/schema";
import { portfolioSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import PortfolioComponent from "../index.tsx";
    export default {
      title: "Sections/Portfolio",
      component: PortfolioComponent,
      tags: ["autodocs"],
      render: ({ variant, label, ...args }) => {
        const data = {
          label: label,
          variant: variant,
          variants: args,
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(PortfolioComponent, { data: data });
      }
    };
  `,
  stories: async () => {
    const portfolioData =
      (await sanityClient.fetch(componentsQuery, {
        schema: "portfolio",
      })) || []; // Provide a default empty array

    const result: StoryConfigs = {};

    portfolioData?.map((item, index) => {
      if (!item || !item.variants) return; // Skip iteration if item or item.variants is falsy

      result[`${item.variant}${index + 1}`] = {
        args: {
          variant: item.variant,
          label: item.label,
          ...filterArgsByVariant(portfolioSchema, item.variants, item.variant),
        },
      };
    });

    return result;
  },
});
