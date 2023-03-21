import { memo } from "react";
import dynamic from "next/dynamic";
import { EcwidContextProvider } from "context/EcwidContext";
import EditSection from "components/EditSection";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
};

function Wishlist({ data, pageInfo, preview }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  return Variant ? (
    <EcwidContextProvider>
      {preview && <EditSection documentId={pageInfo?.documentId} sectionId={data?._id} />}
      <Variant />
    </EcwidContextProvider>
  ) : null;
}
export default memo(Wishlist);
