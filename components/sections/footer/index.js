import React from "react";
import dynamic from "next/dynamic";
import EditSection from "components/EditSection";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
};

function Footer({ data, enableInlineEditing }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    logo: data?.variants?.logo,
    text: data?.variants?.plainText,
    contacts: data?.variants?.contactDetails,
    copyright: data?.variants?.copyright,
    socialMedia: data?.variants?.socialLinks,
    menu: data?.variants?.menu,
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
export default React.memo(Footer);
