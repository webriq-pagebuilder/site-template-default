import type { Meta, StoryObj } from "@storybook/react";
import { Avatar } from "./Avatar";
import { config } from "../../../lib/storybook.figma.urls";

const meta: Meta<typeof Avatar> = {
  title: "Components/UI/Avatar",
  component: Avatar,
  args: {
    alt: "image",
  },
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Avatar?.primary,
    },
  },
} satisfies Meta<typeof Avatar>;

export default meta;
type Story = StoryObj<typeof Avatar>;

export const Primary: Story = {
  args: {
    src: "https://images.unsplash.com/photo-1438761681033-6461ffad8d80?q=80&w=2940&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
    text: "Stackshift UI",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Avatar?.primary,
    },
  },
};

export const Initials: Story = {
  args: {
    text: "Stackshift UI",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Avatar?.initials,
    },
  },
};
