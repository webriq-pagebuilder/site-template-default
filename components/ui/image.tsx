import React from "react";
import Image from "next/image";

interface LocalImageProps {
  src?: string;
  alt?: string;
  width?: number;
  height?: number;
  className?: string;
}

export default function LocalImage({
  src,
  alt,
  width,
  height,
  className,
  ...props
}: LocalImageProps) {
  return (
    <Image
      src={src ?? ""}
      alt={alt ?? "image"}
      width={width ?? 250}
      height={height ?? 250}
      className={className}
      quality={100}
      priority
      {...props}
    />
  );
}
