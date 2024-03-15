import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./RadioGroup";
import { Radio } from "../Radio/Radio";
import { config } from "../../../lib/storybook.figma.urls";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/UI/Radio Group",
  component: RadioGroup,
  decorators: [
    (Story) => (
      <div className="p-4 rounded-lg bg-gray-50">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.RadioGroup.primary,
    },
  },
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Primary: Story = {
  args: {
    children: ["Option 1", "Option 2", "Option 3"].map((r, index) => {
      return <Radio name="Primary" ariaLabel={r} item={r} key={index} />;
    }),
    variant: "primary",
    name: "Primary",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.RadioGroup.primary,
    },
  },
};

export const Inline: Story = {
  args: {
    children: ["Option 1", "Option 2", "Option 3"].map((r, index) => {
      return <Radio name="Inline" ariaLabel={r} item={r} key={index} />;
    }),
    variant: "inline",
    name: "Inline",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.RadioGroup.inline,
    },
  },
};
