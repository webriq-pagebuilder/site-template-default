import React, { HTMLInputTypeAttribute } from "react";
import { cn } from "utils/cn";
import { IFormElements } from "../types";

interface IInputFile extends IFormElements {
  placeholder?: string;
  filename?: string;
  variant?: Variant;
}

type Variant = "primary" | "outline";

export const InputFile = ({
  className,
  variant = "primary",
  isRequired = false,
  name,
  placeholder,
  filename,
  ariaLabel,
  ...props
}: IInputFile) => {
  const commonStyle =
    "my-1 ml-auto cursor-pointer rounded  px-4 py-3 text-xs font-semibold leading-none text-white transition duration-200";
  const primary = `${commonStyle} bg-webriq-blue hover:bg-webriq-darkblue`;
  const outline = `${commonStyle} text-webriq-blue border border-solid bg-white border-webriq-blue hover:bg-slate-100`;

  const variants: Record<Variant, string> = {
    primary,
    outline,
  };

  const variantClass = variants[variant] ?? primary;

  return (
    <label className={"flex rounded bg-white px-2"}>
      <input
        aria-label={ariaLabel ?? "Attach file"}
        className="absolute opacity-0"
        type="file"
        placeholder={placeholder}
        name={name}
        required={isRequired}
        {...props}
      />
      <span className="px-2 py-4 text-xs font-semibold leading-none">
        {filename}
      </span>
      <div className={cn(variantClass, className)}>{name}</div>
    </label>
  );
};
