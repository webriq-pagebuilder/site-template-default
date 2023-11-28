import type { Meta, StoryObj } from "@storybook/react";
import { CheckboxGroup } from "./CheckboxGroup";
import { Checkbox } from "../Checkbox/Checkbox";

const DUMMY_CHECKBOX = {
  name: "radio",
  isRequired: false,
  items: ["Option 1", "Option 2", "Option 3"],
};

const meta: Meta<typeof CheckboxGroup> = {
  title: "UI/CheckboxGroup",
  component: CheckboxGroup,
  args: {
    children: DUMMY_CHECKBOX.items.map((item, index) => (
      <Checkbox
        ariaLabel={item}
        isRequired={DUMMY_CHECKBOX.isRequired}
        name={DUMMY_CHECKBOX.name}
        value={item}
      />
    )),
  },
  tags: ["autodocs"],
} satisfies Meta<typeof CheckboxGroup>;

export default meta;
type Story = StoryObj<typeof CheckboxGroup>;

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
