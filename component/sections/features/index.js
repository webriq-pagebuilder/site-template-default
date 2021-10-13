import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a"), { ssr: false }),
  variant_b: dynamic(() => import("./variant_b"), { ssr: false }),
  variant_c: dynamic(() => import("./variant_c"), { ssr: false }),
  variant_d: dynamic(() => import("./variant_d"), { ssr: false }),
  variant_e: dynamic(() => import("./variant_e"), { ssr: false }),
  variant_f: dynamic(() => import("./variant_f"), { ssr: false }),
  variant_g: dynamic(() => import("./variant_g"), { ssr: false }),
  variant_h: dynamic(() => import("./variant_h"), { ssr: false }),
};

function Features({ /* template*/ data }) {
  const variant = data?.variants?.variant;

  const Variant = Variants?.[variant];
  const props = {
    caption: data?.variants?.[variant]?.subtitle,
    title: data?.variants?.[variant]?.heading,
    description: data?.variants?.[variant]?.description,
    features: data?.variants?.[variant]?.arrayOfTitleAndDescription,
    featureItems: data?.variants?.[variant]?.tags,
    featuredItems: data?.variants?.[variant]?.featuredItems,
    image: data?.variants?.[variant]?.images?.[0],
    images: data?.variants?.[variant]?.images,
    primaryButton: data?.variants?.[variant]?.primaryButton,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(Features);
