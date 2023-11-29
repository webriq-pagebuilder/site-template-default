import React from "react";
import { cn } from "utils/cn";
import { IFormElements, StyleVariants } from "../types";

interface Select extends IFormElements {
  defaultValue?: any;
  variant?: Variant;
  children: React.ReactNode;
  label?: string;
  labelClass?: string;
  onChange?: () => any;
}

type Variant = "primary" | "outline";

export const Select = ({
  className,
  variant = "primary",
  isRequired = false,
  name,
  defaultValue,
  children,
  label,
  labelClass,
  onChange,
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
      <label htmlFor={name} className={labelClass}>
        {label ?? name}
      </label>
      <select
        onChange={onChange}
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
