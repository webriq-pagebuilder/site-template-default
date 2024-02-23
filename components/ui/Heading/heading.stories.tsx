import type { Meta, StoryObj } from "@storybook/react";
import { Heading } from "./heading";

const meta: Meta<typeof Heading> = {
  title: "Components/UI/Heading",
  component: Heading,

  tags: ["autodocs"],
} satisfies Meta<typeof Heading>;

export default meta;
type Story = StoryObj<typeof Heading>;

export const Primary: Story = {
  render: () => (
    <div className="space-y-2">
      <Heading type="h1">Heading 1</Heading>
      <Heading type="h2">Heading 2</Heading>
      <Heading type="h3">Heading 3</Heading>
      <Heading type="h4">Heading 4</Heading>
      <Heading type="h5">Heading 5</Heading>
      <Heading type="h6">Heading 6</Heading>
    </div>
  ),
};
