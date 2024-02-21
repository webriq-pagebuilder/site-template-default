import { navigationSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

export default defineStories({
  baseCsf: dedent`
    import NavigationComponent from "../index.tsx";
    export default {
      title: "Sections/Navigation",
      component: NavigationComponent,
      tags: ["autodocs"],
    };
  `,
  stories: async () => {
    // only fetch components that are referenced or added in pages
    const navigationData = await sanityClient.fetch(componentsQuery, {
      schema: "navigation",
    });

    const result: StoryConfigs = {};

    await Promise.allSettled(
      navigationData?.map(
        (item, index) =>
          (result[`${item?.variant}${index + 1}`] = {
            args: {
              data: {
                variant: item?.variant,
                variants: filterArgsByVariant(
                  navigationSchema,
                  item?.variants,
                  item?.variant
                ),
              },
            },
          })
      )
    );

    return result;
  },
});
