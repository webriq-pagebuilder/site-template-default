import { memo } from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function ProductInfo({ data, product }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    subtitle: data?.variants?.subtitle,
    images: data?.variants?.images,
    productDetails: data?.variants?.productDetails,
    socialLinks: data?.variants?.socialLinks,
    btnLabel: data?.variants?.btnLabel,
    product,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default memo(ProductInfo);
