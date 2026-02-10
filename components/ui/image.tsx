import React from "react";
import Image from "next/image";

interface LocalImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
  priority?: boolean;
  loading?: "lazy" | "eager";
  [key: string]: any;
}

export default function LocalImage({
  src,
  alt,
  width,
  height,
  className,
  priority,
  loading,
  ...props
}: LocalImageProps) {
  const validSrc = src && typeof src === "string" && src !== "[object Object]" ? src : "/webriq-logo.png";

  // Next.js Image cannot have both priority and loading="lazy"
  // Priority takes precedence - if set, don't pass loading prop
  const shouldUsePriority = priority === true;

  return (
    <Image
      src={validSrc}
      alt={alt ?? "image"}
      width={width ?? 250}
      height={height ?? 250}
      className={className}
      quality={100}
      {...(shouldUsePriority ? { priority: true } : { loading: loading ?? "lazy" })}
      {...props}
    />
  );
}
