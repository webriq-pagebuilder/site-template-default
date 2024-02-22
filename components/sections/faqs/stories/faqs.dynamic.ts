import { filterArgsByVariant } from "components/common";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

// NOTE: If this component has a custom component, comment out this line and import that instead
// Example: import { faqsSchema } from "schemas/custom/sanity-plugin-schema-default/src/schemas/sections/faqs/schema";
import { faqsSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import FAQComponent from "../index.tsx";
    export default {
      title: "Sections/FAQ",
      component: FAQComponent,
      tags: ["autodocs"],
      render: ({ variant, ...args }) => {
        const data = {
          variant: variant,
          variants: args,
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(FAQComponent, { data: data });
      }
    };
  `,
  stories: async () => {
    // only fetch components that are referenced or added in pages
    const faqsData = await sanityClient.fetch(componentsQuery, {
      schema: "faqs",
    });

    const result: StoryConfigs = {};

    await Promise.allSettled(
      faqsData?.map(
        (item, index) =>
          (result[`${item?.variant}${index + 1}`] = {
            args: {
              variant: item?.variant,
              ...filterArgsByVariant(faqsSchema, item?.variants, item?.variant),
            },
          })
      )
    );

    return result;
  },
});
