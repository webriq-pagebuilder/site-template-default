import { appPromoSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

export default defineStories({
  baseCsf: dedent`
    import AppPromoComponent from "../index.tsx";
    export default {
      title: "Sections/App Promo",
      component: AppPromoComponent,
      tags: ["autodocs"],
    };
  `,
  stories: async () => {
    // only fetch components that are referenced or added in pages
    const appPromoData = await sanityClient.fetch(componentsQuery, {
      schema: "appPromo",
    });

    const result: StoryConfigs = {};

    await Promise.allSettled(
      appPromoData?.map(
        (item, index) =>
          (result[`${item?.variant}${index + 1}`] = {
            args: {
              data: {
                variant: item?.variant,
                variants: filterArgsByVariant(
                  appPromoSchema,
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
