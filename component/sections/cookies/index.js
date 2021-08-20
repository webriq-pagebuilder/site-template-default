import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
  variant_e: dynamic(() => import("./variant_e")),
  variant_f: dynamic(() => import("./variant_f")),
};

function Cookies({ data }) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    title: data?.content?.[variant]?.heading,
    allowCookieBtn: data?.content?.[variant]?.acceptButtonLabel,
    denyCookieBtn: data?.content?.[variant]?.declineButtonLabel,
    block: data?.content?.[variant]?.block,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Cookies);
