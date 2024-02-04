import Image from "next/image";
import { useState } from "react";
import { cn } from "utils/cn";

type TAvatar = {
  src: string;
  alt: string;
  size?: ImageSize;
  text?: string;
  className?: string;
  [key: string]: any;
};

export type ImageSize = "sm" | "md" | "lg" | "xl";

export function Avatar({
  src,
  alt = "image",
  size = "sm",
  text,
  className,
  ...props
}: TAvatar) {
  const [loaded, setLoaded] = useState(false);
  const sizeMap = {
    sm: 40,
    md: 80,
    lg: 120,
    xl: 160,
  };
  const avatarSize =
    typeof size === "number" ? `${size}px` : `${sizeMap[size]}px`;
  const initials = text
    ? text?.split(" ")?.reduce((acc, curr) => acc + curr[0], "")
    : "AB";
  const baseClass = `relative rounded-full aspect-square overflow-hidden border-2 border-solid border-primary-foreground`;
  return (
    <div
      style={{
        maxWidth: avatarSize,
      }}
      className={cn(baseClass, className)}
      {...props}
    >
      {(!loaded || !src) && (
        <div className="flex items-center justify-center w-full h-full bg-primary-foreground">
          <p
            style={{
              fontSize: `calc(${avatarSize}/2)`,
            }}
            className="text-white"
          >
            {initials}
          </p>
        </div>
      )}
      {src && (
        <Image
          className="object-cover object-center"
          src={src}
          alt={alt}
          fill
          onLoad={() => setLoaded(true)}
        />
      )}
    </div>
  );
}
