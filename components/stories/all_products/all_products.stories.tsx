// SHOWS THE DEFAULT VARIANTS OF ALL PRODUCTS
// ONLY EDIT THIS FILE IF YOU HAVE A NEW VARIANT

import type { Meta, StoryObj } from "@storybook/react";
import AllProductsComponent from "../../sections/all_products";
import { Sections } from "types";
import { allProductsDefaultValues } from "helper/defaultValues";

const args = {
  ...allProductsDefaultValues,
};

const meta = {
  title: "Ecommerce/All Products/Defaults",
  component: AllProductsComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <AllProductsComponent data={data} />;
  },
} satisfies Meta<typeof AllProductsComponent> & any;

export default meta;
type Story = StoryObj<Sections> & any;

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
