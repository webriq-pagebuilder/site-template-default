import React from "react";
import dynamic from "next/dynamic";
import EditSection from "components/EditSection";

import { PrimaryButton, Authors } from "types";

export interface BlogProps {
  subtitle?: string;
  title?: string;
  posts?: Posts;
  primaryButton?: PrimaryButton;
}

interface Posts {
  link: string;
  authors: Authors[];
  categories: string[];
  [key: string]: any;
}

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

function Blog({
  data,
  enableInlineEditing,
}: {
  data: any;
  enableInlineEditing: boolean;
}) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props: BlogProps = {
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
      {Variant ? <Variant {...props} /> : null}
    </>
  );
}
export default React.memo(Blog);
