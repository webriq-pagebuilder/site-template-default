import React from "react";
import { urlFor } from "lib/sanity";

function SEO({ data }) {
  const seo = data?.seo;
  const title = data?.title;
  const url = process.env.SITE_SANITY_STUDIO_URL || "http://localhost:3333";

  return (
    <>
      {/* Primary Meta Tags */}
      <meta name="title" content={seo?.seoTitle || title} />
      <meta name="keywords" content={seo?.seoKeywords} />
      <meta name="synonyms" content={seo?.seoSynonyms} />
      <meta name="description" content={seo?.seoDescription} />
      <meta name="image" content={urlFor(seo?.seoImage)} />
      {/* Open Graph / Facebook */}
      <meta property="og:type" content="website" />
      <meta property="og:title" content={seo?.seoTitle || title} />
      <meta property="og:url" content={url} />
      <meta property="og:description" content={seo?.seoDescription} />
      <meta property="og:image" content={urlFor(seo?.seoImage)} />
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={url} />
      <meta property="twitter:title" content={seo?.seoTitle || title} />
      <meta property="twitter:description" content={seo?.seoDescription} />
      <meta property="twitter:image" content={urlFor(seo?.seoImage)} />
    </>
  );
}

export default React.memo(SEO);
