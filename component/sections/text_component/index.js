import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
};

function TextComponent({ data }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    heading: data?.variants?.title,
    singleColumn: data?.variants?.singleColumn,
    firstColumn: data?.variants?.firstColumn,
    secondColumn: data?.variants?.secondColumn,
    thirdColumn: data?.variants?.thirdColumn,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(TextComponent);
