import React from "react";
import { ButtonProps } from "types/ui/Button";
import { cn } from "utils/cn";

/**
 * Primary UI component for user interaction
 */
export const Button = ({
  variant = "default",
  size = "medium",
  backgroundColor,
  label,
  className,
  ...props
}: ButtonProps) => {
  const primaryClass =
    "hidden lg:inline-block lg:ml-auto lg:mr-3 py-2 px-6 bg-gray-50 hover:bg-gray-100 text-sm text-gray-900 font-bold rounded-l-xl rounded-t-xl transition duration-200";
  const variantClass = {
    primary: primaryClass,
    secondary:
      "hidden lg:inline-block py-2 px-6 bg-${template.color}-darkblue hover:bg-${template.color}-blue text-sm text-white font-bold rounded-l-xl rounded-t-xl transition duration-200",
    default: primaryClass,
  }[variant];

  return (
    <button type="button" className={cn(variantClass, className)} {...props}>
      {label}
    </button>
  );
};
