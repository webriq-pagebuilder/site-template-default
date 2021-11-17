import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

const { NEXT_PUBLIC_DXP_STUDIO_ADDRESS } = process.env;

function Pricing({ data }) {
  const variant = data?.variant;
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
    stripePKey: data?.variants?.[variant]?.stripeAccount?.stripePKey,
    stripeSecretKey: data?.variants?.[variant]?.stripeAccount?.stripeSKey,
    hashKey: data?.variants?.[variant]?.stripeAccount?.hashKey,
    apiVersion: data?.variants?.[variant]?.stripeAccount?.apiVersion,
    NEXT_PUBLIC_DXP_STUDIO_ADDRESS:
      NEXT_PUBLIC_DXP_STUDIO_ADDRESS || "https://dxpstudio.webriq.com",
    block: data?.variants?.[variant]?.block,
    signInLink: data?.variants?.[variant]?.signinLink,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(Pricing);
