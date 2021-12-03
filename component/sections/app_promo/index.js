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
    logo: data?.variants?.[variant]?.logo,
    subtitle: data?.variants?.[variant]?.subtitle,
    title: data?.variants?.[variant]?.heading,
    description: data?.variants?.[variant]?.description,
    statistics: data?.variants?.[variant]?.statItems,
    features: data?.variants?.[variant]?.tags,
    images: data?.variants?.[variant]?.arrImages,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(AppPromo);
