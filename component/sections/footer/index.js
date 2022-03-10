import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
};

function Footer({ data }) {
  const variant = data?.variant || data?.data?.condition;
  const Variant = Variants?.[variant];

  const props = {
    logo: data?.data?.logo,
    text: data?.data?.plainText,
    contacts: data?.data?.contactDetails,
    copyright: data?.data?.copyright,
    socialMedia: data?.data?.socialLinks,
    menu: data?.data?.menu,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Footer);
