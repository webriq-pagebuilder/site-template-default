import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
};

function TextComponent({ data }) {
  const variant = data?.variants?.variant;

  const Variant = Variants?.[variant];
  const props = {
    heading: data?.variants?.[variant]?.heading,
    singleColumn: data?.variants?.[variant]?.singleColumn,
    firstColumn: data?.variants?.[variant]?.firstColumn,
    secondColumn: data?.variants?.[variant]?.secondColumn,
    thirdColumn: data?.variants?.[variant]?.thirdColumn,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(TextComponent);
