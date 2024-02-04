import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "./Flex";
const meta: Meta<typeof Flex> = {
  title: "Components/Layout/Flex",
  component: Flex,
  tags: ["autodocs"],
  args: {
    children: (
      <>
        <div className="w-20 h-20 border border-red-500"></div>
        <div className="w-20 h-20 border border-red-500"></div>
        <div className="w-20 h-20 border border-red-500"></div>
      </>
    ),
  },
  decorators: [
    (Story) => (
      <section className="w-full ">
        <Story />
      </section>
    ),
  ],
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof Flex>;

export const Primary: Story = {
  args: {
    className: "w-full",
  },
};
