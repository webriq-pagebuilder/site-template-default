import React from "react";
import { cn } from "utils/cn";
import { IFormElements, StyleVariants } from "../types";

interface Select extends IFormElements {
  defaultValue?: any;
  variant?: Variant;
  children: React.ReactNode;
  label?: string;
}

type Variant = "primary" | "outline";

export const Select = ({
  className,
  variant = "primary",
  isRequired = false,
  name,
  key,
  defaultValue,
  children,
  label,
  ...props
}: Select) => {
  const commonStyle =
    "w-full rounded bg-white p-4 text-xs font-semibold leading-none outline-none";
  const primary = `${commonStyle}`;
  const outline = `${commonStyle} border border-solid border-webriq-blue`;

  const variants: StyleVariants<Variant> = {
    primary,
    outline,
  };

  const variantClass = variants[variant] ?? primary;

  return (
    <>
      <label htmlFor={name}>{label}</label>
      <select
        className={cn(variantClass, className)}
        name={name}
        defaultValue={defaultValue}
        required={isRequired}
        {...props}
      >
        {children}
      </select>
    </>
  );
};
