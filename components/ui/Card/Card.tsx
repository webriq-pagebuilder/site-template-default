import React from "react";
import { cn } from "utils/cn";

type CardBorderRadius = "none" | "sm" | "md" | "lg" | "xl";

export function Card({
  children,
  className,
  borderRadius,
}: {
  children: React.ReactNode;
  className?: string;
  borderRadius?: CardBorderRadius;
}) {
  const radiusMap = {
    none: "rounded-none",
    sm: "rounded-sm",
    md: "rounded-md",
    lg: "rounded-lg",
    xl: "rounded-xl",
  };

  const borderRadiusClass = radiusMap[borderRadius] || "rounded-lg";
  const classes = `border border-solid border-slate-300/30 p-4 shadow-sm ${borderRadiusClass}`;
  return <div className={cn(classes, className)}>{children}</div>;
}
