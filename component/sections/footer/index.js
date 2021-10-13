import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a"), { ssr: false }),
  variant_b: dynamic(() => import("./variant_b"), { ssr: false }),
  variant_c: dynamic(() => import("./variant_c"), { ssr: false }),
};

function Footer({ data }) {
  const component = data?.variants;
  const variant = component?.variant;

  const Variant = Variants?.[variant];
  const props = {
    logo: component?.[variant]?.logo,
    text: component?.[variant]?.plainText,
    contacts: component?.[variant]?.contactDetails,
    copyright: component?.[variant]?.copyright,
    socialMedia: component?.[variant]?.socialLinks,
    menu: component?.[variant]?.menu,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Footer);
