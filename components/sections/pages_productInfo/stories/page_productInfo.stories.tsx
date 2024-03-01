import type { Meta, StoryObj } from "@storybook/react";
import { Sections, Variants } from "types";
import ProductInfo from "../index";
import { productInfoPageDefaultValues } from "helper/defaultValues";

const args = {
  ...productInfoPageDefaultValues,
};

const meta = {
  title: "Sections/Product Info/Defaults",
  component: ProductInfo,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: {
        products: args,
      },
    };

    return <ProductInfo data={data} />;
  },
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
