import { cn } from "utils/cn";

interface SwiperPaginationProps {
  isActive?: boolean;
  colorScheme?: ColorScheme;
  className?: string;
  onClick?: (...any) => any;
  ariaLabel: string;
}

type ColorScheme = "blue" | "white";

export function SwiperPagination({
  isActive = false,
  colorScheme,
  onClick,
  ariaLabel,
  className,
  ...props
}: SwiperPaginationProps) {
  const variantClass = {
    blue: `mr-1 ${
      isActive ? "bg-primary" : "bg-gray-200"
    } rounded-full p-1 focus:outline-none`,
    white: `mr-2 inline-block h-2 w-2 rounded-full ${
      isActive
        ? " bg-white focus:outline-none"
        : " bg-secondary focus:outline-none"
    }`,
  };

  const classes = variantClass[colorScheme] || variantClass["blue"];
  return (
    <button
      onClick={onClick}
      className={cn(classes, className)}
      aria-label={ariaLabel}
      {...props}
    />
  );
}
