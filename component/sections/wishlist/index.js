import { memo } from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
};

function Wishlist({ data }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  console.log("data", data);

  return Variant ? <Variant /> : null;
}
export default memo(Wishlist);
