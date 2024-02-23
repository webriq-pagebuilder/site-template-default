import { filterArgsByVariant } from "components/common";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

// NOTE: If this component has a custom component, comment out this line and import that instead
// Example: import { textComponentSchema } from "schemas/custom/sanity-plugin-schema-default/src/schemas/sections/textComponent/schema";
import { textComponentSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import TextComponent from "../index.tsx";
    export default {
      title: "Sections/Text Component",
      component: TextComponent,
      tags: ["autodocs"],
      render: ({ variant, ...args }) => {
        const data = {
          variant: variant,
          variants: args,
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(TextComponent, { data: data });
      }
    };
  `,
  stories: async () => {
    // only fetch components that are referenced or added in pages
    const textComponentData = await sanityClient.fetch(componentsQuery, {
      schema: "textComponent",
    });

    const result: StoryConfigs = {};

    await Promise.allSettled(
      textComponentData?.map(
        (item, index) =>
          (result[`${item?.variant}${index + 1}`] = {
            args: {
              variant: item?.variant,
              ...filterArgsByVariant(
                textComponentSchema,
                item?.variants,
                item?.variant
              ),
            },
          })
      )
    );

    return result;
  },
});
