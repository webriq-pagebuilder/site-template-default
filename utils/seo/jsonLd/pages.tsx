import React from "react";
import { SEOJsonLd } from "./jsonld";
import { setContactPoint } from "../helpers";
import { CorporateJsonLdProps } from "../types";

// For all pages document, set schema type to Organization (Corporate)
export function PagesJsonLd({
  type = "Corporation",
  contactPoint,
  ...rest
}: CorporateJsonLdProps) {
  const schema = {
    ...rest,
    contactPoint: contactPoint?.map(setContactPoint),
  };

  return <SEOJsonLd type={type} scriptKey="pages" {...schema} />;
}
