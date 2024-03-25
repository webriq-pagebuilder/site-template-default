import { cn } from "utils/cn";

interface FlexProps {
  align?: Align;
  direction?: Direction;
  justify?: Justify;
  wrap?: boolean;
  className?: string;
  gap?: number;
  children: React.ReactNode;
  as?: keyof JSX.IntrinsicElements;
  [key: string]: any;
}

type Justify =
  | "normal"
  | "start"
  | "end"
  | "center"
  | "between"
  | "around"
  | "evenly"
  | "stretch";

type Direction = "row" | "row-reverse" | "col" | "col-reverse";
type Align = "start" | "end" | "baseline" | "stretch" | "center";

export function Flex({
  align = "start",
  direction = "row",
  justify = "start",
  wrap = false,
  className,
  children,
  gap,
  as = "div",
  ...props
}: FlexProps) {
  const directionVariants = {
    row: "flex-row",
    col: "flex-col",
    "row-reverse": "flex-row-reverse",
    "col-reverse": "flex-col-reverse",
  };

  const alignVariants = {
    start: "items-start",
    end: "items-end",
    baseline: "items-baseline",
    stretch: "items-stretch",
    center: "items-center",
  };

  const justifyVariants = {
    normal: "justify-normal",
    start: "justify-start",
    end: "justify-end",
    center: "justify-center",
    between: " justify-between",
    around: "justify-around",
    evenly: "justify-evenly",
    stretch: "justify-stretch",
  };

  const directionClass = directionVariants[direction];
  const alignClass = alignVariants[align];
  const justifyClass = justifyVariants[justify];
  const classes = `flex ${directionClass} ${alignClass} ${justifyClass} ${
    wrap ? "flex-wrap" : ""
  } gap-${gap ? gap : 0} `;

  const Element = as;

  return (
    <Element className={cn(classes, className)} {...props}>
      {children}
    </Element>
  );
}
