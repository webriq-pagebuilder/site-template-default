import { cn } from "utils/cn";

interface GridProps {
  children: React.ReactNode;
  span?: number;
  gap?: number;
}

export function Grid({ children, span, gap, justify, items, className }) {
  const classes = `grid grid-cols-${span} gap${gap} justify-${justify} items-${items}`;
  return <div className={cn(classes, className)}>{children}</div>;
}
