import React from "react";
import { cn } from "utils/cn";
import { IFormElements } from "../types";

interface ICheckbox extends IFormElements {
  variant?: Variant;
}
type Variant = "primary";

export const Checkbox = ({
  className,
  variant = "primary",
  required = false,
  name,
  isRequired,
  ariaLabel,
  ...props
}: ICheckbox) => {
  const commonStyle = "mr-2";
  const primary = `${commonStyle}`;

  const variants: StyleVariants<Variant> = {
    primary,
  };

  const variantClass = variants[variant] ?? primary;

  return (
    <input
      aria-label={ariaLabel ?? name}
      className={cn(variantClass, className)}
      name={name}
      type="checkbox"
      required={isRequired}
      {...props}
    />
  );
};
