import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";
import { config } from "../../../lib/storybook.figma.urls";

const meta: Meta<typeof Card> = {
  title: "Components/UI/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    children: <p>This is a sample card</p>,
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Card.primary,
    },
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Card.primary,
    },
  },
};

export const WithClassName: Story = {
  args: {
    className: "bg-gray-200 border-solid border border-primary-foreground",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Card.custom,
    },
  },
};
