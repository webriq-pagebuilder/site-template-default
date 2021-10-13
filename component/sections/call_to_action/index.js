import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a"), { ssr: false }),
  variant_b: dynamic(() => import("./variant_b"), { ssr: false }),
  variant_c: dynamic(() => import("./variant_c"), { ssr: false }),
  variant_d: dynamic(() => import("./variant_d"), { ssr: false }),
};

function CallToAction({ data }) {
  const component = data?.variants;
  const variant = component?.variant;

  const Variant = Variants?.[variant];
  const props = {
    logo: component?.[variant]?.logo,
    title: component?.[variant]?.heading,
    text: component?.[variant]?.plainText,
    button: component?.[variant]?.primaryButton,
    features: component?.[variant]?.tags,
    formFields: component?.[variant]?.form?.fields,
    formId: component?.[variant]?.form?.id,
    formName: component?.[variant]?.form?.name,
    links: component?.[variant]?.formLinks,
    signInLink: data?.variants?.[variant]?.signinLink,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(CallToAction);
