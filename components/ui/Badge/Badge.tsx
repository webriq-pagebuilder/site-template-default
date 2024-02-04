import { cn } from "utils/cn";

export type IBadgeProps = {
  /** Defines the content inside the button. */
  children: React.ReactNode;
  className?: string;
};

export function Badge({ children, className }: IBadgeProps) {
  const defaultClass =
    "px-3 py-1 text-sm font-bold uppercase bg-white rounded-full text-primary";
  return (
    <div className="flex">
      <div className={cn(defaultClass, className)}>{children}</div>
    </div>
  );
}
