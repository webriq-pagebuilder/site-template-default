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

function Features({ /* template*/ data }) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    caption: data?.content?.[variant]?.subtitle,
    title: data?.content?.[variant]?.heading,
    description: data?.content?.[variant]?.description,
    features: data?.content?.[variant]?.arrayOfTitleAndDescription,
    featureItems: data?.content?.[variant]?.tags,
    featuredItems: data?.content?.[variant]?.featuredItems,
    image: data?.content?.[variant]?.images?.[0],
    images: data?.content?.[variant]?.images,
    primaryButton: data?.content?.[variant]?.primaryButton,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(Features);
