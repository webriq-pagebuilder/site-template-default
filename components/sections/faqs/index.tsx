import React from "react";
import dynamic from "next/dynamic";
import EditSection from "components/EditSection";

import { Variants } from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
};

function FAQs({ data, enableInlineEditing }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props: Variants = {
    subtitle: data?.variants?.subtitle,
    title: data?.variants?.title,
    askedQuestions: data?.variants?.askedQuestions,
    faqsWithCategories: data?.variants?.faqsWithCategory,
  };

  return (
    <>
      {enableInlineEditing && (
        <EditSection documentType={data?._type} documentId={data?._id} />
      )}
      {Variant ? <Variant {...props} /> : null}
    </>
  );
}
export default React.memo(FAQs);
