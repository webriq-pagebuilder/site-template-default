import type { Meta, StoryObj } from "@storybook/react";
import { BackgroundImage } from "./BackgroundImage";

const meta: Meta<typeof BackgroundImage> = {
  title: "Components/UI/BackgroundImage",
  component: BackgroundImage,
  tags: ["autodocs"],
  args: {
    src: "https://img.freepik.com/free-photo/high-angle-shot-beautiful-forest-with-lot-green-trees-enveloped-fog-new-zealand_181624-19717.jpg?w=1480&t=st=1701397784~exp=1701398384~hmac=22c1fe64521c358a5b88c57586a7d051ff5b9f11a9ab7d0c1adc81fe5f7f4a32",
  },
  decorators: [
    (Story) => (
      <div className="h-[300px] w-full">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof BackgroundImage>;

export default meta;
type Story = StoryObj<typeof BackgroundImage>;

export const Primary: Story = {};
