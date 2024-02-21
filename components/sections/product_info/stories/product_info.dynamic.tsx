import { productInfoDefaultValues } from "helper/defaultValues";
import { filterArgsByVariant } from "components/common";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

const initialProduct = {
  name: "SAMPLE. Yellow Dress",
  ecwidProductId: 543066127,
  price: "50",
  description: [
    {
      style: "normal",
      _key: "66a51b976fd7",
      markDefs: [],
      children: [
        {
          _type: "span",
          marks: [],
          text: "Test product",
          _key: "66a51b976fd70",
        },
      ],
      _type: "block",
    },
  ],
};

export default defineStories({
  baseCsf: dedent`
    import ProductInfo from "../index.tsx";
    export default {
      title: "CStudio/Product Info",
      component: ProductInfo,
      tags: ["autodocs"],
    };
  `,
  stories: async () => {
    // only fetch components that are referenced or added in pages
    const productInfoData = await sanityClient.fetch(componentsQuery, {
      schema: "productInfo",
    });

    const result: StoryConfigs = {};

    await Promise.allSettled(
      productInfoData?.map(
        (item, index) =>
          (result[`${item?.variant}${index + 1}`] = {
            args: {
              data: {
                variant: item?.variant,
                variants: productInfoDefaultValues,
              },
              product: initialProduct,
            },
          })
      )
    );

    return result;
  },
});
