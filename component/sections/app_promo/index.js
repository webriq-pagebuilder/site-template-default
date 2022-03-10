import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
};

function AppPromo({ data }) {
  const variant = data?.variant || data?.data?.condition;
  const Variant = Variants?.[variant];

  const props = {
    logo: data?.data?.logo,
    subtitle: data?.data?.subtitle,
    title: data?.data?.title,
    description: data?.data?.description,
    statistics: data?.data?.statItems,
    features: data?.data?.tags,
    images: data?.data?.images,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(AppPromo);
