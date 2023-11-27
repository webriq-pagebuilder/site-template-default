import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "./Form";
import { Textarea } from "../Textarea";
import { InputFile } from "../File";
import { Input } from "../Input";
import { Select } from "../Select";
import { Radio } from "../Radio";
import { Checkbox } from "../Checkbox";
import { Button } from "../Button";

const meta: Meta<typeof Form> = {
  title: "UI/Form",
  component: Form,
  //   parameters: {
  //     // Optional parameter to center the component in the Canvas. More info: https://storybook.js.org/docs/react/configure/story-layout
  //     layout: "centered",
  //   },
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
    fields: DUMMY_FIELDS,
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

const outline_fields = DUMMY_FIELDS.map((field) => ({
  ...field,
  variant: "outline",
}));

export const Outline: Story = {
  args: {
    btnLabel: "Get Started",
    name: "Primary",
    id: "fc31c685-2d1a-447d-b891-ea63a38c5f57",
    fields: outline_fields,
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};

const fields = DUMMY_FIELDS.map((f) => ({ ...f, isRequired: false }));
export const CustomFields: Story = {
  args: {
    className: " bg-slate-200 rounded-0",
    name: "Primary",
    id: "fc11c685-2d1a-447d-b891-ea63a38c5f57",
    children: (
      <>
        {fields.map((formFields, index) => (
          <div key={index}>
            {formFields?.type === "textarea" ? (
              <div className="mb-4">
                <Textarea
                  ariaLabel={formFields?.placeholder ?? formFields?.name}
                  className="text-base text-webriq-blue placeholder:text-webriq-blue"
                  placeholder={formFields?.placeholder}
                  name={formFields?.name}
                  required={formFields?.isRequired}
                />
              </div>
            ) : formFields?.type === "inputFile" ? (
              <div className="mb-4">
                <InputFile
                  ariaLabel={formFields?.name ?? "Choose file..."}
                  className="text-webriq-blue"
                  variant="outline"
                  type="file"
                  placeholder="Choose file.."
                  name={formFields?.name}
                  required={formFields?.isRequired}
                />
              </div>
            ) : formFields.type === "inputNumber" ? (
              <Input
                ariaLabel={formFields?.placeholder ?? formFields?.name}
                className="text-base text-webriq-blue placeholder:text-webriq-blue"
                type="number"
                placeholder={formFields?.placeholder}
                name={formFields?.name}
                required={formFields?.isRequired}
              />
            ) : formFields.type === "inputSelect" ? (
              <div className="mb-4 flex">
                <label
                  className="m-auto text-left text-xs font-semibold leading-none text-gray-500"
                  htmlFor={formFields?.name}
                >
                  {formFields?.label}
                </label>
                <Select
                  ariaLabel={formFields?.label}
                  className="w-full rounded bg-white p-3 text-xs font-semibold text-gray-500 outline-none"
                  name={`contact-${formFields?.name}`}
                  defaultValue={"default-value"}
                  required={formFields?.isRequired}
                >
                  <option value=""></option>
                  {formFields?.items?.map((item, index) => (
                    <option key={index} value={item}>
                      {item}
                    </option>
                  ))}
                </Select>
              </div>
            ) : formFields?.type === "inputRadio" ? (
              <div className="mb-4 text-left">
                <label
                  className="m-auto text-left text-xs font-semibold text-gray-500"
                  htmlFor={formFields?.name}
                >
                  {formFields?.label}
                </label>
                <div>
                  {formFields?.items?.map((item, index) => (
                    <label
                      className="mr-4 text-xs font-semibold text-gray-500"
                      key={index}
                    >
                      <Radio
                        item={item}
                        ariaLabel={item}
                        className="mr-2"
                        name={formFields?.name}
                        value={item}
                        type="radio"
                        required={formFields?.isRequired}
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
            ) : formFields?.type === "inputCheckbox" ? (
              <div className="mb-4 text-left">
                <label
                  className="m-auto text-left text-xs font-semibold text-gray-500"
                  htmlFor={formFields?.name}
                >
                  {formFields?.label}
                </label>
                <div>
                  {formFields?.items?.map((item, index) => (
                    <label
                      className="mr-4 text-xs font-semibold text-gray-500"
                      key={index}
                    >
                      <Checkbox
                        ariaLabel={item}
                        className="mr-2"
                        name={formFields?.name}
                        value={item}
                        type="checkbox"
                        required={formFields?.isRequired}
                      />
                      {item}
                    </label>
                  ))}
                </div>
              </div>
            ) : (
              <div className="mb-4">
                <Input
                  ariaLabel={formFields?.placeholder ?? formFields?.name}
                  className="text-base text-webriq-blue placeholder:text-webriq-blue"
                  type={
                    formFields?.type === "inputEmail"
                      ? "email"
                      : formFields?.type === "inputPassword"
                      ? "password"
                      : "text"
                  }
                  placeholder={formFields?.placeholder}
                  name={formFields?.name}
                  required={formFields?.isRequired}
                />
              </div>
            )}
          </div>
        ))}
        <div className="items-center sm:flex sm:justify-between">
          <div>
            <div className="webriq-recaptcha" />
          </div>

          <Button
            variant="outline"
            ariaLabel={"Contact form submit button"}
            type="submit"
          >
            Submit
          </Button>
        </div>
      </>
    ),
  },
  parameters: {
    backgrounds: {
      default: "dark",
    },
  },
};
