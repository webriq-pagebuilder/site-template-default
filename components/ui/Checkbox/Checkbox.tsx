import React from "react";
import { cn } from "utils/cn";
import { IFormElements, StyleVariants } from "../types";

interface ICheckbox extends IFormElements {
  label?: string;
  labelClass?: string;
  className?: string;
  variant?: Variant;
}
type Variant = "primary";

export const Checkbox = ({
  variant = "primary",
  required = false,
  name,
  label,
  value,
  isRequired,
  labelClass,
  className,
  ariaLabel,
  ...props
}: ICheckbox) => {
  const commonStyle = "";
  const primary = `${commonStyle}`;

  const variants: StyleVariants<Variant> = {
    primary,
  };

  const variantClass = variants[variant] ?? primary;

  return (
    <div className="flex gap-2 items-center">
      <input
        aria-label={ariaLabel ?? name}
        className={cn(variantClass, className)}
        name={name}
        type="checkbox"
        value={value}
        required={isRequired}
        {...props}
      />
      <label className={labelClass} htmlFor={name} id={name}>
        {label ?? value}
      </label>
    </div>
  );
};
