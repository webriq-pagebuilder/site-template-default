import React from "react";
import { cn } from "utils/cn";
import { StyleVariants } from "../types";

interface CheckboxGroup {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
  name: string;
  label?: string;
}

type Variant = "primary" | "inline";

export const CheckboxGroup = ({
  children,
  variant = "primary",
  className,
  name,
  label,
}: CheckboxGroup) => {
  const commonClass = "ml-2";
  const primary = `${commonClass} block`;
  const inline = `${commonClass} flex`;

  const variants: StyleVariants<Variant> = {
    primary,
    inline,
  };

  const variantClass = variants[variant] ?? primary;
  return (
    <div>
      <label htmlFor={name}>{label}</label>
      <div className={cn(variantClass, className)}>{children}</div>
    </div>
  );
};
