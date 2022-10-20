import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function PagesFeaturedProducts({ data }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    collections: data?.variants?.collections,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(PagesFeaturedProducts);
