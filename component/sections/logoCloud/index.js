import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

function LogoCloud({ data }) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    title: data?.variants?.[variant]?.heading,
    images: data?.variants?.[variant]?.arrImages,
    text: data?.variants?.[variant]?.plainText,
    button: data?.variants?.[variant]?.primaryButton,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(LogoCloud);
