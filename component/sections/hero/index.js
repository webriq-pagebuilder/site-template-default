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
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    template,
    mainImage: data?.variants?.mainImage,
    images: data?.variants?.images,
    title: data?.variants?.title,
    description: data?.variants?.description,
    primaryButton: data?.variants?.primaryButton,
    secondaryButton: data?.variants?.secondaryButton,
    videoLink: data?.variants?.youtubeLink,
    formLinks: data?.variants?.formLinks,
    form: data?.variants?.form,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(Header);
