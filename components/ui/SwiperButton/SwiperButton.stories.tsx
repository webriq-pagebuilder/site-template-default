import type { Meta, StoryObj } from "@storybook/react";
import { SwiperButton } from "./SwiperButton";

const meta: Meta<typeof SwiperButton> = {
  title: "Components/UI/Swiper Button",
  component: SwiperButton,
  tags: ["autodocs"],
} satisfies Meta<typeof SwiperButton>;

export default meta;
type Story = StoryObj<typeof SwiperButton>;

export const Primary: Story = {};
