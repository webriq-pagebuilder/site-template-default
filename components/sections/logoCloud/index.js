import React from "react";
import dynamic from "next/dynamic";
import EditSection from "components/EditSection";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

function LogoCloud({ data, pageInfo, preview }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    title: data?.variants?.title,
    images: data?.variants?.images,
    text: data?.variants?.plainText,
    button: data?.variants?.primaryButton,
  };

  return Variant ? (
    <>
      {preview && <EditSection documentId={pageInfo?.documentId} sectionId={data?._id} />}
      <Variant {...props} />
    </>
  ) : null;
}
export default React.memo(LogoCloud);
