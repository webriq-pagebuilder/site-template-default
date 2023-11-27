import type { Meta, StoryObj } from "@storybook/react";
import { RadioGroup } from "./RadioGroup";
import { Radio } from "../Radio/Radio";

const DUMMY_RADIO = {
  name: "radio",
  items: ["Option 1", "Option 2", "Option 3"],
};

const meta: Meta<typeof RadioGroup> = {
  title: "UI/RadioGroup",
  component: RadioGroup,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  args: {
    children: DUMMY_RADIO.items.map((item, index) => (
      <div className="flex items-center">
        <Radio ariaLabel={item} name={DUMMY_RADIO.name} item={item} />
        <label
          className="mr-4 text-xs font-semibold text-white"
          key={index}
          htmlFor={item}
        >
          {item}
        </label>
      </div>
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
