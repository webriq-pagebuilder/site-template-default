import type { Meta, StoryObj } from "@storybook/react";
import AllProductsComponent from "../index";
import { Sections } from "types";
import { allProductsDefaultValues } from "helper/defaultValues";

const args = {
  ...allProductsDefaultValues,
};

const meta = {
  title: "CStudio/All Products/Defaults",
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
