import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a"), { ssr: false }),
  variant_b: dynamic(() => import("./variant_b"), { ssr: false }),
  variant_c: dynamic(() => import("./variant_c"), { ssr: false }),
  variant_d: dynamic(() => import("./variant_d"), { ssr: false }),
};

function LogoCloud({ data }) {
  const component = data?.variants;
  const variant = component?.variant;

  const Variant = Variants?.[variant];
  const props = {
    title: component?.[variant]?.heading,
    images: component?.[variant]?.arrImages,
    text: component?.[variant]?.plainText,
    button: component?.[variant]?.primaryButton,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(LogoCloud);
