import { memo } from "react";
import dynamic from "next/dynamic";
import { EcwidContextProvider } from "context/EcwidContext";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
};

function Wishlist({ data }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  return Variant ? (
    <EcwidContextProvider>
      <Variant />
    </EcwidContextProvider>
  ) : null;
}
export default memo(Wishlist);
