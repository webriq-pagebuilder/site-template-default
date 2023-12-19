import React from "react";
import { cn } from "utils/cn";
import { IFormElements, StyleVariants } from "../types";

export type TextareaProps = {
  className?: string;
  required?: boolean;
  name: string;
  ariaLabel: string;
  placeholder?: string;
  onChange?: () => any;
  labelClass?: string;
  variant?: Variant;
  label?: string;
};

type Variant = "primary" | "outline";
export const Textarea = ({
  className,
  variant = "primary",
  labelClass,
  name,
  label,
  placeholder,
  required = false,
  ariaLabel,
  onChange,
}: TextareaProps) => {
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
        required={required}
      />
    </>
  );
};
