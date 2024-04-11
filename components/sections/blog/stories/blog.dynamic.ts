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
      render: ({ variant, label, ...args }) => {
        const data = {
          label: label,
          variant: variant,
          variants: args,
        };

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(BlogComponent, { data: data });
      }
    };
  `,
  stories: async () => {
    const blogData =
      (await sanityClient.fetch(componentsQuery, {
        schema: "blog",
      })) || []; // Provide a default empty array

    const result: StoryConfigs = {};

    blogData?.map((item) => {
      if (!item || !item.variants) return; // Skip iteration if item or item.variants is falsy

      const trimmedLabel = item?.label.trim();
      const label = trimmedLabel
        .toLowerCase()
        .replace(/[^\w\s]/g, "_")
        .replace(/\s/g, "_"); // Replace special characters and white spaces with underscores

      result[`${label}${item?.variant}`] = {
        args: {
          variant: item.variant,
          label: item.label,
          ...blogDefaultValues,
        },
      };
    });

    return result;
  },
});
