import { faqsSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

export default defineStories({
  baseCsf: dedent`
    import FAQComponent from "../index.tsx";
    export default {
      title: "Sections/FAQ",
      component: FAQComponent,
      tags: ["autodocs"],
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
              data: {
                variant: item?.variant,
                variants: filterArgsByVariant(
                  faqsSchema,
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
