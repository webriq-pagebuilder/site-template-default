import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function Newsletter({ data }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    logo: data?.variants?.logo,
    title: data?.variants?.title,
    description: data?.variants?.description,
    formFields: data?.variants?.form?.fields,
    formId: data?.variants?.form?.id,
    formName: data?.variants?.form?.name,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Newsletter);
