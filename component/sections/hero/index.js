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
  const variant = data?.variant || data?.data?.condition;
  const Variant = Variants?.[variant];

  const props = {
    template,
    mainImage: data?.data?.mainImage,
    images: data?.data?.images,
    title: data?.data?.title,
    description: data?.data?.description,
    text: data?.data?.plainText,
    primaryButton: data?.data?.primaryButton,
    secondaryButton: data?.data?.secondaryButton,
    videoLink: data?.data?.youtubeLink,
    formFields: data?.data?.form?.fields,
    formId: data?.data?.form?.id,
    formName: data?.data?.form?.name,
    formLinks: data?.data?.formLinks,
    signInLink: data?.data?.signinLink,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(Header);
