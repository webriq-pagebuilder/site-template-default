import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

function LogoCloud({ data }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    title: data?.variants?.title,
    images: data?.variants?.images,
    text: data?.variants?.plainText,
    button: data?.variants?.primaryButton,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(LogoCloud);
