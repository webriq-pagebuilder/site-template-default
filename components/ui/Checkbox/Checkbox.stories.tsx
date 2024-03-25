import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";
import { config } from "../../../lib/storybook.figma.urls";

const meta: Meta<typeof Checkbox> = {
  title: "Components/UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "onChange" },
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Checkbox.primary,
    },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {
  args: {
    name: "Checkbox 1",
    item: "Checkbox 1",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Checkbox.primary,
    },
  },
};

export const WithLabelClass: Story = {
  args: {
    name: "Checkbox 2",
    labelClass: "text-lg font-bold",
    item: "Checkbox 2",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Checkbox.custom,
    },
  },
};
