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
    <div className="space-y-2">
      <Text type="h1">Heading 1</Text>
      <Text type="h2">Heading 2</Text>
      <Text type="h3">Heading 3</Text>
      <Text type="h4">Heading 4</Text>
      <Text type="h5">Heading 5</Text>
      <Text type="h6">Heading 6</Text>
      <Text type="p">Normal</Text>
    </div>
  ),
};
