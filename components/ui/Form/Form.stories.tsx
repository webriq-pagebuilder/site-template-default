import type { Meta, StoryObj } from "@storybook/react";
import { Form } from "./Form";

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
    buttonLabel: "Get Started",
    subtitle: "",
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
    buttonLabel: "Get Started",
    subtitle: "",
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
    buttonLabel: "Get Started",
    subtitle: "",
    name: "Primary",
    id: "fc11c685-2d1a-447d-b891-ea63a38c5f57",
    children: (
      <>
        {fields.map((formFields, index) => (
          <div key={index}>
            {formFields?.type === "textarea" ? (
              <div className="mb-4">
                <textarea
                  aria-label={formFields?.placeholder ?? formFields?.name}
                  className="h-24 w-full resize-none rounded bg-white p-4 text-xs font-semibold leading-none outline-none"
                  placeholder={formFields?.placeholder}
                  name={formFields?.name}
                  required={formFields?.isRequired}
                />
              </div>
            ) : formFields?.type === "inputFile" ? (
              <div className="mb-4">
                <label className="flex rounded bg-white px-2">
                  <input
                    aria-label={formFields?.name ?? "Choose file..."}
                    className="absolute opacity-0"
                    type="file"
                    placeholder="Choose file.."
                    name={formFields?.name}
                    required={formFields?.isRequired}
                  />
                  <span className="w-full px-2 py-4 text-xs font-semibold leading-none">
                    Name
                  </span>
                  <div className="my-1 ml-auto cursor-pointer rounded bg-gray-500 px-4 py-3 text-xs font-semibold leading-none text-white transition duration-200 hover:bg-gray-600">
                    Browse
                  </div>
                </label>
              </div>
            ) : formFields.type === "inputNumber" ? (
              <input
                aria-label={formFields?.placeholder ?? formFields?.name}
                className="mb-4 w-full rounded bg-white p-4 text-xs font-semibold leading-none outline-none"
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
                <select
                  aria-label={formFields?.label}
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
                </select>
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
                      <input
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
                      <input
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
                <input
                  aria-label={formFields?.placeholder ?? formFields?.name}
                  className="w-full rounded bg-white p-4 text-xs font-semibold leading-none outline-none"
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

          <button
            aria-label={"Contact form submit button"}
            className="mt-5 inline-block rounded-l-xl rounded-t-xl bg-webriq-darkblue px-6 py-2 font-bold leading-loose text-white transition duration-200 hover:bg-webriq-blue sm:mt-0"
            type="submit"
          >
            Submit
          </button>
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
