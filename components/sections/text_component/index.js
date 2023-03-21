import React from "react";
import dynamic from "next/dynamic";
import EditSection from "components/EditSection";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
};

function TextComponent({ data, pageInfo, preview }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    heading: data?.variants?.title,
    firstColumn: data?.variants?.firstColumn,
    secondColumn: data?.variants?.secondColumn,
    thirdColumn: data?.variants?.thirdColumn,
  };

  return Variant ? (
    <>
      {preview && <EditSection documentId={pageInfo?.documentId} sectionId={data?._id} />}
      <Variant {...props} />
    </>
  ) : null;
}

export default React.memo(TextComponent);
