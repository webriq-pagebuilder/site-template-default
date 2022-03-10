import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function Contact({ data }) {
  const variant = data?.variant || data?.data?.condition;
  const Variant = Variants?.[variant];

  const props = {
    title: data?.data?.title,
    contactDescription: data?.data?.contactDescription,
    officeInformation: data?.data?.officeInformation,
    contactEmail: data?.data?.contactEmail,
    contactNumber: data?.data?.contactNumber,
    socialLinks: data?.data?.socialLinks,
    formFields: data?.data?.form?.fields,
    formId: data?.data?.form?.id,
    formName: data?.data?.form?.name,
    block: data?.data?.block,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Contact);
