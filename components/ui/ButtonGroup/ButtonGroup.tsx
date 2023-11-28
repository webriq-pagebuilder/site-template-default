import React from "react";
import { cn } from "utils/cn";
import { StyleVariants } from "../types";

type Variant = "stacked" | "inline" | "inline-fill" | "stacked-fill";

type Position = "left" | "middle" | "right";

interface IButtonGroup {
  variant?: Variant;
  position?: Position;
  className?: string;
  children: React.ReactNode;
}

export const ButtonGroup = ({
  variant = "stacked",
  className,
  position = "left",
  children,
}: IButtonGroup) => {
  const commonClass = ``;
  const stacked = `${commonClass} flex flex-col gap-2 max-w-[300px]`;
  const inline = `${commonClass} flex gap-2 items-center`;
  const inlineFill = `${inline} flex gap-2 justify-between items-center w-full`;
  const stackedFill = `${commonClass} w-full space-y-2`;

  const variants: StyleVariants<Variant> = {
    stacked,
    ["inline-fill"]: inlineFill,
    ["stacked-fill"]: stackedFill,
    inline,
  };

  const variantClass = variants[variant] ?? stacked;

  const left = `mr-auto`;
  const middle = variant === "inline" ? "justify-center" : `mx-auto`;
  const right = variant === "inline" ? "justify-end" : `ml-auto`;

  const positions: StyleVariants<Position> = {
    left,
    middle,
    right,
  };

  const positionClass = positions[position] ?? left;
  return (
    <div className={`${cn(variantClass, positionClass, className)}`}>
      {/* {children} */}
      {React.Children.map(children, (child) =>
        child ? (
          <div
            className={`${
              variant === "inline-fill" && "flex-1"
            } [&>button]:w-full`}
          >
            {child}
          </div>
        ) : null
      )}
    </div>
  );
};

export default ButtonGroup;
