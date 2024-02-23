import React from "react";
import { cn } from "utils/cn";
import { IFormElements, StyleVariants } from "../types";

type CheckboxProps = {
  /** Is this required?  */
  required?: boolean;
  /** Name attribute for the checkbox element */
  name: string;
  /** String value that labels an interactive element */
  ariaLabel: string;
  /** Label for the checkbox element; defaults to the value */
  label?: string;
  /** Classname for the LABEL element */
  labelClass?: string;
  /** Classname for the INPUT element */
  className?: string;
  variant?: Variant;
  /** Function that runs when the checkbox changes */
  onChange?: () => void;
  /** String value for the checkbox element */
  item: string;
  [key: string]: any;
};
export type Variant = "primary";

export const Checkbox = ({
  item,
  variant = "primary",
  required = false,
  name,
  label,
  labelClass,
  className,
  ariaLabel,
  onChange,
  ...props
}: CheckboxProps) => {
  const commonStyle = "";
  const primary = `${commonStyle}`;

  const variants: StyleVariants<Variant> = {
    primary,
  };

  const variantClass = variants[variant] ?? primary;
  const defaultLabelClass = "flex gap-2 items-center";
  return (
    <label htmlFor={item} className={cn(defaultLabelClass, labelClass)}>
      <input
        aria-label={ariaLabel || name}
        className={cn(variantClass, className)}
        name={name}
        type="checkbox"
        value={item}
        required={required}
        onChange={onChange}
        id={item}
        {...props}
      />
      {label || item}
    </label>
  );
};
