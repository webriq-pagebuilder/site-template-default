import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
  variant_d: dynamic(() => import("./variant_d")),
};

function HowItWorks({ data }) {
  const component = data?.variants;
  const variant = component?.variant;

  const Variant = Variants?.[variant];
  const props = {
    subtitle: component?.[variant]?.subtitle,
    title: component?.[variant]?.heading,
    text: component?.[variant]?.plainText,
    video: component?.[variant]?.url,
    steps: component?.[variant]?.arrayOfTitleAndText,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(HowItWorks);
