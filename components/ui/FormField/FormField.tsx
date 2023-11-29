import { FormTypes } from "types";
import { Checkbox } from "../Checkbox";
import { CheckboxGroup } from "../CheckboxGroup";
import { InputFile } from "../File";
import { Input } from "../Input";
import { Radio } from "../Radio";
import { RadioGroup } from "../RadioGroup";
import { Select } from "../Select";
import { Textarea } from "../Textarea";
import { StyleVariants } from "../types";
import { cn } from "utils/cn";

interface IFormField {
  type: FormTypes;
  items?: any;
  variant?: Variant;
  name: string;
  label?: string;
  isRequired?: boolean;
  placeholder?: string;
  className?: string;
  [key: string]: any;
}

type Variant = "stacked" | "inline";

export const FormField = ({
  type,
  items,
  name,
  variant = "stacked",
  label,
  isRequired,
  placeholder,
  className,
  ...props
}: IFormField) => {
  const commonClass = "mb-4 flex gap-2";
  const stacked = `${commonClass} flex-col`;
  const inline = `${commonClass} items-center`;

  const variants: StyleVariants<Variant> = {
    stacked,
    inline,
  };

  const variantClass = variants[variant] ?? stacked;

  return (
    <div className={cn(variantClass, className)}>
      <RenderInput
        type={type}
        items={items}
        name={name}
        placeholder={placeholder}
        label={label}
        isRequired={isRequired}
        {...props}
      />
    </div>
  );
};

const RenderInput = ({
  type,
  items,
  name,
  label,
  isRequired,
  placeholder,
  ...props
}: {
  type: FormTypes;
  [key: string]: any;
}) => {
  const formType = {
    inputText: "text",
    inputEmail: "email",
    inputPassword: "password",
    inputNumber: "number",
  }[type];

  switch (type) {
    case "inputRadio":
      return (
        <RadioGroup label={label} name={name}>
          {items?.map((item, index) => (
            <Radio
              key={item}
              ariaLabel={name}
              name={name}
              item={item}
              {...props}
            />
          ))}
        </RadioGroup>
      );

    case "inputSelect":
      return (
        <Select
          label={label}
          ariaLabel={label}
          name={name}
          isRequired={isRequired}
          {...props}
        >
          {items?.map((item, index) => (
            <option key={index} value={item}>
              {item}
            </option>
          ))}
        </Select>
      );

    case "inputCheckbox":
      return (
        <CheckboxGroup name={name} label={label}>
          {items?.map((item, index) => (
            <Checkbox
              key={item}
              label={item}
              ariaLabel={name}
              name={name}
              value={item}
              type="checkbox"
              {...props}
            />
          ))}
        </CheckboxGroup>
      );

    case "inputFile":
      return (
        <InputFile
          ariaLabel={name}
          name={name}
          isRequired={isRequired}
          label={label}
          {...props}
        />
      );

    case "textarea":
      return (
        <Textarea
          isRequired={isRequired}
          ariaLabel={placeholder ?? name}
          className="h-24 w-full resize-none rounded bg-white p-4 text-xs font-semibold leading-none outline-none"
          placeholder={placeholder}
          name={name}
          required={isRequired}
          {...props}
        />
      );

    default:
      return (
        <Input
          label={name}
          ariaLabel={name}
          required={isRequired}
          name={name}
          placeholder={placeholder}
          type={formType}
          {...props}
        />
      );
  }
};
