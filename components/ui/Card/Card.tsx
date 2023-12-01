import React from "react";
import { cn } from "utils/cn";

export function Card({
  children,
  className,
}: {
  children: React.ReactNode;
  className?: string;
}) {
  const classes = `rounded-lg border border-solid border-slate-200/30 p-4 shadow-sm `;
  return <div className={cn(classes, className)}>{children}</div>;
}
