import React from "react";
import { seoImageUrl } from "lib/sanity";
import { NextSeo } from "next-seo";
import { useRouter } from "next/router";
import { PageData } from "pages/[slug]";
import { BlogsData } from "types";
import { ProductData } from "pages/products/[slug]";
import { CollectionData } from "pages/collections/[slug]";
import { CartData } from "pages/cart";
import { SearchData } from "pages/search";
import { WishlistData } from "pages/wishlist";

interface SlugData {
  pageData: PageData | null;
  blogData: BlogsData | null;
}

type SEOData =
  | SlugData
  | { productData: ProductData }
  | { collectionData: CollectionData }
  | { cartData: CartData }
  | { searchData: SearchData }
  | { wishlistData: WishlistData };

type DataType =
  | PageData
  | BlogsData
  | ProductData
  | CollectionData
  | CartData
  | SearchData
  | WishlistData;

function SEO({ data }: { data: SEOData | undefined }) {
  const url = process.env.NEXT_PUBLIC_SITE_URL;
  const router = useRouter();

  const defaultTitle = "WebriQ Studio";
  const defaultDescription =
    "WebriQ Studio powers microsites with audience-specific content";
  const defaultImage =
    "https://cdn.sanity.io/images/9itgab5x/production/bfc0fab9e9b87def49b3a45c9b5bc436fa653be1-471x401.png";
  let dataType: DataType | null | undefined;

  if (data) {
    if ("pageData" in data && data?.pageData) {
      dataType = data?.pageData;
    } else if ("blogData" in data && data?.blogData) {
      dataType = data?.blogData;
    } else if ("productData" in data) {
      dataType = data?.productData;
    } else if ("collectionData" in data) {
      dataType = data?.collectionData;
    } else if ("cartData" in data) {
      dataType = data?.cartData;
    } else if ("searchData" in data) {
      dataType = data?.searchData;
    } else if ("wishlistData" in data) {
      dataType = data?.wishlistData;
    }
  }

  const finalSeo = getSEOValue(dataType, dataType?._type);
  const { title, description, image, synonyms, keywords } = finalSeo;

  return (
    <>
      <NextSeo
        title={title ?? defaultTitle}
        description={description ?? defaultDescription}
        canonical={`${url}${router?.asPath}`}
        openGraph={{
          title: title ?? defaultTitle,
          description: description ?? defaultDescription,
          url: `${url}${router?.asPath}`,
          images: [
            {
              url: image ? seoImageUrl(image) : defaultImage,
              width: 520,
              height: 320,
              alt: "Page thumbnail image for SEO",
              type: "image/jpeg",
            },
          ],
          site_name: title ?? defaultTitle,
        }} // Twitter will read the og:title, og:image and og:description tags for their card. next-seo omits twitter:title, twitter:image and twitter:description to avoid duplication.
        twitter={{
          handle: "@handle",
          site: "@site",
          cardType: "summary_large_image",
        }}
        additionalMetaTags={[
          {
            name: "keywords",
            content: keywords,
          },
          {
            name: "synonyms",
            content: synonyms,
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
    const block = body?.find(content => content._type === "block");
    description =
      block?.children?.[0]?.text?.split(". ").slice(0, 2).join(".") + ".";
  } else {
    description = body?.split(". ").slice(0, 2).join(".");
  }

  return description;
}

function getSEOValue(seoData: DataType, dataType: string) {
  const seo = {
    title: seoData?.seo?.seoTitle,
    keywords: seoData?.seo?.seoKeywords,
    synonyms: seoData?.seo?.seoSynonyms,
    description: seoData?.seo?.seoDescription,
    image: seoData?.seo?.seoImage,
  };

  if (
    (dataType === "mainCollection" || dataType === "mainProduct") &&
    "commonSections" in seoData
  ) {
    seo.title =
      seoData?.seo?.seoTitle ||
      seoData?.commonSections?.seo?.seoTitle ||
      seoData?.name;
    seo.keywords =
      seoData?.seo?.seoKeywords || seoData?.commonSections?.seo?.seoKeywords;
    seo.synonyms =
      seoData?.seo?.seoSynonyms || seoData?.commonSections?.seo?.seoSynonyms;
    seo.description =
      seoData?.seo?.seoDescription ||
      seoData?.commonSections?.seo?.seoDescription;
    seo.image =
      seoData?.seo?.seoImage || seoData?.commonSections?.seo?.seoImage;
  } else if (dataType === "post" && "excerpt" in seoData) {
    const blogDescription = blogPostBody(seoData?.excerpt || seoData?.body);
    seo.title = seoData?.seo?.seoTitle || seoData?.title;
    seo.keywords = seoData?.seo?.seoKeywords;
    seo.synonyms = seoData?.seo?.seoSynonyms;
    seo.description = seoData?.seo?.seoDescription || blogDescription;
    seo.image = seoData?.seo?.seoImage;
  } else if (dataType === "page" && "title" in seoData) {
    seo.title = seoData?.seo?.seoTitle || seoData?.title;
    seo.keywords = seoData?.seo?.seoKeywords;
    seo.synonyms = seoData?.seo?.seoSynonyms;
    seo.description = seoData?.seo?.seoDescription;
    seo.image = seoData?.seo?.seoImage;
  }
  return seo;
}

export default React.memo(SEO);
