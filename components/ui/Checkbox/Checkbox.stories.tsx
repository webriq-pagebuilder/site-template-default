import type { Meta, StoryObj } from "@storybook/react";
import { Checkbox } from "./Checkbox";

const meta: Meta<typeof Checkbox> = {
  title: "Components/UI/Checkbox",
  component: Checkbox,
  tags: ["autodocs"],
  argTypes: {
    onChange: { action: "onChange" },
  },
} satisfies Meta<typeof Checkbox>;

export default meta;
type Story = StoryObj<typeof Checkbox>;

export const Primary: Story = {
  args: {
    name: "Checkbox 1",
    item: "Checkbox 1",
  },
};

export const WithLabelClass: Story = {
  args: {
    name: "Checkbox 2",
    labelClass: "text-lg font-bold",
    item: "Checkbox 2",
  },
};
