import { featuresSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

export default defineStories({
  baseCsf: dedent`
    import FeaturesComponent from "../index.tsx";
    export default {
      title: "Sections/Features",
      component: FeaturesComponent,
      tags: ["autodocs"],
    };
  `,
  stories: async () => {
    // only fetch components that are referenced or added in pages
    const featuresData = await sanityClient.fetch(componentsQuery, {
      schema: "features",
    });

    const result: StoryConfigs = {};

    await Promise.allSettled(
      featuresData?.map(
        (item, index) =>
          (result[`${item?.variant}${index + 1}`] = {
            args: {
              data: {
                variant: item?.variant,
                variants: filterArgsByVariant(
                  featuresSchema,
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
