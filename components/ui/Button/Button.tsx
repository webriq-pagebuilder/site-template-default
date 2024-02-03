import React from "react";
import { cn } from "utils/cn";
import { FaSpinner } from "react-icons/fa";
import { StyleVariants } from "../types";
import { LabeledRoute, LabeledRouteWithKey } from "types";
import Link from "next/link";
import { extractLink } from "helper";

type Variant =
  | "outline"
  | "primary"
  | "secondary"
  | "borderless"
  | "tertiary"
  | "link";
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
  onClick?: (...args: any) => any;
  /** Set button type. Defaults to button */
  type?: "button" | "submit";
  asLink?: boolean;
  link?: LabeledRoute;
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
  link: linkObject,
  asLink = false,
  ...props
}: ButtonProps) {
  const commonStyles =
    "inline-block py-2 px-6 rounded-l-xl rounded-t-xl font-bold  transition duration-200";
  const primary = `${commonStyles} bg-brand-primary hover:bg-brand-primary-foreground text-gray-50  outline-none `;
  const outline = `${commonStyles} bg-white hover:bg-slate-100 font-bold border text-brand-primary-foreground border-brand-primary-foreground `;
  const secondary = `${commonStyles} bg-brand-secondary hover:bg-brand-secondary-foreground font-bold  text-gray-50`;
  const borderless = `${commonStyles} bg-transparent hover:bg-slate-100 border-0`;
  const tertiary = `${commonStyles} rounded bg-brand-primary hover:bg-brand-primary-foreground text-gray-50  outline-none`;
  const link = `transition-200 text-sm text-brand-primary hover:text-brand-primary-foreground`;
  const variants: StyleVariants<Variant> = {
    primary,
    secondary,
    outline,
    borderless,
    tertiary,
    link,
  };

  const variantClass = variants[variant] ?? primary;
  const Loader = loadingComponent ?? (
    <FaSpinner className="animate-spin" size={30} />
  );

  if (asLink) {
    return (
      <Link
        className={cn(variantClass, className)}
        aria-label={ariaLabel}
        href={extractLink(linkObject)}
        {...props}
      >
        {children}
      </Link>
    );
  }

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
