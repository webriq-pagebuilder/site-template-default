import React from "react";
import { cn } from "utils/cn";
import { FaSpinner } from "react-icons/fa";
import { StyleVariants } from "../types";
import { LabeledRoute, LabeledRouteWithKey } from "types";
import Link from "next/link";

type Variant = "outline" | "primary" | "secondary" | "borderless" | "tertiary";
export type ButtonProps = {
  /** Defines the classname of the button. */
  className?: string;
  variant?: Variant;
  /** String value that labels the interactive element e.g. "Submit" */
  ariaLabel: string;
  /** Defines the content inside the button. */
  children: React.ReactNode;
  /** Sets the button in a loading state. */
  loading?: boolean;
  /** Sets the button in a disabled state. */
  disabled?: boolean;
  /** Custom loading component. */
  loadingComponent?: React.ReactNode;
  /** Function that runs when the button is clicked. */
  onClick?: () => void;
  /** Set button type. Defaults to button */
  type?: "button" | "submit";
  [key: string]: any;
};

export function Button({
  variant = "primary",
  className,
  ariaLabel,
  children,
  loading,
  disabled,
  loadingComponent,
  onClick,
  type = "button",
  ...props
}: ButtonProps) {
  const commonStyles =
    "inline-block py-2 px-6 rounded-l-xl rounded-t-xl font-bold  transition duration-200";
  const primary = `${commonStyles} bg-primary hover:bg-primary-foreground text-gray-50  outline-none `;
  const outline = `${commonStyles} bg-white hover:bg-slate-100  font-bold border text-webriq-blue border-webriq-blue `;
  const secondary = `${commonStyles} bg-secondary hover:bg-secondary-foreground font-bold  text-gray-50`;
  const borderless = `${commonStyles} bg-transparent hover:bg-slate-100 border-0`;
  const tertiary = `${commonStyles} rounded bg-webriq-darkblue hover:bg-webriq-blue text-gray-50  outline-none`;
  const variants: StyleVariants<Variant> = {
    primary,
    secondary,
    outline,
    borderless,
    tertiary,
  };

  const variantClass = variants[variant] ?? primary;
  const Loader = loadingComponent ?? (
    <FaSpinner className="animate-spin" size={30} />
  );

  return (
    <button
      onClick={onClick}
      disabled={disabled ?? loading}
      className={cn(variantClass, className)}
      aria-label={ariaLabel}
      type={type}
      {...props}
    >
      {loading ? Loader : children}
    </button>
  );
}
