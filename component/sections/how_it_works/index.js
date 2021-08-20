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
    subtitle: data?.content?.[variant]?.subtitle,
    title: data?.content?.[variant]?.heading,
    text: data?.content?.[variant]?.plainText,
    video: data?.content?.[variant]?.url,
    steps: data?.content?.[variant]?.arrayOfTitleAndText,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(HowItWorks);
