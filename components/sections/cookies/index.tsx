// Cookie Consent for GDPR (using Orestbida)
// https://cookieconsent.orestbida.com/

import React from "react";
import dynamic from "next/dynamic";
import { Reference } from "sanity";

import { SectionsProps } from "types";
import { ConsentModalPosition } from "vanilla-cookieconsent";

const Variants = {
  variant_a: dynamic(() => import("./variant_a")),
};

export interface CookiesProps {
  title?: string;
  description?: string;
  allowCookieBtn?: string;
  denyCookieBtn?: string;
  config: {
    enableAnalytics: boolean;
    cookiePolicy?: {
      siteName: string;
      cookiePolicyPage: any;
      consentModal: {
        position: ConsentModalPosition;
      };
    };
  };
  contactLink: any;
}

function Cookies({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  const props = {
    title: data?.variants?.heading,
    description: data?.variants?.description,
    allowCookieBtn: data?.variants?.acceptButtonLabel,
    denyCookieBtn: data?.variants?.declineButtonLabel,
    config: data?.variants?.config,
    contactLink: data?.variants?.contactLink,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Cookies);
