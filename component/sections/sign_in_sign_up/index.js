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
    logo: data?.content?.[variant]?.logo,
    title: data?.content?.[variant]?.heading,
    subtitle: data?.content?.[variant]?.subtitle,
    text: data?.content?.[variant]?.plainText,
    firstButton: data?.content?.[variant]?.primaryButton,
    secondButton: data?.content?.[variant]?.secondaryButton,
    formFields: data?.content?.[variant]?.form?.fields,
    formId: data?.content?.[variant]?.form?.id,
    formName: data?.content?.[variant]?.form?.name,
    links: data?.content?.[variant]?.formLinks,
    signInLink: data?.content?.[variant]?.signinLink,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(SignUpForm);
