import React from "react";
import { urlFor } from "lib/sanity";
import { NextSeo } from "next-seo";

function SEO({ data }) {
  const url = process.env.NEXT_PUBLIC_DXP_STUDIO_ADDRESS;

  return (
    <>
      <NextSeo
        openGraph={{
          title: data?.seoTitle || data?.title,
          description: data?.seoDescription,
          url: `${url}/${data?.slug || ""}`,
          images: [
            {
              url: urlFor(data?.seoImage),
              width: 800,
              height: 600,
              alt: "Page thumbnail image for SEO",
              type: "image/webp",
            },
          ],
          site_name: data?.seoTitle || data?.title,
        }} // Twitter will read the og:title, og:image and og:description tags for their card. next-seo omits twitter:title, twitter:image and twitter:description to avoid duplication.
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content: data?.seoKeywords,
          },
          {
            name: "synonyms",
            content: data?.seoSynonyms,
          },
        ]}
        additionalLinkTags={[
          // useful for PWA metatags
          {
            rel: "icon",
            href: "favicon.ico",
          },
        ]}
        robotsProps={{
          maxSnippet: -1, // maximum of [number] characters as textual snippet for this search result
          maxImagePreview: "large", // maximum size of image preview for page in search results
        }}
      />
    </>
  );
}

export default React.memo(SEO);
