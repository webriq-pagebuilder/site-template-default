import type { Meta, StoryObj } from "@storybook/react";
import AppPromoComponent from "../index";
import { Sections } from "types";
import { allProductsDefaultValues } from "helper/defaultValues";

const args = {
  ...allProductsDefaultValues,
};

const meta = {
  title: "CStudio/All Products",
  component: AppPromoComponent,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <AppPromoComponent data={data} />;
  },
} satisfies Meta<typeof AppPromoComponent> & any;

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
