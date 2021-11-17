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
    image: data?.variants?.[variant]?.mainImage,
    images: data?.variants?.[variant]?.arrImages,
    title: data?.variants?.[variant]?.heading,
    description: data?.variants?.[variant]?.description,
    text: data?.variants?.[variant]?.plainText,
    primaryButton: data?.variants?.[variant]?.primaryButton,
    secondaryButton: data?.variants?.[variant]?.secondaryButton,
    videoLink: data?.variants?.[variant]?.youtubeLink,
    formFields: data?.variants?.[variant]?.form?.fields,
    formId: data?.variants?.[variant]?.form?.id,
    formName: data?.variants?.[variant]?.form?.name,
    links: data?.variants?.[variant]?.formLinks,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(Header);
