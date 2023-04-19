import React from "react";
import dynamic from "next/dynamic";
import EditSection from "components/EditSection";

import { Variants } from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
  variant_d: dynamic(() => import("./variant_d")),
  variant_e: dynamic(() => import("./variant_e")),
};

function Cookies({
  data,
  enableInlineEditing,
}: {
  data: any;
  enableInlineEditing: boolean;
}) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props: Variants = {
    heading: data?.variants?.heading,
    acceptButtonLabel: data?.variants?.acceptButtonLabel,
    declineButtonLabel: data?.variants?.declineButtonLabel,
    block: data?.variants?.block,
  };

  return (
    <>
      {enableInlineEditing && (
        <EditSection documentType={data?._type} documentId={data?._id} />
      )}
      {Variant ? <Variant {...props} /> : null}
    </>
  );
}
export default React.memo(Cookies);
