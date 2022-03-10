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
  const variant = data?.variant || data?.data?.condition;
  const Variant = Variants?.[variant];

  const props = {
    title: data?.data?.heading,
    allowCookieBtn: data?.data?.acceptButtonLabel,
    denyCookieBtn: data?.data?.declineButtonLabel,
    block: data?.data?.block,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Cookies);
