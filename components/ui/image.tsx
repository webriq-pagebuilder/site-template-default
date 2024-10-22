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
}: LocalImageProps) {
  return (
    <Image
      className={className}
      width={width}
      height={height}
      src={src ?? ""}
      alt={alt ?? "Logo Image"}
      priority
      quality={100}
      layout="responsive"
      placeholder="blur"
    />
  );
}
