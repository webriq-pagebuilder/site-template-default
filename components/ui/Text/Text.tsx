import React from "react";
import { StyleVariants } from "../types";
import { cn } from "utils/cn";

type Type = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
type TextProps = {
  type?: Type;
  className?: string;
  children: React.ReactNode;
};

export function Text({ type = "p", className, children }: TextProps) {
  const Element = type;

  const commonClass = "";

  const variants: StyleVariants<Type> = {
    h1: `${commonClass} text-5xl`,
    h2: `${commonClass} text-4xl`,
    h3: `${commonClass} text-3xl`,
    h4: `${commonClass} text-2xl`,
    h5: `${commonClass} text-xl`,
    h6: `${commonClass} text-lg`,
    p: `${commonClass} text-base`,
  };

  const variantClass = variants[type] ?? variants["p"];
  return <Element className={cn(variantClass, className)}>{children}</Element>;
}
