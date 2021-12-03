import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
  variant_e: dynamic(() => import("./variant_e")),
};

function HowItWorks({ data }) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    subtitle: data?.variants?.[variant]?.subtitle,
    title: data?.variants?.[variant]?.heading,
    text: data?.variants?.[variant]?.plainText,
    video: data?.variants?.[variant]?.url,
    steps: data?.variants?.[variant]?.arrayOfTitleAndText,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(HowItWorks);
