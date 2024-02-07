import { cn } from "utils/cn";
import { Button } from "../Button";

type Variant = "variant_a" | "variant_b";

export type SwiperButtonProps = {
  children?: React.ReactNode;
  ariaLabel: string;
  type?: "left" | "right";
  className?: string;
  onClick?: () => void;
  variant?: Variant;
  [key: string]: any;
};

export function SwiperButton({
  children,
  ariaLabel,
  type,
  className,
  onClick,
  variant,
  ...props
}: SwiperButtonProps) {
  const variantList = {
    variant_a: VariantA,
    variant_b: VariantB,
  };

  const Element = variantList[variant] || VariantA;

  const variantClasses = {
    variant_a:
      "inline-block p-2 bg-white rounded-full shadow text-primary hover:text-secondary focus:outline-none",
    variant_b: "",
  };

  const classes = variantClasses[variant] || variantClasses["variant_a"];
  return (
    <Button
      as="button"
      variant="unstyled"
      onClick={onClick}
      className={cn(classes, className)}
      ariaLabel={ariaLabel}
      {...props}
    >
      {children ? children : <Element type={type} />}
    </Button>
  );
}

type VariantProps = {
  type: "left" | "right";
};

const VariantA = ({ type }: VariantProps) => {
  if (type === "right") {
    return (
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
  }

  return (
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
  );
};

const VariantB = ({ type }: VariantProps) => {
  if (type === "left") {
    return (
      <svg
        width={36}
        height={36}
        viewBox="0 0 10 18"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M9 16.0185C9.268 16.2905 9.268 16.7275 9 16.9975C8.732 17.2675 8.299 17.2685 8.031 16.9975L0.201 9.0895C-0.067 8.8195 -0.067 8.3825 0.201 8.1105L8.031 0.2025C8.299 -0.0675 8.732 -0.0675 9 0.2025C9.268 0.4735 9.268 0.9115 9 1.1815L1.859 8.6005L9 16.0185Z"
          fill="#0045d8"
        />
      </svg>
    );
  }

  return (
    <svg
      width={36}
      height={36}
      viewBox="0 0 10 18"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M0.19922 1.1817C-0.0687795 0.909696 -0.0687794 0.472695 0.19922 0.202695C0.46722 -0.0673054 0.90022 -0.0683048 1.16822 0.202695L8.99822 8.11069C9.26622 8.3807 9.26622 8.81769 8.99822 9.08969L1.16822 16.9977C0.900219 17.2677 0.467218 17.2677 0.199219 16.9977C-0.0687809 16.7267 -0.0687808 16.2887 0.199219 16.0187L7.34022 8.5997L0.19922 1.1817Z"
        fill="#0045d8"
      />
    </svg>
  );
};
