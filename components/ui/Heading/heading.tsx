import React from "react";
import { StyleVariants } from "../types";
import { cn } from "utils/cn";

type Type = "h1" | "h2" | "h3" | "h4" | "h5" | "h6";
type fontSize =
  | "xs"
  | "sm"
  | "base"
  | "lg"
  | "xl"
  | "2xl"
  | "3xl"
  | "4xl"
  | "5xl"

type TextProps = {
  type?: Type;
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  muted?: boolean;
  weight?: Weight;
  fontSize?: fontSize;
  [key: string]: any;
};

type Weight =
  | "thin"
  | "extralight"
  | "light"
  | "normal"
  | "semibold"
  | "bold"
  | "medium"
  | "extrabold"
  | "black";

export function Heading({
  type = "h1",
  className,
  children,
  style,
  muted = false,
  weight,
  fontSize,
  ...props
}: TextProps) {
  const Element: Type = ["h1", "h2", "h3", "h4", "h5", "h6"].includes(type)
    ? type
    : "h1";

  const fontSizeMap = {
    xs: "text-xs",
    sm: "text-sm",
    base: "text-base",
    lg: "text-lg",
    xl: "text-xl",
    "2xl": "text-2xl",
    "3xl": "text-3xl",
    "4xl": "text-4xl",
    "5xl": "text-5xl",
  };

  const fontWeightMap = {
    light: "font-light",
    normal: "font-normal",
    medium: "font-medium",
    semibold: "font-semibold",
    bold: "font-bold",
  };
  const size = fontSizeMap[fontSize];
  const fontWeight = weight ? fontWeightMap[weight] : "font-global";
  const commonClass = `${muted && "text-black"} ${fontWeight}`

  const variants: StyleVariants<Type> = {
    h1: `${commonClass} ${size ?? "text-5xl"} `,
    h2: `${commonClass} ${size ?? "text-4xl"} `,
    h3: `${commonClass} ${size ?? "text-3xl"} `,
    h4: `${commonClass} ${size ?? "text-2xl"} `,
    h5: `${commonClass} ${size ?? "text-xl"} `,
    h6: `${commonClass} ${size ?? "text-lg"} `,
  };

  const variantClass = variants[type] ?? variants["h1"];

  return (
    <Element style={style} className={cn(variantClass, className)} {...props}>
      {children}
    </Element>
  );
}
