import { memo } from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function AllProducts({ data }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    products: data?.variants?.allProducts,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default memo(AllProducts);
