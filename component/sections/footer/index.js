import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
};

function Footer({ data }) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    logo: data?.content?.[variant]?.logo,
    text: data?.content?.[variant]?.plainText,
    contacts: data?.content?.[variant]?.contactDetails,
    copyright: data?.content?.[variant]?.copyright,
    socialMedia: data?.content?.[variant]?.socialLinks,
    menu: data?.content?.[variant]?.menu,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Footer);
