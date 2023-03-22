import React from "react";
import dynamic from "next/dynamic";
import EditSection from "components/EditSection";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
};

function Footer({ data, pageInfo, preview }) {
  const variant = data?.variant || data?.variants?.condition;
  const Variant = Variants?.[variant];

  const props = {
    logo: data?.variants?.logo,
    text: data?.variants?.plainText,
    contacts: data?.variants?.contactDetails,
    copyright: data?.variants?.copyright,
    socialMedia: data?.variants?.socialLinks,
    menu: data?.variants?.menu,
  };

  return (
    <>
      {preview && <EditSection documentType={data?._type} documentId={data?._id} />}
      {Variant ? <Variant {...props} /> : null}
    </>
  )
}
export default React.memo(Footer);
