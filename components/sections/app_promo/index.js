import React from "react";
import dynamic from "next/dynamic";
import EditSection from "components/EditSection";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
};

function AppPromo({ data, pageInfo, preview }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    logo: data?.variants?.logo,
    subtitle: data?.variants?.subtitle,
    title: data?.variants?.title,
    description: data?.variants?.description,
    statistics: data?.variants?.statItems,
    features: data?.variants?.tags,
    images: data?.variants?.images,
  };

  return (
    <>
      {preview && <EditSection documentType={data?._type} documentId={data?._id} />}
      {Variant ? <Variant {...props} /> : null}
    </>
  )
}
export default React.memo(AppPromo);
