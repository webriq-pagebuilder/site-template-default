import { FormTypes } from "types";
import { Checkbox } from "../Checkbox";
import { CheckboxGroup } from "../CheckboxGroup";
import { InputFile } from "../File";
import { Input } from "../Input";
import { Radio } from "../Radio";
import { RadioGroup } from "../RadioGroup";
import { Select } from "../Select";
import { Textarea } from "../Textarea";

type FormFieldProps = {
  type?: FormTypes;
  items?: string[];
  variant?: Variant;
  name: string;
  label?: string;
  required?: boolean;
  placeholder?: string;
  className?: string;
  textSize?: "sm" | "md" | "lg";
  noLabel?: boolean;
  [key: string]: any;
};

type Variant = "primary" | "secondary" | "outline";

export const FormField = ({
  type,
  items,
  name,
  label,
  required,
  placeholder,
  textSize,
  noLabel,
  variant,
  ...props
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
        <RadioGroup noLabel={noLabel} label={label} name={name}>
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
          items={items}
          label={label}
          ariaLabel={label}
          name={name}
          required={required}
          noLabel={noLabel}
          {...props}
        />
      );

    case "inputCheckbox":
      return (
        <CheckboxGroup noLabel={noLabel} name={name} label={label}>
          {items?.map((item, index) => (
            <Checkbox
              key={item}
              label={item}
              ariaLabel={name}
              name={name}
              item={item}
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
          required={required}
          {...props}
        />
      );

    case "textarea":
      return (
        <Textarea
          noLabel={noLabel}
          ariaLabel={placeholder ?? name}
          placeholder={placeholder}
          name={name}
          variant={variant}
          required={required}
          label={label}
          {...props}
        />
      );

    default:
      return (
        <Input
          noLabel={noLabel}
          textSize={textSize}
          label={label || name}
          ariaLabel={name}
          required={required}
          name={name}
          placeholder={placeholder}
          type={formType}
          variant={variant}
          {...props}
        />
      );
  }
};
