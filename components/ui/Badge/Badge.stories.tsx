import type { Meta, StoryObj } from "@storybook/react";
import { Badge } from "./Badge";

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
  },
} satisfies Meta<typeof Badge>;

export default meta;
type Story = StoryObj<typeof Badge>;

export const Primary: Story = {};
