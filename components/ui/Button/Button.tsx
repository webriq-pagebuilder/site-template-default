import React from "react";
import { cn } from "utils/cn";

type Variant = "outline" | "primary" | "secondary";
interface IButton {
  className?: string;
  variant?: Variant;
  ariaLabel: string; // required for A11Y
  children: React.ReactNode;
  [key: string]: any;
}

export const Button = ({
  variant = "primary",
  className,
  ariaLabel,
  children,
  ...props
}: IButton) => {
  const commonStyles =
    "inline-block py-2 px-6 rounded-l-xl rounded-t-xl font-bold leading-loose transition duration-200";
  const primary = `${commonStyles} bg-webriq-darkblue hover:bg-webriq-blue text-gray-50  outline-none `;
  const outline = `${commonStyles} bg-white hover:bg-slate-100  font-bold outline text-webriq-blue outline-webriq-blue `;
  const secondary = `${commonStyles} bg-webriq-babyblue hover:bg-webriq-darkblue font-bold  text-gray-50`;

  const variants: Record<Variant, string> = {
    primary,
    secondary,
    outline,
  };

  const variantClass = variants[variant] ?? primary;

  return (
    <button
      className={cn(variantClass, className)}
      aria-label={ariaLabel}
      {...props}
    >
      {children}
    </button>
  );
};
