import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "./Form";
import { FormField } from "../FormField/FormField";
import { FormTypes } from "types";
import { Input } from "../Input";
const meta: Meta<typeof Form> = {
  title: "UI/Form",
  component: Form,
  tags: ["autodocs"],
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof Form>;

const DUMMY_FIELDS = [
  {
    _type: "webriqFormField",
    name: "Name",
    placeholder: "Name",
    _key: "KF4Watp0rdbnQFDzoNJaj",
    type: "inputText",
  },
  {
    _type: "webriqFormField",
    placeholder: "name@example.com",
    _key: "WncOcChbz0IIlmTXT3Pf4",
    type: "inputEmail",
    name: "Email",
  },
  {
    _key: "544e404591c5",
    type: "inputPassword",
    _type: "webriqFormField",
    name: "Password",
    placeholder: "*****",
  },
  {
    _key: "HH5DNYs-47nFOLhp7ePSR",
    type: "textarea",
    _type: "webriqFormField",
    name: "Message...",
    placeholder: "Message...",
  },
  {
    _type: "webriqFormField",
    name: "Add file",
    _key: "JVOHwWl7SKkl_Nz8IBYBC",
    type: "inputFile",
  },
  {
    _key: "0cf9d7383c63",
    type: "inputRadio",
    _type: "webriqFormField",
    name: "Radio",
    label: "Radio label",
    items: ["Option 1", "Option 2", "Option 3"],
  },
  {
    name: "Checkbox",
    label: "Checkbox",
    _key: "5e8d1abf787a",
    type: "inputCheckbox",
    _type: "webriqFormField",
    items: ["Option 1", "Option 2", "Option 3"],
  },
  {
    _key: "be3fca5ba2c5",
    type: "inputSelect",
    _type: "webriqFormField",
    name: "Select",
    label: "Select",
    items: ["Select 1", "Select 2", "Select 3"],
  },
];

export const Primary: Story = {
  args: {
    btnLabel: "Get Started",
    name: "Primary",
    id: "fc31c685-2d1a-447d-b891-ea63a38c5f57",
    children: DUMMY_FIELDS.map((field) => {
      return (
        <FormField
          label={field?.label}
          items={field.items}
          type={field.type as FormTypes}
          name={field.name}
          isRequired={false}
          placeholder={field.placeholder}
        />
      );
    }),
  },
};

export const WithCustomField: Story = {
  args: {
    btnLabel: "Get Started",
    name: "form",
    id: "fc31c685-2d1a-447d-b891-ea63a38c5f57",
    children: DUMMY_FIELDS.map((field) => {
      if (field.type === "inputText") {
        return (
          <div className="mb-4">
            <Input
              className="placeholder:text-red-500 border border-solid border-red-400"
              placeholder="This is a custom field!"
              type={"text"}
              name={field.name}
              ariaLabel={field.name ?? field.label}
              label={field.label ?? field.name}
            />
          </div>
        );
      }
      return (
        <FormField
          label={field?.label}
          items={field.items}
          type={field.type as FormTypes}
          name={field.name}
          isRequired={false}
          placeholder={field.placeholder}
        />
      );
    }),
  },
};
