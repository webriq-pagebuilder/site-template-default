import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./FormField";
import { Form } from "../Form/Form";
import { config } from "../../../lib/storybook.figma.urls";

const meta: Meta<typeof FormField> = {
  title: "Components/UI/Form Field",
  component: FormField,
  tags: ["autodocs"],
  args: {
    name: "Name",
    placeholder: "Name",
    type: "inputText",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.FormField.primary,
    },
  },
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof FormField>;

export const Primary: Story = {};
