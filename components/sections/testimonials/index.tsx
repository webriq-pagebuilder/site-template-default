import React from "react";
import dynamic from "next/dynamic";
import EditSection from "components/EditSection";
import { SectionsProps, Testimonial } from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

export interface TestimonialProps {
  caption?: string;
  title?: string;
  testimonials?: Testimonial[];
}

function Testimonial({ data, enableInlineEditing }: SectionsProps) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    caption: data?.variants?.subtitle,
    title: data?.variants?.title,
    testimonials: data?.variants?.testimonials,
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

export default React.memo(Testimonial);
