import React from "react";
import { setAuthorData, setPublisherData } from "../helpers";
import { BlogJsonLdProps } from "../types";
import toJson from "@/utils/toJson";

export function BlogJsonLd({
  type = "BlogPosting",
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

  return toJson(type, schema);
}
