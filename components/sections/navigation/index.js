import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
  variant_e: dynamic(() => import("./variant_e")),
};

function Navigation({ template, data }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    template,
    logo: data?.variants?.logo,
    links: data?.variants?.routes,
    primaryButton: data?.variants?.primaryButton,
    secondaryButton: data?.variants?.secondaryButton,
    banner: data?.variants?.banner,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Navigation);
