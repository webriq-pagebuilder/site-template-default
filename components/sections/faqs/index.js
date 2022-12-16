import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
};

function FAQs({ data }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    subtitle: data?.variants?.subtitle,
    title: data?.variants?.title,
    faqs: data?.variants?.askedQuestions,
    faqsWithCategories: data?.variants?.faqsWithCategory,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(FAQs);
