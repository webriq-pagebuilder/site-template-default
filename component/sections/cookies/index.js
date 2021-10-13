import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a"), { ssr: false }),
  variant_b: dynamic(() => import("./variant_b"), { ssr: false }),
  variant_c: dynamic(() => import("./variant_c"), { ssr: false }),
  variant_d: dynamic(() => import("./variant_d"), { ssr: false }),
  variant_e: dynamic(() => import("./variant_e"), { ssr: false }),
  variant_f: dynamic(() => import("./variant_f"), { ssr: false }),
};

function Cookies({ data }) {
  const component = data?.variants;
  const variant = component?.variant;

  const Variant = Variants?.[variant];
  const props = {
    title: component?.[variant]?.heading,
    allowCookieBtn: component?.[variant]?.acceptButtonLabel,
    denyCookieBtn: component?.[variant]?.declineButtonLabel,
    block: component?.[variant]?.block,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Cookies);
