import type { Meta, StoryObj } from "@storybook/react";
import { SwiperButton } from "./SwiperButton";

const meta: Meta<typeof SwiperButton> = {
  title: "Components/UI/Swiper Button",
  component: SwiperButton,
  tags: ["autodocs"],
} satisfies Meta<typeof SwiperButton>;

export default meta;
type Story = StoryObj<typeof SwiperButton>;

export const VariantALeft: Story = {
  args: {
    variant: "variant_a",
  },
};

export const VariantARight: Story = {
  args: {
    variant: "variant_a",
    type: "right",
  },
};

export const VariantBLeft: Story = {
  args: {
    variant: "variant_b",
    type: "left",
  },
};

export const VariantBRight: Story = {
  args: {
    variant: "variant_b",
    type: "right",
  },
};
