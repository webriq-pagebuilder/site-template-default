import React from "react";
import { SEOJsonLd } from "./jsonld";
import { setAuthorData, setPublisherData } from "../helpers";
import { BlogJsonLdProps } from "../types";

export function BlogJsonLd({
  type = "Article",
  url,
  title,
  images,
  datePublished,
  dateModified,
  authorName,
  publisherName = undefined,
  publisherLogo = undefined,
  description,
}: BlogJsonLdProps) {
  const schema = {
    headline: title,
    description,
    datePublished,
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": url,
    },
    image: images,
    dateModified: dateModified ?? datePublished,
    author: setAuthorData(authorName),
    publisher: setPublisherData(publisherName, publisherLogo),
  };

  return <SEOJsonLd type={type} scriptKey="blog" {...schema} />;
}
