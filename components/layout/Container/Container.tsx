import React from "react";
import { cn } from "utils/cn";

export const Container = ({
  className,
  maxWidth,
  children,
}: {
  className: string;
  maxWidth?: number;
  children: React.ReactNode;
}) => {
  const width = `${maxWidth?.toString()}px` ?? "1220px";
  const classes = "mx-auto w-full py-10 px-4 ";
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
