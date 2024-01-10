import React from "react";
import { cn } from "utils/cn";
import { StyleVariants } from "../types";

type CheckboxGroupProps = {
  children: React.ReactNode;
  variant?: Variant;
  /** Applies the class to the elements that wraps the checkboxes */
  className?: string;
  name: string;
  /** Label for the checkboxes. Defaults to the name property */
  label?: string;
  noLabel?: boolean;
  labelClass?: string;
  [key: string]: any;
};

export type Variant = "primary" | "inline";

export const CheckboxGroup = ({
  children,
  variant = "primary",
  className,
  name,
  label,
  noLabel = false,
  labelClass,
  ...props
}: CheckboxGroupProps) => {
  const commonClass = "ml-2";
  const primary = `${commonClass} block`;
  const inline = `${commonClass} flex gap-4`;

  const variants: StyleVariants<Variant> = {
    primary,
    inline,
  };

  const variantClass = variants[variant] ?? primary;
  return (
    <div>
      {!noLabel && <p className={labelClass}>{label || name}</p>}
      <div className={cn(variantClass, className)} {...props}>
        {children}
      </div>
    </div>
  );
};
