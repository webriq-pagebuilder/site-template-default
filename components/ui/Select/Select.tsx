import React from "react";
import { cn } from "utils/cn";
import { StyleVariants } from "../types";

type SelectProps = {
  /** Default value for the select element */
  defaultValue?: string;
  variant?: Variant;
  /** Label for the element. Defaults to name */
  label?: string;
  /** Classname for the label element */
  labelClass?: string;
  /** Function that runs when the value changes */
  onChange?: () => void;
  className?: string;
  required?: boolean;
  /** Name of the select element */
  name: string;
  /** A list of string as options */
  items: string[];
  ariaLabel: string;
  noLabel?: boolean;
  [key: string]: any;
};

type Variant = "primary" | "outline";

export const Select = ({
  className,
  variant = "primary",
  required = false,
  name,
  defaultValue,
  label,
  labelClass,
  items,
  onChange,
  noLabel = false,
  ...props
}: SelectProps) => {
  const commonStyle =
    "w-full rounded bg-white p-4 text-xs font-semibold leading-none outline-none";
  const primary = `${commonStyle}`;
  const outline = `${commonStyle} border border-solid border-primary-foreground`;

  const variants: StyleVariants<Variant> = {
    primary,
    outline,
  };

  const variantClass = variants[variant] ?? primary;
  return (
    <>
      {!noLabel && (
        <label htmlFor={name} className={labelClass}>
          {label || name}
        </label>
      )}
      <select
        onChange={onChange}
        className={cn(variantClass, className)}
        name={name}
        defaultValue={defaultValue}
        required={required}
        {...props}
      >
        {items &&
          items.length > 0 &&
          items.map((opt) => {
            return (
              <option value={opt} key={opt}>
                {opt}
              </option>
            );
          })}
      </select>
    </>
  );
};
