import React from "react";
import { StyleVariants } from "../types";
import { cn } from "utils/cn";

type Type = "h1" | "h2" | "h3" | "h4" | "h5" | "h6" | "p";
type TextProps = {
  type?: Type;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
};

export function Text({ type = "p", className, children, style }: TextProps) {
  const Element: Type = ["h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(type)
    ? type
    : "p";

  const commonClass = "";

  const variants: StyleVariants<Type> = {
    h1: `${commonClass} text-4xl font-bold lg:text-5xl font-heading mb-4`,
    h2: `${commonClass} text-3xl font-bold lg:text-4xl`,
    h3: `${commonClass} text-2xl font-bold lg:text-3xl`,
    h4: `${commonClass} font-bold text-2xl`,
    h5: `${commonClass} font-medium text-xl`,
    h6: `${commonClass} font-medium text-lg`,
    p: `${commonClass} text-base`,
  };

  const variantClass = variants[type] ?? variants["p"];
  return (
    <Element style={style} className={cn(variantClass, className)}>
      {children}
    </Element>
  );
}
