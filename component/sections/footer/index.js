import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
};

function Footer({ data }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    logo: data?.variants?.[variant]?.logo,
    text: data?.variants?.[variant]?.plainText,
    contacts: data?.variants?.[variant]?.contactDetails,
    copyright: data?.variants?.[variant]?.copyright,
    socialMedia: data?.variants?.[variant]?.socialLinks,
    menu: data?.variants?.[variant]?.menu,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Footer);
