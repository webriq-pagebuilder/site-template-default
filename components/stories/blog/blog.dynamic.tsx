import { blogDefaultValues } from "helper/defaultValues";
import { dynamicStoryData } from "components/common";
import { defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import { Components } from "components/list";

    const BlogComponent = Components.blog;

    export default {
      title: "Components/Blog",
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
        schema: "blogs",
      })) || []; // Provide a default empty array
        
    return dynamicStoryData({
      data: blogData,
      schemaFields: blogDefaultValues,
      isCustomArgs: true,
    });
  },
});
