import type { Meta, StoryObj } from "@storybook/react";
import { Select } from "./Select";

const meta: Meta<typeof Select> = {
  title: "Components/UI/Select",
  component: Select,
  args: {
    items: ["Option 1", "Option 2", "Option 3"],
    name: "Select",
  },
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

export const Primary: Story = {
  args: {},
};
