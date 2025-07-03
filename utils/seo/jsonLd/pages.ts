import React from "react";
import { setContactPoint } from "../helpers";
import { CorporateJsonLdProps } from "../types";
import toJson from "utils/toJson";

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

  return toJson(type, schema);
}
