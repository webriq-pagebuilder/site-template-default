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
  const classes = `flex flex-${direction} items-${align} justify-${justify} ${
    wrap ? "flex-wrap" : ""
  } gap-${gap ? gap : 0} `;

  const Element = as;

  return (
    <Element className={cn(classes, className)} {...props}>
      {children}
    </Element>
  );
}
