import React from "react";
import { cn } from "utils/cn";

interface RadioGroup {
  children: React.ReactNode;
  variant?: Variant;
  className?: string;
}

type Variant = "primary" | "inline";

export const RadioGroup = ({
  children,
  variant = "primary",
  className,
}: RadioGroup) => {
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
