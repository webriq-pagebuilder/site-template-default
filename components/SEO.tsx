import { seoImageUrl } from "lib/sanity";
import { DefaultSeoData, SanityImage, SanitySlug } from "types";

type SEOData = {
  pageTitle: string; // page title
  route: string | SanitySlug | string[]; // page slug
  type: string; // page type e.g. blog
  seoTitle?: string;
  seoKeywords?: string;
  seoSynonyms?: string;
  seoDescription?: string;
  seoImage?: SanityImage;
};

const url = process.env.NEXT_PUBLIC_SITE_URL;

const contacts = [
  {
    "@type": "ContactPoint",
    telephone: "+1 503 436 6644",
    email: "info.webriq.com",
    contactType: "customer service",
  },
  {
    "@type": "ContactPoint",
    telephone: "+1 516 858 2325",
    email: "info.webriq.com",
    contactType: "customer service",
  },
];

function SEO({
  data,
  defaultSeo,
}: {
  data: SEOData | undefined;
  defaultSeo: DefaultSeoData;
}) {
  const {
    defaultSeoTitle,
    defaultSeoSynonyms,
    defaultSeoKeywords,
    defaultSeoDescription,
    defaultSeoImage,
  } = defaultSeo ?? {}; // add checking if defaultSeo is not null or undefined so it doesn't throw an error

  const finalSeo = getSEOValue(data, data?.type);
  const { title, description, image, synonyms, keywords } = finalSeo;

  return (
    <>
      {/* Primary Meta Tags */}
      <meta name="viewport" content="width=360 initial-scale=1" />
      <link rel="canonical" href={`${url}/${data?.route}`} />
      <meta
        name="title"
        content={title ?? data?.pageTitle ?? defaultSeoTitle}
      />
      <meta name="keywords" content={keywords ?? defaultSeoKeywords} />
      <meta name="synonyms" content={synonyms ?? defaultSeoSynonyms} />
      <meta name="description" content={description ?? defaultSeoDescription} />
      {/* Open Graph / Facebook / LinkedIn */}
      <meta property="og:url" content={`${url}/${data?.route}`} />
      <meta
        property="og:title"
        content={title ?? data?.pageTitle ?? defaultSeoTitle}
      />
      <meta
        property="og:description"
        content={description ?? defaultSeoDescription}
      />
      <meta
        property="og:image"
        content={image ? seoImageUrl(image) : seoImageUrl(defaultSeoImage)}
      />
      {/* Twitter */}
      <meta property="twitter:card" content="summary_large_image" />
      <meta property="twitter:url" content={`${url}/${data?.route}`} />
      <meta
        property="twitter:title"
        content={title ?? data?.pageTitle ?? defaultSeoTitle}
      />
      <meta
        property="twitter:description"
        content={description ?? defaultSeoDescription}
      />
      <meta
        property="twitter:image"
        content={image ? seoImageUrl(image) : seoImageUrl(defaultSeoImage)}
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

function getSEOValue(seoData: SEOData, dataType: string) {
  const seo = {
    title: seoData?.seoTitle,
    keywords: seoData?.seoKeywords,
    synonyms: seoData?.seoSynonyms,
    description: seoData?.seoDescription,
    image: seoData?.seoImage,
  };
  if (
    (dataType === "mainCollection" || dataType === "mainProduct") &&
    "commonSections" in seoData
  ) {
    seo.title = seoData?.seoTitle || seoData?.name;
    seo.keywords = seoData?.seoKeywords;
    seo.synonyms = seoData?.seoSynonyms;
    seo.description = seoData?.seoDescription;
    seo.image = seoData?.seoImage;
  } else if (dataType === "post" && "excerpt" in seoData) {
    const blogDescription = blogPostBody(seoData?.excerpt || seoData?.body);
    seo.title = seoData?.seoTitle || seoData?.title;
    seo.keywords = seoData?.seoKeywords;
    seo.synonyms = seoData?.seoSynonyms;
    seo.description = seoData?.seoDescription || blogDescription;
    seo.image = seoData?.seoImage;
  } else if (dataType === "page" && "title" in seoData) {
    seo.title = seoData?.seoTitle || seoData?.title;
    seo.keywords = seoData?.seoKeywords;
    seo.synonyms = seoData?.seoSynonyms;
    seo.description = seoData?.seoDescription;
    seo.image = seoData?.seoImage;
  }
  return seo;
}

export default SEO;

export function addSEOJsonLd({ seo, type, defaults, slug, pageData }) {
  if (type === "post") {
    // blog posts
    return {
      __html: `{
          "@context": "https://schema.org",
          "@type": "BlogPosting",
          "name": "${seo?.seoTitle ?? pageData?.title}"
          "description": "${
            seo?.seoDescription ??
            blogPostBody(pageData?.excerpt ?? pageData?.body) ??
            defaults?.description
          }",
          "url": "${url}/${slug}",
          "images": ["${
            seoImageUrl(seo?.seoImage ?? pageData?.mainImage) ?? defaults?.image
          }"],
          "datePublished": "${pageData?.publishedAt ?? pageData?._createdAt}",
          "dateModified": "${pageData?._updatedAt}",
          "author": "${pageData?.authors?.[0]?.name}"
        }
      `,
    };
  } else if (type === "mainProduct") {
    // product pages
    return {
      __html: `{
        "@context": "https://schema.org",
        "@type": "Product",
        "name": "${seo?.seoTitle ?? pageData?.title}",
        "image": ${
          pageData?.productInfo?.images?.length === 0
            ? `${seoImageUrl(seo?.seoImage)}`
            : pageData?.productInfo?.images?.map((item) =>
                seoImageUrl(item?.image)
              )
        },
        "description": "${seo?.seoDescription ?? defaults?.description}",
        "brand": {
          "@type": "Brand",
          "name": "WebriQ"
        },
        "offers": {
          "@type": "Offer",
          "url": "${url}/products/${slug}",
          "priceCurrency": "USD",
          "price": "${pageData?.price}",
          "itemCondition": "https://schema.org/UsedCondition",
          "availability": "https://schema.org/InStock"
        }
      }
    `,
    };
  } else {
    // default schema type for all pages
    return {
      __html: `{
          "@context": "https://schema.org",
          "@type": "Corporation",
          "name": "${seo?.seoTitle ?? pageData?.title}",
          "description": "${seo?.seoDescription ?? defaults?.description}",
          "url": "${url}/${slug}",
          "logo": "${seoImageUrl(seo?.seoImage) ?? defaults?.image}",
          "contactPoint": ${JSON.stringify(contacts)}
        }
      `,
    };
  }
}
