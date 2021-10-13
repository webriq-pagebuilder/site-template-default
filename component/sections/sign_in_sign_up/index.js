import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a"), { ssr: false }),
  variant_b: dynamic(() => import("./variant_b"), { ssr: false }),
};

function SignUpForm({ data }) {
  const component = data?.variants;
  const variant = component?.variant;

  const Variant = Variants?.[variant];
  const props = {
    logo: component?.[variant]?.logo,
    title: component?.[variant]?.heading,
    subtitle: component?.[variant]?.subtitle,
    text: component?.[variant]?.plainText,
    firstButton: component?.[variant]?.primaryButton,
    secondButton: component?.[variant]?.secondaryButton,
    formFields: component?.[variant]?.form?.fields,
    formId: component?.[variant]?.form?.id,
    formName: component?.[variant]?.form?.name,
    links: component?.[variant]?.formLinks,
    signInLink: data?.variants?.[variant]?.signinLink,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(SignUpForm);
