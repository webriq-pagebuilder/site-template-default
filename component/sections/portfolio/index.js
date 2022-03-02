import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

function Portfolio({ template, data }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];
  console.log(data?.variants);
  const props = {
    template,
    caption: data?.variants?.subtitle,
    title: data?.variants?.title,
    portfolio: data?.variants?.portfolio,
    portfoliosWithCategory: data?.variants?.portfoliosWithCategories,
    portfolios: data?.variants?.portfolios,
    primaryButton: data?.variants?.primaryButton,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Portfolio);
