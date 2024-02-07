import React from "react";
import { cn } from "utils/cn";

type TextProps = {
  className?: string;
  children: React.ReactNode;
  style?: React.CSSProperties;
  muted?: boolean;
  weight?: Weight;
  fontSize?: fontSize;
  [key: string]: any;
};

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

export function Text({
  type = "p",
  className,
  children,
  style,
  muted = false,
  weight = "normal",
  fontSize,
  ...props
}: TextProps) {
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
  const size = fontSizeMap[fontSize] || "text-base";
  const fontWeight = fontWeightMap[weight] || "font-normal";
  const commonClass = `${size} ${fontWeight} ${muted && "text-gray-500"}`;

  const variants = {
    p: `${commonClass}`,
  };

  const variantClass = variants[type] ?? variants["p"];
  return (
    <p style={style} className={cn(variantClass, className)} {...props}>
      {children}
    </p>
  );
}
