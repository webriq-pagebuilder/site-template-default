import type { Meta, StoryObj } from "@storybook/react";
import { ConditionalLink } from "./ConditionalLink";

const meta: Meta<typeof ConditionalLink> = {
  title: "UI/ConditionalLink",
  component: ConditionalLink,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  tags: ["autodocs"],
  args: {
    children: "About Us",
  },
} satisfies Meta<typeof ConditionalLink>;

export default meta;
type Story = StoryObj<typeof ConditionalLink>;

export const Primary: Story = {};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const CustomClass: Story = {
  args: {
    className:
      "rounded-none bg-orange-600 tracking-widest text-gray-200 hover:bg-orange-400",
  },
};
