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
import { Variant as InputVariant } from "../Input/Input";
import { Variant as CheckboxVariant } from "../CheckboxGroup/CheckboxGroup";

type FormFieldProps = {
  type?: FormTypes;
  items?: string[];
  variant?: Variant;
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  textSize?: "sm" | "nm" | "lg";
  inputVariant?: InputVariant;
  checkboxVariant?: CheckboxVariant;
};

type Variant = "stacked" | "inline";

export const FormField = ({
  type = "inputText",
  items,
  name,
  variant = "stacked",
  label,
  required,
  placeholder,
  className,
  textSize,
  inputVariant,
  checkboxVariant,
}: FormFieldProps) => {
  const commonClass = "flex";
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
        inputVariant={inputVariant}
        type={type}
        items={items}
        name={name}
        placeholder={placeholder}
        label={label}
        required={required}
        textSize={textSize}
        checkboxVariant={checkboxVariant}
      />
    </div>
  );
};

const RenderInput = ({
  type,
  items,
  name,
  label,
  required,
  placeholder,
  textSize,
  inputVariant,
  checkboxVariant,
}: FormFieldProps) => {
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
            <Radio key={item} ariaLabel={name} name={name} item={item} />
          ))}
        </RadioGroup>
      );

    case "inputSelect":
      return (
        <Select
          items={items}
          label={label}
          ariaLabel={label}
          name={name}
          required={required}
        />
      );

    case "inputCheckbox":
      return (
        <CheckboxGroup variant={checkboxVariant} name={name} label={label}>
          {items?.map((item, index) => (
            <Checkbox
              key={item}
              label={item}
              ariaLabel={name}
              name={name}
              item={item}
            />
          ))}
        </CheckboxGroup>
      );

    case "inputFile":
      return <InputFile ariaLabel={name} name={name} required={required} />;

    case "textarea":
      return (
        <Textarea
          ariaLabel={placeholder ?? name}
          className="w-full h-24 p-4 text-xs font-semibold leading-none bg-white rounded outline-none resize-none"
          placeholder={placeholder}
          name={name}
          required={required}
          label={label}
        />
      );

    default:
      return (
        <Input
          textSize={textSize}
          label={label || name}
          ariaLabel={name}
          required={required}
          name={name}
          placeholder={placeholder}
          type={formType}
          variant={inputVariant}
        />
      );
  }
};
