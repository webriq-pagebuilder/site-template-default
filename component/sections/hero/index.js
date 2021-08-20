import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
  variant_e: dynamic(() => import("./variant_e")),
};

function Header({ template, data }) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    template,
    image: data?.content?.[variant]?.mainImage,
    images: data?.content?.[variant]?.images,
    title: data?.content?.[variant]?.heading,
    description: data?.content?.[variant]?.description,
    text: data?.content?.[variant]?.plainText,
    primaryButton: data?.content?.[variant]?.primaryButton,
    secondaryButton: data?.content?.[variant]?.secondaryButton,
    videoLink: data?.content?.[variant]?.youtubeLink,
    formFields: data?.content?.[variant]?.form?.fields,
    formId: data?.content?.[variant]?.form?.id,
    formName: data?.content?.[variant]?.form?.name,
    links: data?.content?.[variant]?.formLinks,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(Header);
