import type { Meta, StoryObj } from "@storybook/react";
import { Radio } from "./Radio";

const meta: Meta<typeof Radio> = {
  title: "UI/Radio",
  component: Radio,
  parameters: {
    // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
    layout: "centered",
  },
  decorators: [
    (Story) => (
      <div className="flex items-center justify-center">
        <Story />
        <label className="text-white">Radio 1</label>
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof Radio>;

export default meta;
type Story = StoryObj<typeof Radio>;

export const Primary: Story = {
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};
