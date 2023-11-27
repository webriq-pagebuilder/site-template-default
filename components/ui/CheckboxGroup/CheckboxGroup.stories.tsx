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
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  args: {
    children: DUMMY_CHECKBOX.items.map((item, index) => (
      <div className="flex items-center">
        <Checkbox
          isRequired={DUMMY_CHECKBOX.isRequired}
          name={DUMMY_CHECKBOX.name}
          item={item}
        />
        <label
          className="mr-4 text-xs font-semibold text-gray-500"
          key={index}
          htmlFor={item}
        >
          {item}
        </label>
      </div>
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
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export const Inline: Story = {
  args: {
    variant: "inline",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};
