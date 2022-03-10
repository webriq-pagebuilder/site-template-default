import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

function CallToAction({ data }) {
  const variant = data?.variant || data?.data?.condition;
  const Variant = Variants?.[variant];

  const props = {
    logo: data?.data?.logo,
    title: data?.data?.title,
    text: data?.data?.plainText,
    button: data?.data?.primaryButton,
    features: data?.data?.tags,
    formFields: data?.data?.form?.fields,
    formId: data?.data?.form?.id,
    formName: data?.data?.form?.name,
    formLinks: data?.data?.formLinks,
    signInLink: data?.data?.signinLink,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(CallToAction);
