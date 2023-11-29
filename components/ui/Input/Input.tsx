import React, { HTMLInputTypeAttribute } from "react";
import { cn } from "utils/cn";
import { IFormElements, StyleVariants } from "../types";

interface Input extends IFormElements {
  label: string;
  labelClass?: string;
  className?: string;
  placeholder?: string;
  type: "number" | "password" | "email" | "text";
  variant?: Variant;
  onChange?: () => any;
}

type Variant = "primary" | "outline";

export const Input = ({
  type = "text",
  ariaLabel,
  labelClass,
  className,
  label,
  variant = "primary",
  isRequired = false,
  name,
  onChange,
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
    <>
      <label className={labelClass} htmlFor={name}>
        {label ?? name}
      </label>
      <input
        required={isRequired}
        aria-label={ariaLabel ?? name}
        type={type}
        className={cn(variantClass, className)}
        onChange={onChange}
        {...props}
      />
    </>
  );
};
