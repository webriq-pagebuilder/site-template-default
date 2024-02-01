// referenced from: https://github.com/garmeeh/next-seo/blob/master/src/jsonld/jsonld.tsx

import React from "react";
import toJson from "../toJson";
import { SEOJsonLdProps } from "../types";

function SEOJsonLd({ type, pageData, scriptKey, ...rest }: SEOJsonLdProps) {
  return (
    <script
      key={`${scriptKey}-jsonld`}
      type="application/ld+json"
      dangerouslySetInnerHTML={toJson(
        type,
        pageData === undefined ? { ...rest } : pageData
      )}
    />
  );
}

export { SEOJsonLd };
