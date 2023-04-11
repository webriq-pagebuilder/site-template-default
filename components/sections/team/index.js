import React from "react";
import dynamic from "next/dynamic";
import EditSection from "components/EditSection";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

function Team({ data, enableInlineEditing }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    caption: data?.variants?.subtitle,
    title: data?.variants?.title,
    team: data?.variants?.teams,
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

export default React.memo(Team);
