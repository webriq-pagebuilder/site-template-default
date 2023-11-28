import React, { HTMLInputTypeAttribute } from "react";
import { cn } from "utils/cn";
import { IFormElements } from "../types";

interface Input extends IFormElements {
  placeholder?: string;
  type: "number" | "password" | "email" | "text";
  variant?: Variant;
}

type Variant = "primary" | "outline";

export const Input = ({
  type = "text",
  ariaLabel,
  className,
  variant = "primary",
  isRequired = false,
  name,
  ...props
}: Input) => {
  const commonStyle =
    "w-full rounded bg-white p-4 text-xs font-semibold leading-none";
  const primary = `${commonStyle} outline-none`;
  const outline = `${commonStyle} border border-solid border-webriq-blue`;

  const variants: StyleVariants<Variant> = {
    primary,
    outline,
  };

  const variantClass = variants[variant] ?? primary;

  return (
    <input
      required={isRequired}
      aria-label={ariaLabel ?? name}
      type={type}
      className={cn(variantClass, className)}
      {...props}
    />
  );
};
