import React from "react";
import dynamic from "next/dynamic";
import { EcwidContextProvider } from "context/EcwidContext";
import EditSection from "components/EditSection";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function PagesProductInfo({ data, pageInfo, preview }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    products: data?.variants?.products,
  };

  return Variant ? (
    <EcwidContextProvider>
      {preview && <EditSection documentId={pageInfo?.documentId} sectionId={data?._id} />}
      <Variant {...props} />
    </EcwidContextProvider>
  ) : null;
}
export default React.memo(PagesProductInfo);
