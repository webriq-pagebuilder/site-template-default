// SHOWS THE DEFAULT VARIANTS OF PRODUCT INFO
// ONLY EDIT THIS FILE IF YOU HAVE A NEW VARIANT

import type { Meta, StoryObj } from "@storybook/react";
import { Sections } from "types";
import ProductInfo from "../../sections/product_info";
import { EcwidContextProvider } from "context/EcwidContext";
import { productInfoDefaultValues } from "helper/defaultValues";

const args = {
  ...productInfoDefaultValues,
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
const meta = {
  title: "Ecommerce/Product Info/Defaults",
  component: ProductInfo,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <ProductInfo data={data} product={initialProduct} />;
  },
  decorators: [
    (Story) => (
      <EcwidContextProvider>
        <Story />
      </EcwidContextProvider>
    ),
  ],
} satisfies Meta<typeof ProductInfo> & any;

export default meta;
type Story = StoryObj<Sections>;

export const variant_a: Story = {
  args: {
    variant: "variant_a",
    ...args,
  },
};

export const variant_b: Story = {
  args: {
    variant: "variant_b",
    ...args,
  },
};
