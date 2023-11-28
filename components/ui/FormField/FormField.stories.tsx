import type { Meta, StoryObj } from "@storybook/react";
import { FormField } from "./FormField";
import { Form } from "../Form/Form";

const meta: Meta<typeof FormField> = {
  title: "UI/FormField",
  component: FormField,
  tags: ["autodocs"],
  args: {
    name: "Name",
    placeholder: "Name",
    type: "inputText",
  },
  decorators: [
    (Story) => {
      return (
        <Form btnLabel="Submit" id="123" name="name">
          <Story />
        </Form>
      );
    },
  ],
} satisfies Meta<typeof FormField>;

export default meta;
type Story = StoryObj<typeof FormField>;

export const Primary: Story = {};

export const Inline: Story = {
  args: {
    variant: "inline",
  },
};
