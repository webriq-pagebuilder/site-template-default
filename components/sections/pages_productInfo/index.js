import React from "react";
import dynamic from "next/dynamic";
import { EcwidContextProvider } from "context/EcwidContext";
import EditSection from "components/EditSection";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function PagesProductInfo({ data, enableInlineEditing }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    products: data?.variants?.products,
  };

  return (
    <EcwidContextProvider>
      {enableInlineEditing && <EditSection documentType={data?._type} documentId={data?._id} />}
      {Variant ? <Variant {...props} /> : null}
    </EcwidContextProvider>
  )
}
export default React.memo(PagesProductInfo);
