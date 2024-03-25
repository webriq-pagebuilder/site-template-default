import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxGroup } from "./CheckboxGroup";
import { Checkbox } from "../Checkbox/Checkbox";
import { config } from "../../../lib/storybook.figma.urls";

const meta: Meta<typeof CheckboxGroup> = {
  title: "Components/UI/Checkbox Group",
  component: CheckboxGroup,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.CheckboxGroup.primary,
    },
  },
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

export const Primary: Story = {
  args: {
    variant: "primary",
    name: "Primary",
    children: ["Option 1", "Option 2", "Option 3"].map((item, index) => (
      <Checkbox
        item={item}
        key={index}
        ariaLabel={item}
        required={false}
        name={"Primary"}
      />
    )),
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.CheckboxGroup.primary,
    },
  },
};

export const Inline: Story = {
  args: {
    variant: "inline",
    name: "Inline",
    children: ["Option 1", "Option 2", "Option 3"].map((item, index) => (
      <Checkbox
        item={item}
        key={index}
        ariaLabel={item}
        required={false}
        name={"Primary"}
      />
    )),
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.CheckboxGroup.inline,
    },
  },
};

export const WithCustomLabel: Story = {
  args: {
    name: "With Custom Label",
    label: "Custom Label",
    children: ["Option 1", "Option 2", "Option 3"].map((item, index) => (
      <Checkbox
        item={item}
        key={index}
        ariaLabel={item}
        required={false}
        name={"With Custom Label"}
      />
    )),
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.CheckboxGroup.custom,
    },
  },
};
