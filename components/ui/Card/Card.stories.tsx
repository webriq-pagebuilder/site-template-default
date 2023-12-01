import type { Meta, StoryObj } from "@storybook/react";
import { Card } from "./Card";

const meta: Meta<typeof Card> = {
  title: "Components/UI/Card",
  component: Card,
  tags: ["autodocs"],
  args: {
    children: <p>This is a sample card</p>,
  },
} satisfies Meta<typeof Card>;

export default meta;
type Story = StoryObj<typeof Card>;

export const Primary: Story = {};

export const WithClassName: Story = {
  args: {
    className: "bg-gray-200 border-solid border border-webriq-blue",
  },
};
