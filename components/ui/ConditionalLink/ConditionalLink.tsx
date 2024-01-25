import Link from "next/link";
import React from "react";
import { LabeledRoute, LabeledRouteWithKey } from "types";
import { cn } from "utils/cn";
import { StyleVariants } from "../types";

type Link = LabeledRoute | LabeledRouteWithKey;
type Variant = "outline" | "primary" | "secondary" | "link";

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
  const primary = `${commonStyles} bg-brand-primary hover:bg-brand-primary-foreground text-gray-50  outline-none `;
  const outline = `${commonStyles} bg-white hover:bg-slate-100  font-bold outline text-brand-primary-foreground outline-brand-primary-foreground `;
  const secondary = `${commonStyles} bg-brand-secondary hover:bg-brand-primary font-bold  text-gray-50`;
  const linkStyle = ``;
  const variants: StyleVariants<Variant> = {
    primary,
    secondary,
    outline,
    link: linkStyle,
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

  return (
    <Link {...commonProps} {...props} href={"/"}>
      {children}
    </Link>
  );
};
