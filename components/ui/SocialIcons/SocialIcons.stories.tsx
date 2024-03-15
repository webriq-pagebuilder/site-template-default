import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { SocialIcon, Socials } from "./SocialIcons";
import { config } from "../../../lib/storybook.figma.urls";

const meta: Meta<typeof SocialIcon> = {
  title: "Components/UI/Social Icons",
  component: SocialIcon,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.SocialIcons.primary,
    },
  },
} satisfies Meta<typeof SocialIcon>;

export default meta;
type Story = StoryObj<typeof SocialIcon>;

export const AllIcons: Story = {
  render: () => {
    const icons = ["facebook", "linkedin", "instagram", "youtube"];
    return (
      <div className="flex gap-4">
        {icons.map((i, index) => (
          <SocialIcon social={i as Socials} key={index} />
        ))}
      </div>
    );
  },
};
