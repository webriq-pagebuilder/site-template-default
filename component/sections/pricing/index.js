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
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    caption: data?.variants?.subtitle,
    title: data?.variants?.title,
    description: data?.variants?.description,
    plans: data?.variants?.plans,
    annualBilling: data?.variants?.annualBilling,
    monthlyBilling: data?.variants?.monthlyBilling,
    banner: data?.variants?.banner,
    formFields: data?.variants?.form?.fields,
    formId: data?.variants?.form?.id,
    formName: data?.variants?.form?.name,
    formThankYouPage: data?.variants?.form?.thankYouPage,
    stripePKey: data?.variants?.stripeAccount?.stripePKey,
    stripeSecretKey: data?.variants?.stripeAccount?.stripeSKey,
    hashKey: data?.variants?.stripeAccount?.hashKey,
    apiVersion: data?.variants?.stripeAccount?.apiVersion,
    NEXT_PUBLIC_DXP_STUDIO_ADDRESS:
      NEXT_PUBLIC_DXP_STUDIO_ADDRESS || "https://dxpstudio.webriq.com",
    block: data?.variants?.block,
    signInLink: data?.variants?.signinLink,
    _key: data._key,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(Pricing);
