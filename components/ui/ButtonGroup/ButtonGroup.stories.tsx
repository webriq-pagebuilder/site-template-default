import type { Meta, StoryObj } from "@storybook/react";
import { ButtonGroup } from "./ButtonGroup";
import { Button } from "../Button/Button";

const DUMMY_BUTTON = [
  {
    id: 1,
    label: "One",
  },
  {
    id: 2,
    label: "Two",
  },
  {
    id: 3,
    label: "Three",
  },
];

const meta: Meta<typeof ButtonGroup> = {
  title: "UI/ButtonGroup",
  component: ButtonGroup,
  args: {
    children: DUMMY_BUTTON.map((btn) => (
      <Button ariaLabel={btn.label} key={btn.id}>
        {btn.label}
      </Button>
    )),
  },
  decorators: [
    (Story) => (
      <div className="border border-solid border-red-400 p-2">
        <Story />
      </div>
    ),
  ],
  tags: ["autodocs"],
} satisfies Meta<typeof ButtonGroup>;

export default meta;
type Story = StoryObj<typeof ButtonGroup>;

export const Primary: Story = {};
