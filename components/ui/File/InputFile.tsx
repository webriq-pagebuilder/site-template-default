import React, { useState } from "react";
import { cn } from "utils/cn";
import { StyleVariants } from "../types";

type InputFileprops = {
  /** Will apply on the label element */
  className?: string;
  /** Is this element required? */
  required?: boolean;
  name: string;
  ariaLabel: string;
  variant?: Variant;
  [key: string]: any;
};

type Variant = "primary" | "outline";

export const InputFile = ({
  className,
  variant = "primary",
  required = false,
  name,
  ariaLabel,
  ...props
}: InputFileprops) => {
  const [filename, setFilename] = useState("");
  const commonStyle =
    "my-1 ml-auto bg-white cursor-pointer rounded  px-4 py-3 text-xs font-semibold leading-none text-white transition duration-200";
  const primary = `${commonStyle} bg-primary-foreground hover:bg-primary`;
  const outline = `${commonStyle} text-primary-foreground border border-solid bg-white border-primary-foreground hover:bg-slate-100`;

  const variants: StyleVariants<Variant> = {
    primary,
    outline,
  };

  const variantClass = variants[variant] ?? primary;

  return (
    <div className={"relative rounded bg-white px-2 w-full"}>
      <input
        aria-label={ariaLabel ?? "Attach file"}
        className="absolute w-full h-full opacity-0 cursor-pointer"
        type="file"
        name={name}
        required={required}
        id={name}
        onChange={(e) => setFilename(e.target?.files[0]?.name ?? "")}
        {...props}
      />
      <div className="flex">
        <span className="px-2 py-4 text-xs font-semibold leading-none">
          {filename}
        </span>
        <label htmlFor={name} className={cn(variantClass, className)}>
          {name}
        </label>
      </div>
    </div>
  );
};
