import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a"), { ssr: false }),
  variant_b: dynamic(() => import("./variant_b"), { ssr: false }),
  variant_c: dynamic(() => import("./variant_c"), { ssr: false }),
  variant_d: dynamic(() => import("./variant_d"), { ssr: false }),
};

function Navigation({ template, data }) {
  const variant = data?.variants?.variant;

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
