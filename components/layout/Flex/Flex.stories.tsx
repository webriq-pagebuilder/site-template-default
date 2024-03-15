import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Flex } from "./Flex";
import { config } from "../../../lib/storybook.figma.urls";

const meta: Meta<typeof Flex> = {
  title: "Components/Layout/Flex",
  component: Flex,
  tags: ["autodocs"],
  args: {
    children: (
      <>
        <div className="w-20 h-20 border border-primary"></div>
        <div className="w-20 h-20 border border-primary"></div>
        <div className="w-20 h-20 border border-primary"></div>
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
  parameters: {
    design: {
      type: "figma",
      url: config.components.layout.Flex.primary,
    },
  },
} satisfies Meta<typeof Flex>;

export default meta;
type Story = StoryObj<typeof Flex>;

export const Primary: Story = {
  args: {
    className: "w-full",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.layout.Flex.primary,
    },
  },
};
