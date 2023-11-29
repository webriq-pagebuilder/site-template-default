import React from "react";
import { cn } from "utils/cn";
import { StyleVariants } from "../types";

interface RadioGroup {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  label?: string;
  name: string;
  labelClass?: string;
  [key: string]: any;
}

type Variant = "primary" | "inline";

export const RadioGroup = ({
  children,
  variant = "primary",
  name,
  className,
  labelClass,
  label,
}: RadioGroup) => {
  const commonClass = "ml-2";
  const primary = `${commonClass}`;
  const inline = `${commonClass} flex items-center`;

  const variants: StyleVariants<Variant> = {
    primary,
    inline,
  };

  const variantClass = variants[variant] ?? primary;
  return (
    <div>
      <label htmlFor={name} className={labelClass}>
        {label ?? name}
      </label>
      <div className={cn(variantClass, className)}>{children}</div>
    </div>
  );
};
