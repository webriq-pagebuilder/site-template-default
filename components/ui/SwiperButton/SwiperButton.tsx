import { cn } from "utils/cn";

export type SwiperButtonProps = {
  children?: React.ReactNode;
  ariaLabel: string;
  type?: "left" | "right";
  className?: string;
  onClick?: () => void;
};

export function SwiperButton({
  children,
  ariaLabel,
  type,
  className,
  onClick,
  ...props
}: SwiperButtonProps) {
  const svgElement =
    type === "left" ? (
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M10 19l-7-7m0 0l7-7m-7 7h18"
        />
      </svg>
    ) : (
      <svg
        className="w-6 h-6"
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth={2}
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    );

  const classes =
    "inline-block p-2 bg-white rounded-full shadow text-brand-primary hover:text-brand-secondary focus:outline-none";
  return (
    <button
      onClick={onClick}
      className={cn(classes, className)}
      aria-label={ariaLabel}
      {...props}
    >
      {children ? children : svgElement}
    </button>
  );
}
