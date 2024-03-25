import type { Meta, StoryObj } from "@storybook/react";
import { InputFile } from "./InputFile";
import { config } from "../../../lib/storybook.figma.urls";

const meta: Meta<typeof InputFile> = {
  title: "Components/UI/Input File",
  component: InputFile,
  tags: ["autodocs"],
  parameters: {
    backgrounds: {
      default: "dark",
    },
    design: {
      type: "figma",
      url: config.components.ui.File.primary,
    },
  },
} satisfies Meta<typeof InputFile>;

export default meta;
type Story = StoryObj<typeof InputFile>;

export const Primary: Story = {
  args: {
    name: "Browse",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.File.primary,
    },
  },
};

export const Outline: Story = {
  args: {
    name: "Browse",
    variant: "outline",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.File.outline,
    },
  },
};
