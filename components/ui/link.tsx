import React from "react";
import Link from "next/link";

interface LocalLinkProps {
  children: React.ReactNode;
  className?: string;
  ariaLabel?: string;
  target?: "_blank" | "self";
  rel?: string;
  href?: string;
  [key: string]: any;
}

export default function LocalLink({
  children,
  className,
  ariaLabel,
  target,
  rel,
  href,
  key,
}: LocalLinkProps) {
  return (
    <Link
      className={className}
      aria-label={ariaLabel}
      target={target}
      rel={rel}
      href={href}
      key={key}
    >
      {children}
    </Link>
  );
}
