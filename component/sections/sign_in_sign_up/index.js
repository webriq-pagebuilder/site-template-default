import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function SignUpForm({ data }) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    logo: data?.variants?.[variant]?.logo,
    title: data?.variants?.[variant]?.heading,
    subtitle: data?.variants?.[variant]?.subtitle,
    text: data?.variants?.[variant]?.plainText,
    firstButton: data?.variants?.[variant]?.primaryButton,
    secondButton: data?.variants?.[variant]?.secondaryButton,
    formFields: data?.variants?.[variant]?.form?.fields,
    formId: data?.variants?.[variant]?.form?.id,
    formName: data?.variants?.[variant]?.form?.name,
    links: data?.variants?.[variant]?.formLinks,
    signInLink: data?.variants?.[variant]?.signinLink,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(SignUpForm);
