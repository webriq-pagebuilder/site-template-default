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
  | "6xl"
  | "7xl"
  | "8xl"
  | "9xl";

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
    thin: "font-thin",
    extralight: "font-extralight",
    light: "font-light",
    normal: "font-normal",
    semibold: "font-semibold",
    bold: "font-bold",
    medium: "font-mediun",
    extrabold: "font-extrabold",
    black: "font-black",
  };
  const size = fontSizeMap[fontSize] || "text-4xl";
  const fontWeight = fontWeightMap[weight] || "font-bold";
  const commonClass = ` ${muted && "text-gray-500"}  ${
    weight && `${fontWeight}`
  } ${size}`;
  const variants: StyleVariants<Type> = {
    h1: `${commonClass} font-bold font-heading ${
      size ?? `text-4xl lg:text-5xl`
    } ${fontWeight}`,
    h2: `${commonClass}  ${
      size ?? `text-3xl lg:text-4xl`
    } font-bold ${fontWeight}`,
    h3: `${commonClass}  font-bold  ${
      size ?? `text-2xl lg:text-3xl`
    } ${fontWeight}`,
    h4: `${commonClass} font-bold text-2xl ${size} ${fontWeight}`,
    h5: `${commonClass} font-medium text-xl ${size} ${fontWeight}`,
    h6: `${commonClass} font-medium text-lg ${size} ${fontWeight}`,
  };

  const variantClass = variants[type] ?? variants["h1"];
  return (
    <Element style={style} className={cn(variantClass, className)} {...props}>
      {children}
    </Element>
  );
}
