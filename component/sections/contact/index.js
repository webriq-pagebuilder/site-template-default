import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function Contact({ data }) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    contactDescription: data?.variants?.[variant]?.contactDescription,
    officeInformation: data?.variants?.[variant]?.officeInformation,
    contactEmail: data?.variants?.[variant]?.contactEmail,
    contactNumber: data?.variants?.[variant]?.contactNumber,
    socialLinks: data?.variants?.[variant]?.socialLinks,
    formFields: data?.variants?.[variant]?.form?.fields,
    formId: data?.variants?.[variant]?.form?.id,
    formName: data?.variants?.[variant]?.form?.name,
    button: data?.variants?.[variant]?.primaryButton,
    block: data?.variants?.[variant]?.block,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Contact);
