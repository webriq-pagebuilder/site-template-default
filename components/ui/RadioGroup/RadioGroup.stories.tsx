import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./RadioGroup";
import { Radio } from "../Radio/Radio";

const DUMMY_RADIO = {
  name: "radio",
  items: ["Option 1", "Option 2", "Option 3"],
};

const meta: Meta<typeof RadioGroup> = {
  title: "Components/UI/RadioGroup",
  component: RadioGroup,
  decorators: [
    (Story) => (
      <div className="bg-gray-50 rounded-lg p-4">
        <Story />
      </div>
    ),
  ],
  args: {
    children: DUMMY_RADIO.items.map((item, index) => (
      <Radio ariaLabel={item} name={DUMMY_RADIO.name} item={item} />
    )),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof RadioGroup>;

export default meta;
type Story = StoryObj<typeof RadioGroup>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Inline: Story = {
  args: {
    variant: "inline",
  },
};
