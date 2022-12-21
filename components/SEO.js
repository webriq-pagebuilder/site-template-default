import React from "react";
import { seoImageUrl } from "lib/sanity";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";

function SEO({ data }) {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  const router = useRouter();
  const defaultImage =
    "https://cdn.sanity.io/images/9itgab5x/production/87847cd1916f808f401597223641e927024e9eca-5750x5000.jpg";

  // determine SEO value based on props from active page
  const pagesSEO = data?.pageData?.seo ?? data?.blogData?.seo;

  // for C-Studio pages
  const productPageSEO = {
    title:
      data?.productData?.seo?.seoTitle ||
      data?.productData?.commonSections?.seo?.seoTitle ||
      data?.productData?.name,
    keywords:
      data?.productData?.seo?.seoKeywords ||
      data?.productData?.commonSections?.seo?.seoKeywords,
    synonyms:
      data?.productData?.seo?.seoSynonyms ||
      data?.productData?.commonSections?.seo?.seoSynonyms,
    description:
      data?.productData?.seo?.seoDescription ||
      data?.productData?.commonSections?.seo?.seoDescription,
    image:
      data?.productData?.seo?.seoImage ||
      data?.productData?.commonSections?.seo?.seoImage,
  };

  const collectionPageSEO = {
    title:
      data?.collectionData?.seo?.seoTitle ||
      data?.collectionData?.commonSections?.seo?.seoTitle ||
      data?.collectionData?.name,
    keywords:
      data?.collectionData?.seo?.seoKeywords ||
      data?.collectionData?.commonSections?.seo?.seoKeywords,
    synonyms:
      data?.collectionData?.seo?.seoSynonyms ||
      data?.collectionData?.commonSections?.seo?.seoSynonyms,
    description:
      data?.collectionData?.seo?.seoDescription ||
      data?.collectionData?.commonSections?.seo?.seoDescription,
    image:
      data?.collectionData?.seo?.seoImage ||
      data?.collectionData?.commonSections?.seo?.seoImage,
  };

  const cartPageSEO = {
    title: data?.cartData?.seo?.seoTitle || "Cart",
    keywords: data?.cartData?.seo?.seoKeywords,
    synonyms: data?.cartData?.seo?.seoSynonyms,
    description: data?.cartData?.seo?.seoDescription,
    image: data?.cartData?.seo?.seoImage,
  };

  const searchPageSEO = {
    title: data?.searchData?.seo?.seoTitle || "Search",
    keywords: data?.searchData?.seo?.seoKeywords,
    synonyms: data?.searchData?.seo?.seoSynonyms,
    description: data?.searchData?.seo?.seoDescription,
    image: data?.searchData?.seo?.seoImage,
  };

  const wishlistPageSEO = {
    title: data?.wishlistData?.seo?.seoTitle || "Search",
    keywords: data?.wishlistData?.seo?.seoKeywords,
    synonyms: data?.wishlistData?.seo?.seoSynonyms,
    description: data?.wishlistData?.seo?.seoDescription,
    image: data?.wishlistData?.seo?.seoImage,
  };

  const blogDescription = blogPostBody(pagesSEO?.excerpt || pagesSEO?.body);

  // final values
  const metaTitle =
    pagesSEO?.seoTitle ??
    productPageSEO?.title ??
    collectionPageSEO?.title ??
    cartPageSEO?.title ??
    searchPageSEO?.title ??
    wishlistPageSEO?.title;
  const metaDescription =
    blogDescription ??
    productPageSEO?.description ??
    collectionPageSEO?.description ??
    cartPageSEO?.description ??
    searchPageSEO?.description ??
    wishlistPageSEO?.description;
  const metaImage =
    pagesSEO?.seoImage ??
    productPageSEO?.image ??
    collectionPageSEO?.image ??
    cartPageSEO?.image ??
    wishlistPageSEO?.image ??
    searchPageSEO?.image;
  const metaKeywords =
    pagesSEO?.seoKeywords ??
    productPageSEO?.keywords ??
    collectionPageSEO?.keywords ??
    cartPageSEO?.keywords ??
    searchPageSEO?.keywords ??
    wishlistPageSEO?.keywords;
  const metaSynonyms =
    pagesSEO?.seoSynonyms ??
    productPageSEO?.synonyms ??
    collectionPageSEO?.synonyms ??
    cartPageSEO?.synonyms ??
    searchPageSEO?.synonyms ??
    wishlistPageSEO?.synonyms;

  return (
    <>
      <NextSeo
        title={metaTitle}
        description={metaDescription}
        canonical={`${url}${router?.asPath}`}
        openGraph={{
          title: metaTitle,
          description: metaDescription,
          url: `${url}${router?.asPath}`,
          images: [
            {
              url: metaImage ? seoImageUrl(metaImage) : defaultImage,
              width: 520,
              height: 320,
              alt: "Page thumbnail image for SEO",
              type: "image/jpeg",
            },
          ],
          site_name: metaTitle,
        }} // Twitter will read the og:title, og:image and og:description tags for their card. next-seo omits twitter:title, twitter:image and twitter:description to avoid duplication.
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content: metaKeywords,
          },
          {
            name: "synonyms",
            content: metaSynonyms,
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

// this function returns the first 100 characters of the blog post body or excerpt when an SEO description for the blog post is not provided
function blogPostBody(body) {
  let description;

  if (typeof body === "object" && Array.isArray(body)) {
    const block = body?.find((content) => content._type === "block");
    description =
      block?.children?.[0]?.text?.split(". ").slice(0, 2).join(".") + ".";
  } else {
    description = body?.split(". ").slice(0, 2).join(".");
  }

  return description;
}

export default React.memo(SEO);
