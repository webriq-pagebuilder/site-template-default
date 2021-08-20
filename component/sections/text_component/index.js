import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
};

function TextComponent({ data }) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    heading: data?.content?.[variant]?.heading,
    singleColumn: data?.content?.[variant]?.singleColumn,
    firstColumn: data?.content?.[variant]?.firstColumn,
    secondColumn: data?.content?.[variant]?.secondColumn,
    thirdColumn: data?.content?.[variant]?.thirdColumn,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(TextComponent);
