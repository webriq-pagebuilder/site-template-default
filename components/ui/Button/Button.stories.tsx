import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { ImSpinner2 } from "react-icons/im";

const meta: Meta<typeof Button> = {
  title: "Components/UI/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Submit",
  },
  argTypes: {
    onClick: { action: "onClick" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Solid: Story = {
  args: {
    variant: "solid",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
};

export const Link: Story = {
  args: {
    variant: "link",
  },
};

export const Custom: Story = {
  args: {
    variant: "custom",
  },
};
