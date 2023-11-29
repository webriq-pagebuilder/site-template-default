import React from "react";
import { cn } from "utils/cn";
import { IFormElements, StyleVariants } from "../types";

interface IRadio extends IFormElements {
  item: any;
  variant?: Variant;
  label?: string;
  labelClass?: string;
  onChange?: () => any;
}

type Variant = "primary" | "outline";

export const Radio = ({
  className,
  variant = "primary",
  name,
  item,
  ariaLabel,
  label,
  labelClass,
  onChange,
  ...props
}: IRadio) => {
  const commonStyle = "";
  const primary = `${commonStyle}`;
  const outline = `${commonStyle} border border-solid border-webriq-blue`;

  const variants: StyleVariants<Variant> = {
    primary,
    outline,
  };

  const variantClass = variants[variant] ?? primary;

  return (
    <div className="flex items-center gap-2">
      <input
        onChange={onChange}
        className={cn(variantClass, className)}
        name={name}
        value={item}
        type="radio"
        aria-label={ariaLabel ?? name}
        {...props}
      />
      <label htmlFor={name} className={labelClass}>
        {label ?? item}
      </label>
    </div>
  );
};
