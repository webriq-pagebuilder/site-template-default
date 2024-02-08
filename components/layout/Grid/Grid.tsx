import { cn } from "utils/cn";

interface Gap {
  columns?: "none" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  gap?: number;
  align?: "start" | "end" | "baseline" | "stretch" | "center";
  justify?:
    | "normal"
    | "start"
    | "end"
    | "center"
    | "between"
    | "around"
    | "evenly"
    | "stretch";
  className?: string;
  children?: React.ReactNode;
}

export function Grid({
  columns = 1,
  gap = 0,
  align = "stretch",
  justify = "start",
  className,
  children,
}: Gap) {
  const columnClass = {
    none: "grid-cols-none",
    1: "grid-cols-1",
    2: "grid-cols-2",
    3: "grid-cols-3",
    4: "grid-cols-4",
    5: "grid-cols-5",
    6: "grid-cols-6",
    7: "grid-cols-7",
    8: "grid-cols-8",
    9: "grid-cols-9",
    10: "grid-cols-10",
    11: "grid-cols-1",
    12: "grid-cols-12",
  };

  const alignVariants = {
    start: "items-start",
    end: "items-end",
    baseline: "items-baseline",
    stretch: "items-stretch",
    center: "items-center",
  };

  const justifyVariants = {
    normal: "justify-items-normal",
    start: "justify-items-start",
    end: "justify-items-end",
    center: "justify-items-center",
    between: " justify-items-between",
    around: "justify-items-around",
    evenly: "justify-items-evenly",
    stretch: "justify-items-stretch",
  };

  const column = columnClass[columns] || "grid-cols-1";
  const alignClass = alignVariants[align];
  const justifyClass = justifyVariants[justify];
  const classes = `grid w-full ${column} ${alignClass} ${justifyClass} gap-${
    gap ?? 0
  }`;
  return <div className={cn(classes, className)}>{children}</div>;
}

interface GridItem {
  span?: "auto" | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
  className?: string;
  children?: React.ReactNode;
}

export function GridItem({ span = "auto", className, children }: GridItem) {
  const spanVariants = {
    auto: "col-span-auto",
    1: "col-span-1",
    2: "col-span-2",
    3: "col-span-3",
    4: "col-span-4",
    5: "col-span-5",
    6: "col-span-6",
    7: "col-span-7",
    8: "col-span-8",
    9: "col-span-9",
    10: "col-span-10",
    11: "col-span-11",
    12: "col-span-12",
  };
  const spanClass = spanVariants[span];
  const classes = `w-auto ${spanClass}`;
  return <div className={cn(classes, className)}>{children}</div>;
}
