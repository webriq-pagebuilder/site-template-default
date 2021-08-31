import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

function Portfolio({ template, data }) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    template,
    caption: data?.content?.[variant]?.subtitle,
    title: data?.content?.[variant]?.heading,
    portfolios: data?.content?.[variant]?.portfolios,
    buttonLabel: data?.content?.[variant]?.changeButtonLabel,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Portfolio);
