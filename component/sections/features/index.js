import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
  variant_e: dynamic(() => import("./variant_e")),
  variant_f: dynamic(() => import("./variant_f")),
  variant_g: dynamic(() => import("./variant_g")),
  variant_h: dynamic(() => import("./variant_h")),
};

function Features({ data }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];
  console.log(data?.variants);
  const props = {
    caption: data?.variants?.subtitle,
    title: data?.variants?.title,
    description: data?.variants?.description,
    features: data?.variants?.arrayOfImageTitleAndText,
    tags: data?.variants?.tags,
    featuredItems: data?.variants?.featuredItems,
    images: data?.variants?.images,
    primaryButton: data?.variants?.primaryButton,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(Features);
