import type { Meta, StoryObj } from "@storybook/react";
import { Input } from "./Input";

const meta: Meta<typeof Input> = {
  title: "Components/UI/Input",
  component: Input,
  tags: ["autodocs"],
  args: {
    placeholder: "your.email@webriq.com",
    name: "Email",
    type: "email",
    variant: "outline",
  },
  decorators: [
    (Story) => (
      <div className="p-4 rounded-lg bg-gray-50">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof Input>;

export default meta;
type Story = StoryObj<typeof Input>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const NoLabel: Story = {
  args: {
    noLabel: true,
    variant: "primary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};
