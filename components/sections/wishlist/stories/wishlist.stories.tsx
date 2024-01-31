import type { Meta, StoryObj } from "@storybook/react";
import { Sections } from "types";
import Wishlist from "../index";

const meta = {
  title: "CStudio/Wishlist",
  component: Wishlist,
  tags: ["autodocs"],
  render: ({ variant, ...args }) => {
    const data = {
      variant: variant,
      variants: args,
    };

    return <Wishlist data={data} />;
  },
} satisfies Meta<typeof Wishlist> & any;

export default meta;
type Story = StoryObj<Sections>;

export const variant_a: Story = {
  args: {
    variant: "variant_a",
  },
};
