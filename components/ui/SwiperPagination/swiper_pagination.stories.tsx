import type { Meta, StoryObj } from "@storybook/react";
import { SwiperPagination } from "./SwiperPagination";
import { config } from "../../../lib/storybook.figma.urls";

const meta: Meta<typeof SwiperPagination> = {
  title: "Components/UI/Swiper Pagination",
  component: SwiperPagination,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.SwiperPagination.primary,
    },
  },
} satisfies Meta<typeof SwiperPagination>;

export default meta;
type Story = StoryObj<typeof SwiperPagination>;

export const Blue: Story = {
  args: {
    colorScheme: "blue",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.SwiperPagination.primary,
    },
  },
};
