import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { config } from "../../../lib/storybook.figma.urls";

const meta: Meta<typeof Button> = {
  title: "Components/UI/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Submit",
    link: {
      externalLink: null,
      internalLink: "initial-values-test",
      label: "About Us",
      linkInternal: {
        _ref: "020142ce-cf61-4671-a5db-80b13a08f2d4",
        _type: "reference",
      },
      linkTarget: "_self",
      linkType: "linkInternal",
      type: "linkInternal",
    },
  },
  argTypes: {
    onClick: { action: "onClick" },
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Button?.default,
    },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Solid: Story = {
  args: {
    variant: "solid",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Button?.solid,
    },
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Button?.outline,
    },
  },
};

export const Ghost: Story = {
  args: {
    variant: "ghost",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Button?.ghost,
    },
  },
};

export const Link: Story = {
  args: {
    variant: "link",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Button?.link,
    },
  },
};

export const Custom: Story = {
  args: {
    variant: "custom",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Button?.custom,
    },
  },
};

export const Unstyled: Story = {
  args: {
    variant: "unstyled",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Button?.unstyled,
    },
  },
};
export const AddToWishlist: Story = {
  args: {
    variant: "addToWishlist",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Button?.addToWishlist,
    },
  },
};

export const SwiperPagination: Story = {
  args: {
    variant: "swiper_pagination",
    isActive: true,
    children: "",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Button?.swiperPagination,
    },
  },
};
export const Tab: Story = {
  args: {
    variant: "tab",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Button?.tab,
    },
  },
};
