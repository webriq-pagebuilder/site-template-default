import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a"), { ssr: false }),
  variant_b: dynamic(() => import("./variant_b"), { ssr: false }),
  variant_c: dynamic(() => import("./variant_c"), { ssr: false }),
  variant_d: dynamic(() => import("./variant_d"), { ssr: false }),
  variant_e: dynamic(() => import("./variant_e"), { ssr: false }),
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
