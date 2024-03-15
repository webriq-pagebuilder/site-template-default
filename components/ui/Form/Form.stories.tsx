import React from "react";
import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "./Form";
import { FormField } from "../FormField/FormField";
import { FormTypes } from "../../../types";
import { Input } from "../Input";
import { Button } from "../Button";
import { config } from "../../../lib/storybook.figma.urls";

const meta: Meta<typeof Form> = {
  title: "Components/UI/Form",
  component: Form,
  tags: ["autodocs"],
  args: {
    name: "Form",
    id: "fc31c685-2d1a-447d-b891-ea63a38c5f57",
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Form.primary,
    },
  },
} satisfies Meta<typeof Form>;

export default meta;
type Story = StoryObj<typeof Form>;

const DUMMY_FIELDS = [
  {
    name: "Name",
    placeholder: "Name",
    _key: "KF4Watp0rdbnQFDzoNJaj",
    type: "inputText",
  },
  {
    placeholder: "name@example.com",
    _key: "WncOcChbz0IIlmTXT3Pf4",
    type: "inputEmail",
    name: "Email",
  },
  {
    _key: "544e404591c5",
    type: "inputPassword",

    name: "Password",
    placeholder: "*****",
  },
  {
    _key: "HH5DNYs-47nFOLhp7ePSR",
    type: "textarea",

    name: "Message...",
    placeholder: "Message...",
  },
  {
    name: "Add file",
    _key: "JVOHwWl7SKkl_Nz8IBYBC",
    type: "inputFile",
  },
  {
    _key: "0cf9d7383c63",
    type: "inputRadio",

    name: "Radio",
    label: "Radio label",
    items: ["Option 1", "Option 2", "Option 3"],
  },
  {
    name: "Checkbox",
    label: "Checkbox",
    _key: "5e8d1abf787a",
    type: "inputCheckbox",

    items: ["Option 1", "Option 2", "Option 3"],
  },
  {
    _key: "be3fca5ba2c5",
    type: "inputSelect",

    name: "Select",
    label: "Select",
    items: ["Select 1", "Select 2", "Select 3"],
  },
];

export const Primary: Story = {
  args: {
    children: (
      <>
        {DUMMY_FIELDS.map((field, index) => {
          return (
            <FormField
              label={field?.label}
              items={field.items}
              type={field.type as FormTypes}
              name={field.name}
              required={false}
              placeholder={field.placeholder}
              key={index}
            />
          );
        })}
        <div className="items-center sm:flex sm:justify-between">
          <div>
            <div className="webriq-recaptcha" />
          </div>

          <Button ariaLabel={"Form submit button"} type="submit">
            Submit
          </Button>
        </div>
      </>
    ),
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Form.primary,
    },
  },
};

export const WithCustomField: Story = {
  args: {
    children: (
      <>
        {DUMMY_FIELDS.map((field) => {
          if (field.type === "inputText") {
            return (
              <div className="mb-4" key={field?.name}>
                <Input
                  className="border border-red-400 border-solid placeholder:text-red-500"
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
              required={false}
              placeholder={field.placeholder}
              key={field?.name}
            />
          );
        })}
        <div className="items-center sm:flex sm:justify-between">
          <div>
            <div className="webriq-recaptcha" />
          </div>

          <Button ariaLabel={"Form submit button"} type="submit">
            Submit
          </Button>
        </div>
      </>
    ),
  },
  parameters: {
    design: {
      type: "figma",
      url: config.components.ui.Form.custom,
    },
  },
};
