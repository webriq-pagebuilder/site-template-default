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
    logo: data?.variants?.[variant]?.logo,
    title: data?.variants?.[variant]?.heading,
    description: data?.variants?.[variant]?.description,
    formFields: data?.variants?.[variant]?.form?.fields,
    formId: data?.variants?.[variant]?.form?.id,
    formName: data?.variants?.[variant]?.form?.name,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Newsletter);
