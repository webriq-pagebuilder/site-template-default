import Link from "next/link";
import React from "react";
import { LabeledRoute, LabeledRouteWithKey } from "types";
import { cn } from "utils/cn";

type Link = LabeledRoute | LabeledRouteWithKey;
type Variant = "outline" | "primary" | "secondary";

interface IConditionalLink {
  className?: string;
  variant?: Variant;
  ariaLabel: string;
  children: React.ReactNode;
  link: Link;
  target?: "_self" | "_blank";
}

export const ConditionalLink = ({
  variant = "primary",
  className,
  ariaLabel,
  children,
  link,
  target,
  ...props
}: IConditionalLink) => {
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

  const commonProps = {
    className: cn(variantClass, className),
    ariaLabel,
    target,
  };

  //not found page
  if (!link?.internalLink && !link?.externalLink) {
    return (
      <a {...commonProps} {...props} href="/page-not-found">
        {children}
      </a>
    );
  }

  //home page
  if (
    link?.type === "linkInternal" &&
    link?.internalLink?.toLowerCase()?.includes("home")
  ) {
    return (
      <Link href="/" {...commonProps} {...props}>
        {children}
      </Link>
    );
  }

  //internal link
  if (link?.type === "linkInternal") {
    return (
      <Link {...commonProps} {...props} href={`/${link?.internalLink}`}>
        {children}
      </Link>
    );
  }

  //external link
  if (link?.type === "linkExternal") {
    return (
      <a
        {...commonProps}
        {...props}
        href={link?.externalLink}
        rel={link?.linkTarget === "_blank" ? "noopener noreferrer" : null}
      >
        {children}
      </a>
    );
  }

  <Link {...commonProps} {...props} href={"/"}>
    {children}
  </Link>;
};
