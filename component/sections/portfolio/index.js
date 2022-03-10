import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

function Portfolio({ template, data }) {
  const variant = data?.variant || data?.data?.condition;
  const Variant = Variants?.[variant];

  const props = {
    template,
    caption: data?.data?.subtitle,
    title: data?.data?.title,
    portfoliosWithCategory: data?.data?.portfoliosWithCategories,
    portfolios: data?.data?.portfolios,
    primaryButton: data?.data?.primaryButton,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Portfolio);
