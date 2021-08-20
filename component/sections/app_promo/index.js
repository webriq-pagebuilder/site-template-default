import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
};

function AppPromo({ data }) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    logo: data?.content?.[variant]?.logo,
    subtitle: data?.content?.[variant]?.subtitle,
    title: data?.content?.[variant]?.heading,
    description: data?.content?.[variant]?.description,
    statistics: data?.content?.[variant]?.statItems,
    features: data?.content?.[variant]?.tags,
    images: data?.content?.[variant]?.images,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(AppPromo);
