import React, { HTMLInputTypeAttribute, useState } from "react";
import { cn } from "utils/cn";
import { IFormElements, StyleVariants } from "../types";

interface IInputFile extends IFormElements {
  filename?: string;
  variant?: Variant;
}

type Variant = "primary" | "outline";

export const InputFile = ({
  className,
  variant = "primary",
  isRequired = false,
  name,
  filename: nameOfFile,
  ariaLabel,
  ...props
}: IInputFile) => {
  const [filename, setFilename] = useState("");
  const commonStyle =
    "my-1 ml-auto bg-white cursor-pointer rounded  px-4 py-3 text-xs font-semibold leading-none text-white transition duration-200";
  const primary = `${commonStyle} bg-webriq-blue hover:bg-webriq-darkblue`;
  const outline = `${commonStyle} text-webriq-blue border border-solid bg-white border-webriq-blue hover:bg-slate-100`;

  const variants: StyleVariants<Variant> = {
    primary,
    outline,
  };

  const variantClass = variants[variant] ?? primary;

  return (
    <div className={"relative rounded bg-white px-2 w-full"}>
      <input
        aria-label={ariaLabel ?? "Attach file"}
        className="absolute opacity-0 w-full h-full cursor-pointer"
        type="file"
        name={name}
        required={isRequired}
        onChange={(e) => setFilename(e.target?.files[0]?.name ?? "")}
        {...props}
      />
      <div className="flex">
        <span className="px-2 py-4 text-xs font-semibold leading-none">
          {filename ?? nameOfFile}
        </span>
        <label className={cn(variantClass, className)}>{name}</label>
      </div>
    </div>
  );
};
