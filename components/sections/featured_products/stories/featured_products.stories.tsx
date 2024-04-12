import type { Meta, StoryObj } from "@storybook/react";
import { Sections, Variants } from "types";
import FeaturedProducts from "../index";
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
