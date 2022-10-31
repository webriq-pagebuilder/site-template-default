import React from "react";
import dynamic from "next/dynamic";
import { EcwidContextProvider } from "context/EcwidContext";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
};

function PagesFeaturedProducts({ data }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    collections: data?.variants?.collections,
  };

  return Variant ? (
    <EcwidContextProvider>
      <Variant {...props} />
    </EcwidContextProvider>
  ) : null;
}
export default React.memo(PagesFeaturedProducts);
