import { backgroundImages } from "polished";
import React, { CSSProperties } from "react";

type BackgroundImage = {
  src: string;
  withOverlay?: boolean;
  overlayOpt?: OverlayOpt;
  asColor?: boolean;
  color: string;
};

type OverlayOpt = {
  opacity?: number;
  color?: string;
};

export const BackgroundImage = ({
  src,
  withOverlay = false,
  overlayOpt = { opacity: 50, color: "gray" },
  asColor = false,
  color = "gray",
}: BackgroundImage) => {
  const style: CSSProperties = {
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
  };
  style["backgroundImage"] = asColor ? color : `url(${src})`;

  console.log("style", style);
  return (
    <div className="w-full h-full relative">
      <div
        style={style}
        className="absolute top-0 right-0 left-0 bottom-0"
      ></div>
    </div>
  );
};
