import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { YoutubeVideo } from "./youtube-video";
import { Sections, SectionsProps, Variants } from "types";
import { config } from "../../../lib/storybook.figma.urls";

const ARGS = {
  LABEL: "Total Revenue",
  VALUE: "$33,261",
  ICON: "https://cdn.sanity.io/images/9itgab5x/staging/97b6696849c90facc200537fd780b03d373e5212-980x830.png",
};
const meta = {
  title: "Components/Common/Youtube Video",
  component: YoutubeVideo,
  tags: ["autodocs"],
  args: {
    videoLinkId: "HfPdTL7Isx8",
    title: "Build & Launch without problems",
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
      url: config.components.common.YoutubeVid.primary,
    },
  },
} satisfies Meta<typeof YoutubeVideo>;

export default meta;
type Story = StoryObj<typeof YoutubeVideo>;

export const Primary: Story = {};
