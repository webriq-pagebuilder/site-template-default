import React from "react";
import { StyleVariants } from "../types";
import { cn } from "utils/cn";

type Type = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type TextProps = {
  type?: Type;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  muted?: boolean;
  weight?: Weight;
  [key: string]: any;
};

type Weight =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "semibold"
  | "bold"
  | "mediun"
  | "extrabold"
  | "black";

export function Heading({
  type = "h1",
  className,
  children,
  style,
  muted = false,
  weight = "normal",
  color = "black",
  bg,
  ...props
}: TextProps) {
  const Element: Type = ["h1", "h2", "h3", "h4", "h5", "h6", "p"].includes(type)
    ? type
    : "h1";

  const commonClass = `text-${color} bg-${bg} ${muted && "text-gray-500"}  ${
    weight && `font-${weight}`
  }`;

  const variants: StyleVariants<Type> = {
    h1: `${commonClass} text-4xl font-bold lg:text-5xl font-heading`,
    h2: `${commonClass} text-3xl font-bold lg:text-4xl`,
    h3: `${commonClass} text-2xl font-bold lg:text-3xl`,
    h4: `${commonClass} font-bold text-2xl`,
    h5: `${commonClass} font-medium text-xl`,
    h6: `${commonClass} font-medium text-lg`,
  };

  const variantClass = variants[type] ?? variants["h1"];
  return (
    <Element style={style} className={cn(variantClass, className)} {...props}>
      {children}
    </Element>
  );
}
