import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Text } from "./Text";
import { config } from "../../../lib/storybook.figma.urls";

const meta: Meta<typeof Text> = {
  title: "Components/UI/Text",
  component: Text,
  tags: ["autodocs"],
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Text.primary,
    },
  },
} satisfies Meta<typeof Text>;

export default meta;
type Story = StoryObj<typeof Text>;

const TEXT = "Lorem ipsum dolor sit amet";

export const Primary: Story = {
  render: () => (
    <div className="space-y-2">
      <Text fontSize="xs">(xs){TEXT}</Text>
      <Text fontSize="sm">(sm) {TEXT}</Text>
      <Text fontSize="base">(base) {TEXT}</Text>
      <Text fontSize="lg">(lg) {TEXT}</Text>
      <Text fontSize="xl">(xl) {TEXT}</Text>
      <Text fontSize="2xl">(2xl) {TEXT}</Text>
      <Text fontSize="3xl">(3xl) {TEXT}</Text>
      <Text fontSize="4xl">(4xl) {TEXT}</Text>
      <Text fontSize="5xl">(5xl){TEXT}</Text>
    </div>
  ),
};
