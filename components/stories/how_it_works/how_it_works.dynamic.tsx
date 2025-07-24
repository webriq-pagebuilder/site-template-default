import { dynamicStoryData } from "@/components/common";
import { defineStories } from "@/utils/stories";
import { sanityClient } from "@/lib/sanity.client";
import { componentsQuery } from "@/pages/api/query";
import dedent from "ts-dedent";

// NOTE: If this component has a custom component, comment out this line and import that instead
// Example: import { howItWorksSchema } from "schemas/custom/sanity-plugin-schema-default/src/schemas/sections/how_it_works/schema";
import { howItWorksSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import { Components } from "components/list";

    const HowItWorksComponent = Components.howItWorks;

    export default {
      title: "Components/How It Works",
      component: HowItWorksComponent,
      tags: ["autodocs"],
      render: ({ variant, label, ...args }) => {
        const data = {
          label: label,
          variant: variant,
          variants: args,
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(HowItWorksComponent, { data: data });
      }
    };
  `,
  stories: async () => {
    const howItWorksData =
      (await sanityClient.fetch(componentsQuery, {
        schema: "howItWorks",
      })) || []; // Provide a default empty array

    return dynamicStoryData({
      data: howItWorksData,
      schemaFields: howItWorksSchema,
    });
  },
});
