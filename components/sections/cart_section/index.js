import { memo } from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
};

function Cart({ data }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  return Variant ? <Variant /> : null;
}
export default memo(Cart);
