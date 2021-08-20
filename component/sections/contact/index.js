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
    contactDescription: data?.content?.[variant]?.contactDescription,
    officeInformation: data?.content?.[variant]?.officeInformation,
    contactEmail: data?.content?.[variant]?.contactEmail,
    contactNumber: data?.content?.[variant]?.contactNumber,
    socialLinks: data?.content?.[variant]?.socialLinks,
    formFields: data?.content?.[variant]?.form?.fields,
    formId: data?.content?.[variant]?.form?.id,
    formName: data?.content?.[variant]?.form?.name,
    button: data?.content?.[variant]?.primaryButton,
    block: data?.content?.[variant]?.block,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Contact);
