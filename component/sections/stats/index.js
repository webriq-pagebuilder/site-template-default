import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
};

function Stats({ data }) {
  const component = data?.variants;
  const variant = component?.variant;

  const Variant = Variants?.[variant];
  const props = {
    stats: component?.[variant]?.statItems,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Stats);
