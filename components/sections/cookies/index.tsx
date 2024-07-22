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
  block?: any;
  config: {
    enableAnalytics: boolean;
    cookiePolicy?: {
      siteName: string;
      cookiePolicyPage: any;
    };
    consentModal?: {
      position: ConsentModalPosition;
    };
  };
}

function Cookies({ data }: SectionsProps) {
  const variant = data?.variant;
  const Variant = Variants?.[variant];

  console.log("data", data);
  const props = {
    title: data?.variants?.heading,
    description: data?.variants?.description,
    allowCookieBtn: data?.variants?.acceptButtonLabel,
    denyCookieBtn: data?.variants?.declineButtonLabel,
    block: data?.variants?.block,
    config: data?.variants?.config,
  };

  return Variant ? <Variant {...props} /> : null;
}
export default React.memo(Cookies);
