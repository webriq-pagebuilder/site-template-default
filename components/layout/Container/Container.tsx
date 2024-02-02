import React from "react";
import { cn } from "utils/cn";

export const Container = ({
  className,
  maxWidth,
  children,
}: {
  className?: string;
  maxWidth?: number;
  children: React.ReactNode;
}) => {
  const width = maxWidth ? `${maxWidth?.toString()}px` : "90rem";
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
