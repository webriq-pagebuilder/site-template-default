import React from "react";
import dynamic from "next/dynamic";
import EditSection from "components/EditSection";

import { Logo, LabeledRoute, Form } from "types";

interface CTAProps {
  logo?: Logo;
  title?: string;
  text?: string;
  button?: LabeledRoute;
  features?: string[];
  formLinks?: LabeledRoute[];
  form?: Form;
  signInLink?: LabeledRoute;
}

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
  variant_e: dynamic(() => import("./variant_e")),
};

function CallToAction({
  data,
  enableInlineEditing,
}: {
  data: any;
  enableInlineEditing: boolean;
}) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props: CTAProps = {
    logo: data?.variants?.logo,
    title: data?.variants?.title,
    text: data?.variants?.plainText,
    button: data?.variants?.primaryButton,
    features: data?.variants?.tags,
    formLinks: data?.variants?.formLinks,
    form: data?.variants?.form,
    signInLink: data?.variants?.signInLink,
  };

  return (
    <>
      {enableInlineEditing && (
        <EditSection documentType={data?._type} documentId={data?._id} />
      )}
      {Variant ? <Variant {...props} /> : null}
    </>
  );
}
export default React.memo(CallToAction);
