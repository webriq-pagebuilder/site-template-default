import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Textarea } from "./Textarea";
import { config } from "../../../lib/storybook.figma.urls";

const meta: Meta<typeof Textarea> = {
  title: "Components/UI/Textarea",
  component: Textarea,
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
      url: config.components.ui.Textarea.primary,
    },
  },
} satisfies Meta<typeof Textarea>;

export default meta;
type Story = StoryObj<typeof Textarea>;

export const Primary: Story = {
  args: {
    placeholder: "Write your message here...",
    name: "Message",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Textarea.primary,
    },
  },
};

export const Outline: Story = {
  args: {
    placeholder: "Write your message here...",
    name: "Message",
    variant: "outline",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Textarea.outline,
    },
  },
};
