import React, { ComponentType } from "react";
import dynamic from "next/dynamic";
import EditSection from "components/EditSection";

import { SectionsProps, BlogPost, LabeledRoute } from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

//inferred type on props inside the component, use for variants
export interface BlogProps {
  subtitle?: string;
  title?: string;
  posts?: BlogPost[];
  primaryButton?: LabeledRoute;
}

function Blog({ data, enableInlineEditing }: SectionsProps) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const dataProps = {
    subtitle: data?.variants?.subtitle,
    title: data?.variants?.title,
    posts: data?.variants?.blogPosts,
    primaryButton: data?.variants?.primaryButton,
  };

  return (
    <>
      {enableInlineEditing && (
        <EditSection documentType={data?._type} documentId={data?._id} />
      )}
      {Variant ? <Variant props={dataProps} /> : null}
    </>
  );
}

export default React.memo(Blog);
