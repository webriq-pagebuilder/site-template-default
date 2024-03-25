import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Grid, GridItem } from "./Grid";
import { config } from "../../../lib/storybook.figma.urls";

const meta: Meta<typeof Grid> = {
  title: "Components/Layout/Grid",
  component: Grid,
  tags: ["autodocs"],
  args: {
    children: (
      <>
        <GridItem span={1} className="w-20 h-20 border border-primary" />
        <GridItem span={1} className="w-20 h-20 border border-primary" />
        <GridItem span={1} className="w-20 h-20 border border-primary" />
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
      url: config.components.layout.Grid.primary,
    },
  },
} satisfies Meta<typeof Grid>;

export default meta;
type Story = StoryObj<typeof Grid>;

export const Primary: Story = {};
