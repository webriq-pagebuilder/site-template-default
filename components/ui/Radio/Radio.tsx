import React from "react";
import { cn } from "utils/cn";
import { IFormElements } from "../types";

interface IRadio extends IFormElements {
  item: any;
  variant?: Variant;
}

type Variant = "primary" | "outline";

export const Radio = ({
  type = "text",
  className,
  variant = "primary",
  name,
  item,
  ariaLabel,
  ...props
}: IRadio) => {
  const commonStyle = "mr-2";
  const primary = `${commonStyle}`;
  const outline = `${commonStyle} border border-solid border-webriq-blue`;

  const variants: StyleVariants<Variant> = {
    primary,
    outline,
  };

  const variantClass = variants[variant] ?? primary;

  return (
    <input
      className={cn(variantClass, className)}
      name={name}
      value={item}
      type="radio"
      aria-label={ariaLabel ?? name}
      {...props}
    />
  );
};
