import { headerSchema } from "@webriq-pagebuilder/sanity-plugin-schema-default";
import { filterArgsByVariant } from "components/common";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

export default defineStories({
  baseCsf: dedent`
    import HeaderComponent from "components/sections/header";
    export default { title: "Sections/Header", component: HeaderComponent, tags: ["autodocs"] };
  `,
  stories: async () => {
    // only fetch components that are referenced or added in pages
    const headerData = await sanityClient.fetch(componentsQuery, {
      schema: "header",
    });

    const result = {} as StoryConfigs;

    await Promise.allSettled(
      headerData?.map(
        (item, index) =>
          (result[`${item?.variant}${index + 1}`] = {
            args: {
              data: {
                variant: item?.variant,
                variants: filterArgsByVariant(
                  headerSchema,
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
