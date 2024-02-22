import { blogDefaultValues } from "helper/defaultValues";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import BlogComponent from "../index.tsx";
    export default {
      title: "Sections/Blog",
      component: BlogComponent,
      tags: ["autodocs"],
      render: ({ variant, ...args }) => {
        const data = {
          variant: variant,
          variants: args,
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(BlogComponent, { data: data });
      }
    };
  `,
  stories: async () => {
    // only fetch components that are referenced or added in pages
    const blogData = await sanityClient.fetch(componentsQuery, {
      schema: "blog",
    });

    const result: StoryConfigs = {};

    await Promise.allSettled(
      blogData?.map(
        (item, index) =>
          (result[`${item?.variant}${index + 1}`] = {
            args: {
              variant: item?.variant,
              ...blogDefaultValues,
            },
          })
      )
    );

    return result;
  },
});
