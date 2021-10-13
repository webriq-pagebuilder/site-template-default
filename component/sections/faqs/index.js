import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a"), { ssr: false }),
  variant_b: dynamic(() => import("./variant_b"), { ssr: false }),
  variant_c: dynamic(() => import("./variant_c"), { ssr: false }),
};

function FAQs({ data }) {
  const component = data?.variants;
  const variant = component?.variant;

  const Variant = Variants?.[variant];
  const props = {
    subtitle: component?.[variant]?.subtitle,
    title: component?.[variant]?.heading,
    faqs: component?.[variant]?.askedQuestions,
    faqsWithCategories: component?.[variant]?.faqsWithCategory,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(FAQs);
