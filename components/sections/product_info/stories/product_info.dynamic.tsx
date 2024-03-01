import { productInfoDefaultValues } from "helper/defaultValues";
import { StoryConfigs, defineStories } from "utils/stories";
import { sanityClient } from "lib/sanity.client";
import { componentsQuery } from "pages/api/query";
import dedent from "ts-dedent";

export default defineStories({
  baseCsf: dedent`
    import React from "react";
    import ProductInfo from "../index.tsx";
    import { EcwidContextProvider } from "context/EcwidContext";
    export default {
      title: "CStudio/Product Info",
      component: ProductInfo,
      tags: ["autodocs"],
      render: ({ variant, label, ...args }) => {
        const data = {
          label: label,
          variant: variant,
          variants: args,
        };

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

        // Using React.createElement instead of JSX to avoid JSX parsing issues in template literals
        return React.createElement(ProductInfo, { data: data, product: initialProduct });
      },
      decorators: [
        (Story) => (
          <EcwidContextProvider>
            <Story />
          </EcwidContextProvider>
        ),
      ],
    };
  `,
  stories: async () => {
    const productInfoData =
      (await sanityClient.fetch(componentsQuery, {
        schema: "productInfo",
      })) || []; // Provide a default empty array

    const result: StoryConfigs = {};

    productInfoData?.map((item, index) => {
      if (!item || !item.variants) return; // Skip iteration if item or item.variants is falsy

      result[`${item.variant}${index + 1}`] = {
        args: {
          variant: item.variant,
          label: item.label,
          ...productInfoDefaultValues,
        },
      };
    });

    return result;
  },
});
