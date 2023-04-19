import { memo } from "react";
import dynamic from "next/dynamic";
import { EcwidContextProvider } from "context/EcwidContext";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function FeaturedProducts({ data }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    title: data?.variants?.collections?.name,
    featured: data?.variants?.collections?.products,
  };

  return Variant ? (
    <EcwidContextProvider>
      <Variant {...props} />
    </EcwidContextProvider>
  ) : null;
}
export default memo(FeaturedProducts);
