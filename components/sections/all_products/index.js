import { memo } from "react";
import dynamic from "next/dynamic";
import EditSection from "components/EditSection";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function AllProducts({ data, pageInfo, preview }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    products: data?.variants?.allProducts,
  };

  return (
    <>
      {preview && <EditSection documentType={data?._type} documentId={data?._id} />}
      {Variant ? <Variant {...props} /> : null}
    </>
  )
}
export default memo(AllProducts);
