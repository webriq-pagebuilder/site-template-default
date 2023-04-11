import React from "react";
import dynamic from "next/dynamic";
import EditSection from "components/EditSection";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function Contact({ data, enableInlineEditing }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    title: data?.variants?.title,
    contactDescription: data?.variants?.contactDescription,
    officeInformation: data?.variants?.officeInformation,
    contactEmail: data?.variants?.contactEmail,
    contactNumber: data?.variants?.contactNumber,
    socialLinks: data?.variants?.socialLinks,
    form: data?.variants?.form,
    formFields: data?.variants?.form?.fields,
    formId: data?.variants?.form?.id,
    formName: data?.variants?.form?.name,
    block: data?.variants?.block,
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
export default React.memo(Contact);
