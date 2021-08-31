import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

function Navigation({ template, data }) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    template,
    logo: data?.content?.[variant]?.logo?.image,
    links: data?.content?.[variant]?.routes,
    primaryButton: data?.content?.[variant]?.primaryButton,
    secondaryButton: data?.content?.[variant]?.secondaryButton,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Navigation);
