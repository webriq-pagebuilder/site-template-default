import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";
import { config } from "../../../lib/storybook.figma.urls";

const meta: Meta<typeof Badge> = {
  title: "Components/UI/Badge",
  component: Badge,
  tags: ["autodocs"],
  args: {
    children: "Travel",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
    design: {
      type: "figma",
      url: config.components.ui.Badge?.primary,
    },
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {};
