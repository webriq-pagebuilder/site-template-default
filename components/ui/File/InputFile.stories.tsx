import type { Meta, StoryObj } from "@storybook/react";
import { InputFile } from "./InputFile";

const meta: Meta<typeof InputFile> = {
  title: "Components/UI/InputFile",
  component: InputFile,
  tags: ["autodocs"],
  parameters: {
    backgrounds: "dark",
  },
} satisfies Meta<typeof InputFile>;

export default meta;
type Story = StoryObj<typeof InputFile>;

export const Primary: Story = {
  args: {
    name: "Browse",
  },
};

export const Outline: Story = {
  args: {
    name: "Browse",
    variant: "outline",
  },
};
