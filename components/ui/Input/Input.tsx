import React, { HTMLInputTypeAttribute } from "react";
import { cn } from "utils/cn";
import { IFormElements, StyleVariants } from "../types";

type InputProps = {
  /** Determines if the label should be displayed */
  noLabel?: boolean;
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
  textSize?: "sm" | "md" | "lg";
  [key: string]: any;
};

export type Variant = "primary" | "outline" | "secondary";

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
  noLabel,
  ...props
}: InputProps) => {
  const commonStyle = "w-full rounded bg-white px-4 py-2 leading-loose";
  const primary = `${commonStyle}`;
  const secondary = `${commonStyle} bg-gray-100 p-4 text-xs outline-none`;
  const outline = `${commonStyle}  text-xs py-3 border border-slate-300`;

  const text = {
    sm: "text-xs",
    md: "text-base",
    lg: "text-lg",
  }[textSize];

  const variants: StyleVariants<Variant> = {
    primary,
    secondary,
    outline,
  };

  const variantClass = variants[variant] ?? primary;

  return (
    <>
      {!noLabel && (
        <label className={labelClass} htmlFor={name}>
          {label || name}
        </label>
      )}
      <input
        name={name}
        id={name}
        placeholder={placeholder}
        required={required}
        aria-label={ariaLabel || name}
        type={type}
        className={cn(variantClass, text, className)}
        onChange={onChange}
        {...props}
      />
    </>
  );
};
