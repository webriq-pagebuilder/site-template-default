import { extractLink } from "helper";
import Link from "next/link";
import React from "react";
import { FaSpinner } from "react-icons/fa";
import { LabeledRoute } from "types";
import { cn } from "utils/cn";
import { StyleVariants } from "../types";

type Variant =
  | "outline"
  | "ghost"
  | "link"
  | "custom"
  | "solid"
  | "addToWishlist"
  | "unstyled"
  | "swiper_pagination"
  | "tab";
type TextSize = "xs" | "sm" | "md" | "lg";
type RadiusSize = "sm" | "md" | "lg" | "xl" | "2xl" | "none";

interface BaseType {
  /** Defines the classname of the button. */
  className?: string;
  variant?: Variant;
  /** String value that labels the interactive element e.g. "Submit" */
  ariaLabel: string;
  /** Defines the content inside the button. */
  children?: React.ReactNode;
  /** Set button to link component */
  size?: TextSize;
  borderRadius?: RadiusSize;
  [key: string]: any;
}

interface Link extends BaseType {
  /** Link data pass to the button */
  link: LabeledRoute;
  as?: "link";
}

interface Button extends BaseType {
  as: "button";
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
  isActive?: any;
}

type ButtonProps = Button | Link;

export function Button(props: ButtonProps) {
  const sizes = {
    xs: "py-1 px-3 text-xs",
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

  const {
    borderRadius,
    size,
    variant,
    ariaLabel,
    className,
    children,
    isActive,
  } = props;

  const buttonRadius = borderRadiusMap[borderRadius];
  const buttonSize = sizes[size] || sizes["md"];

  const commonStyles =
    "inline-block rounded-l-xl rounded-t-xl font-bold transition duration-200";
  const solid = `${commonStyles} ${buttonSize} ${buttonRadius} bg-primary hover:bg-primary-foreground text-gray-50`;
  const custom = `inline-block bg-primary hover:bg-primary-foreground ${buttonSize} ${
    buttonRadius || "rounded-md"
  } text-gray-50 font-bold transition duration-200`;
  const outline = `${commonStyles} ${buttonSize} ${buttonRadius} bg-white hover:bg-primary-foreground/20 outline outline-1 text-primary outline-primary`;
  const ghost = `${commonStyles}  ${buttonRadius} ${buttonSize} bg-transparent hover:bg-primary-foreground/20 text-primary`;
  const link = `transition-200 text-primary hover:text-primary-foreground underline  ${buttonRadius} ${cn(
    buttonSize,
    "px-0 py-0"
  )} `;
  const unstyled = ``;
  const swiper_pagination = `mr-1 ${
    isActive ? "bg-primary" : "bg-gray-200"
  } rounded-full p-1 focus:outline-none`;
  const tab = `mx-auto mb-1 w-auto px-4 py-2 rounded duration-200 transition focus:outline-none font-bold ${
    isActive
      ? " bg-gray-50 text-primary shadow "
      : "  text-gray-700  hover:bg-secondary-foreground hover:text-primary-foreground hover:shadow"
  }`;
  const addToWishlist = ` ${commonStyles} ${buttonRadius} ${buttonSize} classNames="ml-auto sm:ml-0 flex-shrink-0 inline-flex items-center justify-center w-full  rounded-md border hover:border-primary`;

  const variants: StyleVariants<Variant> = {
    outline,
    ghost,
    link,
    custom,
    solid,
    addToWishlist,
    unstyled,
    swiper_pagination,
    tab,
  };

  const variantClass = variants[variant] ?? solid;

  if (props.as === "link") {
    const { link, ...rest } = props;

    return (
      <a
        className={cn(variantClass, className)}
        aria-label={ariaLabel}
        href={extractLink(link)}
        target={link?.linkTarget}
        rel={link?.linkTarget === "_blank" ? "noopener noreferrer" : ""}
        {...rest}
      >
        {children}
      </a>
    );
  }

  const { loadingComponent, onClick, loading, disabled, type } = props;
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
    >
      {loading ? Loader : children}
    </button>
  );
}
