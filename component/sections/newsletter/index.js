import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function Newsletter({ data }) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    logo: data?.content?.[variant]?.logo,
    title: data?.content?.[variant]?.heading,
    description: data?.content?.[variant]?.description,
    formFields: data?.content?.[variant]?.form?.fields,
    formId: data?.content?.[variant]?.form?.id,
    formName: data?.content?.[variant]?.form?.name,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Newsletter);
