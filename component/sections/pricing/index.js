import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

function Pricing({ data }) {
  const variant = data?.variants?.variant;

  const Variant = Variants?.[variant];
  const props = {
    caption: data?.variants?.[variant]?.subtitle,
    title: data?.variants?.[variant]?.heading,
    description: data?.variants?.[variant]?.description,
    plans: data?.variants?.[variant]?.plans,
    annualBilling: data?.variants?.[variant]?.annualBilling,
    monthlyBilling: data?.variants?.[variant]?.monthlyBilling,
    banner: data?.variants?.[variant]?.banner,
    form: data?.variants?.[variant]?.form,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(Pricing);
