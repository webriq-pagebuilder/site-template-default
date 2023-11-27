import type { Meta, StoryObj } from "@storybook/react";
import { InputFile } from "./InputFile";

const meta: Meta<typeof InputFile> = {
  title: "UI/InputFile",
  component: InputFile,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof InputFile>;

export default meta;
type Story = StoryObj<typeof InputFile>;

export const Primary: Story = {
  args: {
    name: "Browse",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export const Outline: Story = {
  args: {
    name: "Browse",
    variant: "outline",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};
