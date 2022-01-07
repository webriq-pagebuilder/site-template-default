import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

function Navigation({ template, data }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    template,
    logo: data?.variants?.[variant]?.logo?.image,
    links: data?.variants?.[variant]?.routes,
    primaryButton: data?.variants?.[variant]?.primaryButton,
    secondaryButton: data?.variants?.[variant]?.secondaryButton,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Navigation);
