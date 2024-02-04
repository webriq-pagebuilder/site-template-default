import { extractLink } from "helper";
import Link from "next/link";
import React from "react";
import { FaSpinner } from "react-icons/fa";
import { LabeledRoute } from "types";
import { cn } from "utils/cn";
import { StyleVariants } from "../types";

type Variant = "outline" | "ghost" | "link" | "custom" | "solid";
type TextSize = "sm" | "md" | "lg";
type RadiusSize = "sm" | "md" | "lg" | "xl" | "2xl" | "none";
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
  /** Set button to link component */
  asLink?: boolean;
  /** Link data pass to the button */
  link?: LabeledRoute;
  size?: TextSize;
  borderRadius?: RadiusSize;
  [key: string]: any;
};

export function Button({
  variant = "solid",
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
  size = "md",
  borderRadius,
  ...props
}: ButtonProps) {
  const sizes = {
    sm: "py-2 px-4 text-sm",
    md: "py-3 px-6 text-base",
    lg: "py-4 px-7 text-lg",
  };

  const borderRadiusMap = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
  };

  const buttonRadius = borderRadiusMap[borderRadius];
  const buttonSize = sizes[size] || sizes["md"];

  const commonStyles =
    "inline-block rounded-l-xl rounded-t-xl font-bold transition duration-200";
  const solid = `${commonStyles} ${buttonSize} ${buttonRadius} bg-brand-primary hover:bg-brand-primary-foreground text-gray-50`;
  const custom = `inline-block bg-primary hover:bg-primary-foreground ${buttonSize} ${
    buttonRadius || "rounded-md"
  } text-gray-50 font-bold transition duration-200`;
  const outline = `${commonStyles} ${buttonSize} ${buttonRadius} bg-white hover:bg-brand-primary-foreground/20 border text-brand-primary border-brand-primary`;
  const ghost = `${commonStyles}  ${buttonRadius} ${buttonSize} bg-transparent hover:bg-brand-primary-foreground/20 text-brand-primary`;
  const link = `transition-200 text-brand-primary hover:text-brand-primary-foreground underline  ${buttonRadius} ${cn(
    buttonSize,
    "px-0 py-0"
  )} `;
  const variants: StyleVariants<Variant> = {
    outline,
    ghost,
    link,
    custom,
    solid,
  };

  const variantClass = variants[variant] ?? solid;

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
