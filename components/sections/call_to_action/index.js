import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
  variant_e: dynamic(() => import("./variant_e")),
};

function CallToAction({ data }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    logo: data?.variants?.logo,
    title: data?.variants?.title,
    text: data?.variants?.plainText,
    button: data?.variants?.primaryButton,
    features: data?.variants?.tags,
    formLinks: data?.variants?.formLinks,
    form: data?.variants?.form,
    signInLink: data?.variants?.signInLink,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(CallToAction);
