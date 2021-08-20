import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
};

function FAQs({ data }) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    subtitle: data?.content?.[variant]?.subtitle,
    title: data?.content?.[variant]?.heading,
    faqs: data?.content?.[variant]?.askedQuestions,
    faqsWithCategories: data?.content?.[variant]?.faqsWithCategory,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(FAQs);
