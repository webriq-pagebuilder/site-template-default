import type { Meta, StoryObj } from "@storybook/react";
import { Button } from "./Button";
import { ImSpinner2 } from "react-icons/im";
import * as data from "utils/storybook_data.json";

const meta: Meta<typeof Button> = {
  title: "Components/UI/Button",
  component: Button,
  tags: ["autodocs"],
  args: {
    children: "Submit",
  },
  argTypes: {
    onClick: { action: "onClick" },
  },
} satisfies Meta<typeof Button>;

export default meta;
type Story = StoryObj<typeof Button>;

export const Primary: Story = {
  args: {
    variant: "primary",
  },
};

export const Secondary: Story = {
  args: {
    variant: "secondary",
  },
};

export const Tertiary: Story = {
  args: {
    variant: "tertiary",
  },
};

export const Outline: Story = {
  args: {
    variant: "outline",
  },
};

export const Borderless: Story = {
  args: {
    variant: "borderless",
  },
};

// export const Loading: Story = {
//   args: {
//     loading: true,
//   },
// };

export const WithLoadingComponent: Story = {
  args: {
    loading: true,
    loadingComponent: <ImSpinner2 className="animate-spin" size={30} />,
  },
};

export const CustomClass: Story = {
  args: {
    className:
      "rounded-none bg-orange-600 tracking-widest text-gray-200 hover:bg-orange-400",
  },
};
