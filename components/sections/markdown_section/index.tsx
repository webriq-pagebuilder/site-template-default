import { memo } from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
};

function MarkdownSection({ data }: { data: any }) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    content: data?.variants?.content,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default memo(MarkdownSection);
