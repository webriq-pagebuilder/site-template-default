import React from "react";
import { setAuthorData, setPublisherData } from "../helpers";
import { BlogJsonLdProps } from "../types";
import toJson, { stringify } from "utils/toJson";

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
  faqItems,
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

  if (faqItems && faqItems.length > 0) {
    const graph = {
      "@context": "https://schema.org",
      "@graph": [
        { "@type": type, ...schema },
        {
          "@type": "FAQPage",
          mainEntity: faqItems.map((f) => ({
            "@type": "Question",
            name: f.question,
            acceptedAnswer: { "@type": "Answer", text: f.answer },
          })),
        },
      ],
    };
    return { __html: stringify(graph) };
  }

  return toJson(type, schema);
}
