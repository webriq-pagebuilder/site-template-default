import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./RadioGroup";
import { Radio } from "../Radio/Radio";

const meta: Meta<typeof RadioGroup> = {
  title: "Components/UI/Radio Group",
  component: RadioGroup,
  decorators: [
    (Story) => (
      <div className="p-4 rounded-lg bg-gray-50">
        <Story />
      </div>
    ),
  ],

  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Primary: Story = {
  args: {
    children: ["Option 1", "Option 2", "Option 3"].map((r) => {
      return <Radio name="Primary" ariaLabel={r} item={r} />;
    }),
    variant: "primary",
    name: "Primary",
  },
};

export const Inline: Story = {
  args: {
    children: ["Option 1", "Option 2", "Option 3"].map((r) => {
      return <Radio name="Inline" ariaLabel={r} item={r} />;
    }),
    variant: "inline",
    name: "Inline",
  },
};
