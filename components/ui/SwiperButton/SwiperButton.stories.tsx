import type { Meta, StoryObj } from "@storybook/react";
import { SwiperButton } from "./SwiperButton";
import { config } from "../../../lib/storybook.figma.urls";

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
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.SwiperButton.variantALeft,
    },
  },
};

export const VariantARight: Story = {
  args: {
    variant: "variant_a",
    type: "right",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.SwiperButton.variantARight,
    },
  },
};

export const VariantBLeft: Story = {
  args: {
    variant: "variant_b",
    type: "left",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.SwiperButton.variantBLeft,
    },
  },
};

export const VariantBRight: Story = {
  args: {
    variant: "variant_b",
    type: "right",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.SwiperButton.variantBRight,
    },
  },
};
