import React from "react";
import { cn } from "utils/cn";

type Width = "sm" | "md" | "lg" | "xl" | "2xl" | number;

export const Container = ({
  className,
  maxWidth,
  children,
}: {
  className?: string;
  maxWidth?: Width;
  children: React.ReactNode;
}) => {
  const widthVariants = {
    sm: "384px",
    md: "448px",
    lg: "512px",
    xl: "576px",
    "2xl": "672px",
  };

  const widthClass =
    typeof maxWidth === "number"
      ? `${maxWidth?.toString()}px`
      : widthVariants[maxWidth];
  const width = widthClass ?? "90rem";

  const classes = "mx-auto w-full  px-4 ";
  return (
    <div
      style={{
        maxWidth: width,
      }}
      className={cn(classes, className)}
    >
      {children}
    </div>
  );
};
