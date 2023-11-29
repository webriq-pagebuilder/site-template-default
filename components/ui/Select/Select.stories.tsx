import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "UI/Select",
  component: Select,
  decorators: [
    (Story) => (
      <div className="bg-gray-50 rounded-lg p-4">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Select>;

export default meta;
type Story = StoryObj<typeof Select>;

const DUMMY_SELECT = {
  name: "radio",
  items: ["Option 1", "Option 2", "Option 3"],
};

export const Primary: Story = {
  args: {
    children: DUMMY_SELECT.items.map((opt) => (
      <option key={opt} value={opt}>
        {opt}
      </option>
    )),
  },
};
