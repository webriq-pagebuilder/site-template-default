import type { Meta, StoryObj } from "@storybook/react";
import { ConditionalLink } from "./ConditionalLink";

const meta: Meta<typeof ConditionalLink> = {
  title: "Components/UI/Conditional Link",
  component: ConditionalLink,
  tags: ["autodocs"],
  args: {
    children: "About Us",
    link: {
      externalLink: null,
      internalLink: "initial-values-test",
      label: "About Us",
      linkInternal: {
        _ref: "020142ce-cf61-4671-a5db-80b13a08f2d4",
        _type: "reference",
      },
      linkTarget: "_self",
      linkType: "linkInternal",
      type: "linkInternal",
      _key: "1XE3Dhz70dNTMXda86YUY",
      _type: "conditionalLink",
    },
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
