import WebriQForm from "components/webriq-form";
import { thankYouPageLink } from "helper";
import React, { Children } from "react";
import { Input } from "../Input";
import { Textarea } from "../Textarea";
import { InputFile } from "../File";
import { cn } from "utils/cn";
import { Radio } from "../Radio/Radio";
import { RadioGroup } from "../RadioGroup";
import { Select } from "../Select";
import { Checkbox } from "../Checkbox";
import { CheckboxGroup } from "../CheckboxGroup";

interface IForm {
  className?: string;
  id: string;
  name: string;
  thankyou_page?: string;
  [key: string]: any;
}

interface FormWithChildren extends IForm {
  children: React.ReactNode;
  fields?: never;
}

interface FormWithDefaultFields extends IForm {
  fields: any[];
  children?: never;
}

type Form = FormWithChildren | FormWithDefaultFields;

export const Form = (form: Form) => {
  return (
    <WebriQForm
      method="POST"
      data-form-id={form?.id}
      name="Contact-VariantA-Form"
      className={`form-contacts w-full p-4 bg-gray-50 rounded-md max-w-[650px] mx-auto ${form.className}`}
      data-thankyou-url={thankYouPageLink(form?.thankYouPage)}
      scriptsrc="https://pagebuilderforms.webriq.com/js/initReactForms"
    >
      {!form?.fields && form.children && form.children}

      {/* Render if no children */}
      {!form?.children && form?.fields && (
        <>
          {form?.fields.map((field) => {
            return (
              <>
                <FormFields key={field.name} {...field} />
              </>
            );
          })}
          <div className="items-center sm:flex sm:justify-between">
            <div>
              <div className="webriq-recaptcha" />
            </div>
            {form?.buttonLabel && (
              <button
                aria-label={form?.buttonLabel ?? "Contact form submit button"}
                className="mt-5 inline-block rounded-l-xl rounded-t-xl bg-webriq-darkblue px-6 py-2 font-bold leading-loose text-white transition duration-200 hover:bg-webriq-blue sm:mt-0"
                type="submit"
              >
                {form?.buttonLabel}
              </button>
            )}
          </div>
        </>
      )}
    </WebriQForm>
  );
};

const FormFields = ({
  type,
  items,
  name,
  label,
  isRequired,
  handleFn,
  placeholder,
  variant,
  ...props
}) => {
  if (type === "inputRadio") {
    return (
      <div className="mb-4 text-left">
        <label
          className="m-auto text-left text-xs font-semibold text-gray-500"
          htmlFor={name}
        >
          {label}
        </label>
        <RadioGroup>
          {items?.map((item, index) => (
            <div className="flex items-center">
              <Radio ariaLabel={name} name={name} item={item} />
              <label
                className="mr-4 text-xs font-semibold text-gray-500"
                key={index}
                htmlFor={item}
              >
                {item}
              </label>
            </div>
          ))}
        </RadioGroup>
      </div>
    );
  }

  if (type === "inputSelect") {
    return (
      <div className="mb-4 flex">
        <label
          className="m-auto text-left text-xs font-semibold leading-none text-gray-500"
          htmlFor={name}
        >
          {label}
        </label>
        <Select
          variant={variant}
          ariaLabel={label}
          name={`contact-${name}`}
          isRequired={isRequired}
          className="ml-4"
        >
          {items?.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </Select>
      </div>
    );
  }

  if (type === "inputCheckbox") {
    return (
      <div className="mb-4 text-left">
        <label
          className="m-auto text-left text-xs font-semibold text-gray-500"
          htmlFor={name}
        >
          {label}
        </label>
        <CheckboxGroup variant={variant}>
          {items?.map((item, index) => (
            <div className="flex items-center">
              <Checkbox
                ariaLabel={name}
                className="mr-2"
                name={name}
                value={item}
                type="checkbox"
                onChange={handleFn}
                // checked={checked.some((v) => v === item)}
                // isRequired={isRequired && checked.length === 0 ? true : false}
              />
              <label
                className="mr-4 text-xs font-semibold text-gray-500"
                key={index}
              >
                {item}
              </label>
            </div>
          ))}
        </CheckboxGroup>
      </div>
    );
  }

  if (type === "inputFile") {
    return (
      <div className="mb-4">
        <InputFile
          ariaLabel={name}
          name={name}
          isRequired={isRequired}
          label={label}
          variant={variant}
        />
      </div>
    );
  }

  if (type === "textarea") {
    return (
      <div className="mb-4">
        <Textarea
          isRequired={isRequired}
          ariaLabel={placeholder ?? name}
          className="h-24 w-full resize-none rounded bg-white p-4 text-xs font-semibold leading-none outline-none"
          placeholder={placeholder}
          name={name}
          required={isRequired}
          variant={variant}
        />
      </div>
    );
  }

  const formType = {
    inputText: "text",
    inputEmail: "email",
    inputPassword: "email",
    inputNumber: "number",
  }[type];

  return (
    <div className="mb-4">
      <label className="font-semibold text-gray-500" htmlFor={name}>
        {name}
      </label>
      <Input
        ariaLabel={name}
        required={isRequired}
        name={name}
        placeholder={placeholder}
        type={formType}
        variant={variant}
      />
    </div>
  );
};
