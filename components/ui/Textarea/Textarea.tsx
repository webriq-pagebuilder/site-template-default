import React from "react";
import { cn } from "utils/cn";
import { IFormElements, StyleVariants } from "../types";

export type TextareaProps = {
  className?: string;
  required?: boolean;
  name: string;
  ariaLabel: string;
  placeholder?: string;
  onChange?: (...args: any) => any;
  labelClass?: string;
  variant?: Variant;
  label?: string;
  noLabel?: boolean;
  [key: string]: any;
};

type Variant = "primary" | "outline" | "secondary";
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
  noLabel = false,
  ...props
}: TextareaProps) => {
  const commonStyle =
    "h-24 w-full resize rounded bg-white p-4 text-xs leading-none";
  const primary = `${commonStyle}`;
  const secondary = `${commonStyle} bg-gray-100 p-4 text-xs outline-none`;
  const outline = `${commonStyle} text-xs py-3 border border-slate-300`;

  const variants: StyleVariants<Variant> = {
    primary,
    outline,
    secondary,
  };

  const variantClass = variants[variant] ?? primary;
  return (
    <>
      {!noLabel && (
        <label htmlFor={name} className={labelClass}>
          {label || name}
        </label>
      )}
      <textarea
        onChange={onChange}
        aria-label={ariaLabel || name}
        className={cn(variantClass, className)}
        placeholder={placeholder}
        name={name}
        required={required}
        id={name}
        {...props}
      />
    </>
  );
};
