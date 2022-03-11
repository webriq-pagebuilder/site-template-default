import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
};

function Stats({ data }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    stats: data?.variants?.statItems,
    statsWithImage: data?.variants?.statItemsWithImage,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Stats);
