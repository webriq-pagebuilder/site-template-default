import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

const DUMMY_OPTIONS = [
  {
    id: 1,
    item: "Option 1",
  },
  {
    id: 2,
    item: "Option 2",
  },
  {
    id: 2,
    item: "Option 3",
  },
];

export const Primary: Story = {
  args: {
    children: DUMMY_OPTIONS.map((opt) => (
      <option key={opt.id} value={opt.item}>
        {opt.item}
      </option>
    )),
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export const Outline: Story = {
  args: {
    children: DUMMY_OPTIONS.map((opt) => (
      <option key={opt.id} value={opt.item}>
        {opt.item}
      </option>
    )),
    variant: "outline",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};
