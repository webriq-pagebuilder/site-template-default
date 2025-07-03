// SHOWS THE DEFAULT VARIANTS OF FEATURED PRODUCTS
// ONLY EDIT THIS FILE IF YOU HAVE A NEW VARIANT

import type { Meta, StoryObj } from "@storybook/react";
import { Sections } from "types";
import FeaturedProducts from "../../sections/featured_products";
import { featuredProductDefaultValues } from "helper/defaultValues";

const args = {
  ...featuredProductDefaultValues,
};

const meta = {
  title: "Ecommerce/Featured Products/Defaults",
  component: FeaturedProducts,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: {
        collections: args,
      },
    };

    return <FeaturedProducts data={data} />;
  },
} satisfies Meta<typeof FeaturedProducts> & any;

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
