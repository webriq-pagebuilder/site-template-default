import type { Meta, StoryObj } from "@storybook/react";
import { SwiperPagination } from "./SwiperPagination";

const meta: Meta<typeof SwiperPagination> = {
  title: "Components/UI/Swiper Pagination",
  component: SwiperPagination,
  tags: ["autodocs"],
} satisfies Meta<typeof SwiperPagination>;

export default meta;
type Story = StoryObj<typeof SwiperPagination>;

export const Blue: Story = {
  args: {
    colorScheme: "blue",
  },
};
