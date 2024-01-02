import React, { HTMLInputTypeAttribute } from "react";
import { cn } from "utils/cn";
import { IFormElements, StyleVariants } from "../types";

type InputProps = {
  /** Display label text */
  label?: string;
  /** A string value that labels an interactive element */
  ariaLabel: string;
  /** Is the input field required?*/
  required?: boolean;
  /** Html name for the input field*/
  name: string;
  /** Classname for the label element */
  labelClass?: string;
  /** Classname for the input element*/
  className?: string;
  placeholder?: string;
  type?: "number" | "password" | "email" | "text";
  variant?: Variant;
  /** Function that runs when an input value change*/
  onChange?: () => void;
  textSize?: "sm" | "nm" | "lg";
};

export type Variant = "primary" | "outline" | "dark";

export const Input = ({
  type = "text",
  ariaLabel,
  labelClass,
  className,
  label,
  variant = "primary",
  required = false,
  name,
  placeholder,
  textSize,
  onChange,
}: InputProps) => {
  const commonStyle = "w-full rounded bg-white px-4 py-2 leading-none";
  const primary = `${commonStyle} outline-none`;
  const outline = `${commonStyle} border border-solid border-webriq-blue`;
  const dark = `${commonStyle} bg-gray-100`;

  const text = {
    sm: "text-xs",
    nm: "text-base",
    lg: "text-lg",
  }[textSize];

  const variants: StyleVariants<Variant> = {
    primary,
    outline,
    dark,
  };

  const variantClass = variants[variant] ?? primary;

  return (
    <>
      <label className={labelClass} htmlFor={name}>
        {label ?? name}
      </label>
      <input
        placeholder={placeholder}
        required={required}
        aria-label={ariaLabel ?? name}
        type={type}
        className={cn(variantClass, text, className)}
        onChange={onChange}
      />
    </>
  );
};
