import React from "react";
import { cn } from "utils/cn";
import { FaSpinner } from "react-icons/fa";

type Variant = "outline" | "primary" | "secondary" | "borderless";
interface IButton {
  className?: string;
  variant?: Variant;
  ariaLabel: string; // required for A11Y
  children: React.ReactNode;
  loading?: boolean;
  disabled?: boolean;
  loadingComponent?: React.ReactNode;
  onClick?: () => any;
  [key: string]: any;
}

export const Button = ({
  variant = "primary",
  className,
  ariaLabel,
  children,
  loading,
  disabled,
  loadingComponent,
  onClick,
  ...props
}: IButton) => {
  const commonStyles =
    "inline-block py-2 px-6 rounded-l-xl rounded-t-xl font-bold leading-loose transition duration-200";
  const primary = `${commonStyles} bg-webriq-darkblue hover:bg-webriq-blue text-gray-50  outline-none `;
  const outline = `${commonStyles} bg-white hover:bg-slate-100  font-bold outline text-webriq-blue outline-webriq-blue `;
  const secondary = `${commonStyles} bg-webriq-babyblue hover:bg-webriq-darkblue font-bold  text-gray-50`;
  const borderless = `${commonStyles} bg-transparent hover:bg-slate-100 border-0`;

  const variants: StyleVariants<Variant> = {
    primary,
    secondary,
    outline,
    borderless,
  };

  const variantClass = variants[variant] ?? primary;

  return (
    <button
      disabled={disabled ?? loading}
      className={cn(variantClass, className)}
      aria-label={ariaLabel}
      {...props}
    >
      {loading ? (
        loadingComponent ? (
          loadingComponent
        ) : (
          <FaSpinner className="animate-spin" size={30} />
        )
      ) : (
        children
      )}
    </button>
  );
};
