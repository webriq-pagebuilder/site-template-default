import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";
import { config } from "../../../lib/storybook.figma.urls";

const meta: Meta<typeof Select> = {
  title: "Components/UI/Select",
  component: Select,
  args: {
    items: ["Option 1", "Option 2", "Option 3"],
    name: "Select",
  },
  decorators: [
    (Story) => (
      <div className="bg-gray-50 rounded-lg p-4">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Select.primary,
    },
  },
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

export const Primary: Story = {
  args: {},
};
