import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./Radio";
import { config } from "../../../lib/storybook.figma.urls";

const meta: Meta<typeof Radio> = {
  title: "Components/UI/Radio",
  component: Radio,
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
      url: config.components.ui.Radio.primary,
    },
  },
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof Radio>;

export const Primary: Story = {
  args: {
    name: "Radio",
    item: "Option 1",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Radio.primary,
    },
  },
};
