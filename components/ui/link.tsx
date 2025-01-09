import React from "react";
import Link from "next/link";

interface LocalLinkProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  target?: "_blank" | "self";
  rel?: string;
  href?: any;
}

export default function LocalLink({
  children,
  className,
  ariaLabel,
  target,
  rel,
  href,
  ...props
}: LocalLinkProps) {
  return (
    <Link
      className={className}
      aria-label={ariaLabel}
      target={target}
      rel={rel}
      href={href}
    >
      {children}
    </Link>
  );
}
