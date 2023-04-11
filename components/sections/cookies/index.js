import React from "react";
import dynamic from "next/dynamic";
import EditSection from "components/EditSection";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
  variant_e: dynamic(() => import("./variant_e")),
};

function Cookies({ data, enableInlineEditing }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    title: data?.variants?.heading,
    allowCookieBtn: data?.variants?.acceptButtonLabel,
    denyCookieBtn: data?.variants?.declineButtonLabel,
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
export default React.memo(Cookies);
