import type { Meta, StoryObj } from "@storybook/react";
import { Dropdown } from "./Dropdown";

const meta: Meta<typeof Dropdown> = {
  title: "Components/UI/Dropdown",
  component: Dropdown,
  tags: ["autodocs"],
  args: {
    label: "Menu",
  },
} satisfies Meta<typeof Dropdown>;

export default meta;
type Story = StoryObj<typeof Dropdown>;

export const Primary: Story = {};
