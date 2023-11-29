import React from "react";
import { cn } from "utils/cn";
import { IFormElements, StyleVariants } from "../types";

interface Textarea extends IFormElements {
  placeholder?: string;
  onChange?: () => any;
  labelClass?: string;
  variant?: Variant;
}

type Variant = "primary" | "outline";
export const Textarea = ({
  className,
  variant = "primary",
  required = false,
  labelClass,
  name,
  label,
  key,
  placeholder,
  isRequired,
  ariaLabel,
  onChange,
  ...props
}: Textarea) => {
  const commonStyle =
    "h-24 w-full resize-none rounded bg-white p-4 text-xs font-semibold leading-none";
  const primary = `${commonStyle} outline-none`;
  const outline = `${commonStyle} border border-solid border-webriq-blue`;

  const variants: StyleVariants<Variant> = {
    primary,
    outline,
  };

  const variantClass = variants[variant] ?? primary;
  return (
    <>
      <label htmlFor={name} className={labelClass}>
        {label ?? name}
      </label>
      <textarea
        onChange={onChange}
        aria-label={ariaLabel ?? name}
        className={cn(variantClass, className)}
        placeholder={placeholder}
        name={name}
        required={isRequired}
        {...props}
      />
    </>
  );
};
