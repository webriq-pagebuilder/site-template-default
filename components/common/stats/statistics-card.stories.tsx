import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { StatsCard } from "./stats-card";
import { Sections, SectionsProps, Variants } from "types";
import { config } from "../../../lib/storybook.figma.urls";

const ARGS = {
  LABEL: "Total Revenue",
  VALUE: "$33,261",
  ICON: "https://cdn.sanity.io/images/9itgab5x/staging/97b6696849c90facc200537fd780b03d373e5212-980x830.png",
};
const meta = {
  title: "Components/Common/Statistics",
  component: StatsCard,
  tags: ["autodocs"],
  args: {
    label: ARGS.LABEL,
    value: ARGS.VALUE,
    icon: ARGS.ICON,
  },
  decorators: [
    (Story) => (
      <div className="max-w-[300px]">
        <Story />
      </div>
    ),
  ],
  parameters: {
    design: {
      type: "figma",
      url: config.components.common.StatsCard.primary,
    },
  },
} satisfies Meta<typeof StatsCard>;

export default meta;
type Story = StoryObj<typeof StatsCard>;

export const Primary: Story = {
  args: {
    variant: "inline",
  },
};

export const Stacked: Story = {
  args: {
    variant: "stacked",
  },
};
