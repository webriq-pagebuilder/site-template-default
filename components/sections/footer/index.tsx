import React from "react";
import dynamic from "next/dynamic";

import {
  SectionsProps,
  Logo,
  ContactDetails,
  SocialLink,
  LabeledRouteWithKey,
} from "types";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
  variant_b: dynamic(() => import("./variant_b")),
  variant_c: dynamic(() => import("./variant_c")),
};

export interface FooterProps {
  logo?: Logo;
  text?: string;
  contacts?: ContactDetails[];
  copyright?: string;
  socialMedia?: SocialLink[];
  menu?: LabeledRouteWithKey[];
}

function Footer({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    logo: data?.variants?.logo,
    text: data?.variants?.plainText,
    contacts: data?.variants?.contactDetails,
    copyright: data?.variants?.copyright,
    socialMedia: data?.variants?.socialLinks,
    menu: data?.variants?.menu,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Footer);
