import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function Newsletter({ data }) {
  const variant = data?.variant || data?.data?.condition;
  const Variant = Variants?.[variant];

  const props = {
    logo: data?.data?.logo,
    title: data?.data?.title,
    description: data?.data?.description,
    formFields: data?.data?.form?.fields,
    formId: data?.data?.form?.id,
    formName: data?.data?.form?.name,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Newsletter);
