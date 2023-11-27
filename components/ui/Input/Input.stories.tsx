import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "UI/Input",
  component: Input,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    placeholder: "your.email@webriq.com",
    name: "Email",
    type: "email",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export const Outline: Story = {
  args: {
    placeholder: "your.email@webriq.com",
    name: "Email",
    type: "email",
    variant: "outline",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};
