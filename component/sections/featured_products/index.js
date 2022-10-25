import { memo } from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function FeaturedProducts({ data }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    title: data?.variants?.title,
    primaryButton: data?.variants?.primaryButton,
    featured: data?.variants?.featured,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default memo(FeaturedProducts);
