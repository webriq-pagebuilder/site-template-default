import Image from "next/image";
import { useState } from "react";

type TAvatar = {
  src: string;
  alt: string;
  size?: ImageSize;
  customSize?: number;
  text?: string;
};

export type ImageSize = "sm" | "md" | "lg" | "xl";

export function Avatar({
  src,
  alt = "image",
  size = "sm",
  customSize = null,
  text,
  ...props
}: TAvatar) {
  const [loaded, setLoaded] = useState(false);
  const sizeMap = {
    sm: 40,
    md: 80,
    lg: 120,
    xl: 160,
  };
  const avatarSize = customSize ? `${customSize}px` : `${sizeMap[size]}px`;
  const initials = text
    ? text?.split(" ")?.reduce((acc, curr) => acc + curr[0], "")
    : "AB";
  console.log("initials");
  return (
    <div
      style={{
        maxWidth: avatarSize,
      }}
      className={`relative rounded-full aspect-square overflow-hidden border-2 border-solid border-webriq-blue`}
      {...props}
    >
      {(!loaded || !src) && (
        <div className="flex items-center justify-center w-full h-full bg-webriq-blue">
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
