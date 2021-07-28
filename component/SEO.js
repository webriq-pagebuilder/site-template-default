import React from "react";
import { urlFor } from "lib/sanity";

function SEO({ data, slug }) {
  const seo = data?.seo;
  const title = data?.title;
  const url = `${typeof window !== "undefined"
    ? process.env.NEXT_PUBLIC_SITE_URL
    : "http://localhost:3000"}/${slug ?? ""}`;

  return (
    <>
      {/* Primary Meta Tags */}
      <meta name="title" content={seo?.seoTitle ?? title} />
      <meta name="keywords" content={seo?.seoKeywords} />
      <meta name="synonyms" content={seo?.seoSynonyms} />
      <meta name="description" content={seo?.seoDescription} />
      {/* Open Graph / Facebook */}
      <meta property="og:title" content={seo?.seoTitle ?? title} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={seo?.seoDescription} />
      <meta property="og:image" content={urlFor(seo?.seoImage)?.width(500)?.url()} />
      {/* Twitter */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:url" content={url} />
      <meta name="twitter:title" content={seo?.seoTitle ?? title} />
      <meta name="twitter:description" content={seo?.seoDescription} />
      <meta name="twitter:image" content={urlFor(seo?.seoImage)?.width(500)?.url()} />
    </>
  );
}

export default React.memo(SEO);
