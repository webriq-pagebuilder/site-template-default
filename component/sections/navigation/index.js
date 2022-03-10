import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

function Navigation({ template, data }) {
  const variant = data?.variant || data?.data?.condition;
  const Variant = Variants?.[variant];

  const props = {
    template,
    logo: data?.data?.logo,
    links: data?.data?.routes,
    primaryButton: data?.data?.primaryButton,
    secondaryButton: data?.data?.secondaryButton,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Navigation);
