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
  const variant = data?.variant || data?.data?.condition;
  const Variant = Variants?.[variant];

  const props = {
    caption: data?.data?.subtitle,
    title: data?.data?.title,
    description: data?.data?.description,
    features: data?.data?.arrayOfTitleAndDescription,
    tags: data?.data?.tags,
    featuredItems: data?.data?.featuredItems,
    images: data?.data?.images,
    primaryButton: data?.data?.primaryButton,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(Features);
