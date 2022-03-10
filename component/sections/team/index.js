import React from "react";
import dynamic from "next/dynamic";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
};

function Team({ data }) {
  const variant = data?.variant || data?.data?.condition;
  const Variant = Variants?.[variant];

  const props = {
    caption: data?.data?.subtitle,
    title: data?.data?.title,
    team: data?.data?.teams,
  };

  return Variant ? <Variant {...props} /> : null;
}

export default React.memo(Team);
