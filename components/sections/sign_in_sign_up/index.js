import React from "react";
import dynamic from "next/dynamic";
import EditSection from "components/EditSection";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function SignUpForm({ data, enableInlineEditing }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    logo: data?.variants?.logo,
    title: data?.variants?.title,
    subtitle: data?.variants?.subtitle,
    text: data?.variants?.plainText,
    firstButton: data?.variants?.primaryButton,
    secondButton: data?.variants?.secondaryButton,
    formLinks: data?.variants?.formLinks,
    signInLink: data?.variants?.signinLink,
    form: data?.variants?.form,
  };

  if(Variant) {
    if(enableInlineEditing) {
      return (
        <EditSection 
          documentId={data?._id} 
          documentType={data?._type} 
          children={
            <Variant {...props} />
          } 
        /> 
      )
    }

    return <Variant {...props} />
  } 
}
export default React.memo(SignUpForm);
