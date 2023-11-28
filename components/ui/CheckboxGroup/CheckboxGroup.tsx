import React from "react";
import { cn } from "utils/cn";

interface CheckboxGroup {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

type Variant = "primary" | "inline";

export const CheckboxGroup = ({
  children,
  variant = "primary",
  className,
}: CheckboxGroup) => {
  const commonClass = "";
  const primary = `${commonClass} ml-4 block`;
  const inline = `${commonClass} flex`;

  const variants: StyleVariants<Variant> = {
    primary,
    inline,
  };

  const variantClass = variants[variant] ?? primary;

  return <div className={cn(variantClass, className)}>{children}</div>;
};
