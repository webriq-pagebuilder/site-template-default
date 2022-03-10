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
  const variant = data?.variant || data?.data?.condition;
  const Variant = Variants?.[variant];
  const props = {
    caption: data?.data?.[variant]?.subtitle,
    title: data?.data?.[variant]?.heading,
    description: data?.data?.[variant]?.description,
    plans: data?.data?.[variant]?.plans,
    annualBilling: data?.data?.[variant]?.annualBilling,
    monthlyBilling: data?.data?.[variant]?.monthlyBilling,
    banner: data?.data?.[variant]?.banner,
    formFields: data?.data?.[variant]?.form?.fields,
    formId: data?.data?.[variant]?.form?.id,
    formName: data?.data?.[variant]?.form?.name,
    stripePKey: data?.data?.[variant]?.stripeAccount?.stripePKey,
    stripeSecretKey: data?.data?.[variant]?.stripeAccount?.stripeSKey,
    hashKey: data?.data?.[variant]?.stripeAccount?.hashKey,
    apiVersion: data?.data?.[variant]?.stripeAccount?.apiVersion,
    NEXT_PUBLIC_DXP_STUDIO_ADDRESS:
      NEXT_PUBLIC_DXP_STUDIO_ADDRESS || "https://dxpstudio.webriq.com",
    block: data?.data?.[variant]?.block,
    signInLink: data?.data?.[variant]?.signinLink,
    _key: data._key,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(Pricing);
