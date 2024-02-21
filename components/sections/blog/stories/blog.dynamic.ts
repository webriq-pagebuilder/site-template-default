import { blogSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { blogDefaultValues } from "helper/defaultValues";
import { filterArgsByVariant } from "components/common";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

export default defineStories({
  baseCsf: dedent`
    import BlogComponent from "../index.tsx";
    export default {
      title: "Sections/Blog",
      component: BlogComponent,
      tags: ["autodocs"],
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
              data: {
                variant: item?.variant,
                variants: blogDefaultValues,
              },
            },
          })
      )
    );

    return result;
  },
});
