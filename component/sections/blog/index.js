import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a"), { ssr: false }),
  variant_b: dynamic(() => import("./variant_b"), { ssr: false }),
  variant_c: dynamic(() => import("./variant_c"), { ssr: false }),
  variant_d: dynamic(() => import("./variant_d"), { ssr: false }),
};

function Blog({ data }) {
  const variant = data?.variants?.variant;
  const Variant = Variants?.[variant];

  const props = {
    subtitle: data?.variants?.[variant]?.subtitle,
    title: data?.variants?.[variant]?.heading,
    posts: data?.variants?.[variant]?.blogPosts,
    buttonLabel: data?.variants?.[variant]?.changeButtonLabel,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Blog);
