import React from "react";
import dynamic from "next/dynamic";
import { SocialMediaContextProvider, useSocialMedia } from "context/SocialMediaContext";

import { SectionsProps } from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function SocialMedia({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];
  const profile = useSocialMedia();

  const props = {
    profile
  };

  return Variant ? (
    <SocialMediaContextProvider>
      <Variant {...props} />
    </SocialMediaContextProvider>
  ) : null;
}

export default React.memo(SocialMedia);
