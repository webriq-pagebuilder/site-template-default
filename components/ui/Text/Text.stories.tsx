import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";

const meta: Meta<typeof Text> = {
  title: "Components/UI/Text",
  component: Text,

  tags: ["autodocs"],
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof Text>;

export const Primary: Story = {
  render: () => (
    <>
      <Text type="h1">This is a text</Text>
      <Text type="h2">This is a text</Text>
      <Text type="h3">This is a text</Text>
      <Text type="h4">This is a text</Text>
      <Text type="h5">This is a text</Text>
      <Text type="h6">This is a text</Text>
      <Text type="p">This is a text</Text>
    </>
  ),
};
