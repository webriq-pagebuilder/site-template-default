import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

function CallToAction({ data }) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    logo: data?.content?.[variant]?.logo,
    title: data?.content?.[variant]?.heading,
    text: data?.content?.[variant]?.plainText,
    button: data?.content?.[variant]?.primaryButton,
    features: data?.content?.[variant]?.tags,
    formFields: data?.content?.[variant]?.form?.fields,
    formId: data?.content?.[variant]?.form?.id,
    formName: data?.content?.[variant]?.form?.name,
    links: data?.content?.[variant]?.formLinks,
    signInLink: data?.content?.[variant]?.signinLink,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(CallToAction);
