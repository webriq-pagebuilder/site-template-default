import { seoImageUrl } from "@/lib/sanity";
import { DefaultSeoData, SeoData } from "@/types";
import { BlogJsonLd, PagesJsonLd, ProductJsonLd } from "@/utils/seo/jsonLd";

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

export function SEO({
  data,
  defaultSeo,
}: {
  data: SeoData | null;
  defaultSeo: DefaultSeoData | null;
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

  const seoImageUrlWrapper = (img) => (img ? seoImageUrl(img) : null);

  const seoValues = {
    title: title || data?.title || defaultSeoTitle,
    keywords: keywords || defaultSeoKeywords,
    synonyms: synonyms || defaultSeoSynonyms,
    description: description || defaultSeoDescription,
    image: seoImageUrlWrapper(image || defaultSeoImage),
  };

  const routeHref = `${url}/${data?.route}`;

  const seoArray = [
    seoValues.title && { key: "page-title", title: seoValues.title },
    seoValues.title && {
      name: "title",
      key: "title",
      content: seoValues.title,
    },
    seoValues.title && {
      property: "og:title",
      key: "ogtitle",
      content: seoValues.title,
    },
    seoValues.title && {
      property: "twitter:title",
      key: "twittertitle",
      content: seoValues.title,
    },
    data?.route && { name: "canonical", key: "canonical", href: routeHref },
    data?.route && { property: "og:url", key: "ogurl", content: routeHref },
    data?.route && {
      property: "twitter:url",
      key: "twitterurl",
      content: routeHref,
    },
    seoValues.keywords && {
      name: "keywords",
      key: "keywords",
      content: seoValues.keywords,
    },
    seoValues.synonyms && {
      name: "synonyms",
      key: "synonyms",
      content: seoValues.synonyms,
    },
    seoValues.description && {
      name: "description",
      key: "description",
      content: seoValues.description,
    },
    seoValues.description && {
      property: "og:description",
      key: "ogdesc",
      content: seoValues.description,
    },
    seoValues.description && {
      property: "twitter:description",
      key: "twitterdesc",
      content: seoValues.description,
    },
    seoValues.image && {
      property: "og:image",
      key: "ogimage",
      content: seoValues.image,
    },
    seoValues.image && {
      property: "twitter:image",
      key: "twitterimage",
      content: seoValues.image,
    },
    {
      property: "twitter:card",
      key: "twittercard",
      content: "summary_large_image",
    },
    {
      rel: "icon",
      key: "favicon",
      href: "/favicon.ico",
    },
  ].filter((tags) => !!tags); // Remove falsy entries

  return seoArray;
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

function getSEOValue(seoData: SeoData, dataType: string) {
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

export function addSEOJsonLd({ seo, type, defaults, slug, pageData }) {
  if (type === "post") {
    // blog posts
    return BlogJsonLd({
      title: seo?.seoTitle ?? pageData?.title,
      description:
        seo?.seoDescription ??
        blogPostBody(pageData?.excerpt ?? pageData?.body) ??
        defaults?.description,
      url: `${url}/${slug?.current}`,
      images: seoImageUrl(
        seo?.seoImage ?? pageData?.mainImage ?? defaults?.image
      ),
      authorName: pageData?.authors,
      publisherName: "WebriQ",
      publisherLogo: seoImageUrl(seo?.seoImage ?? defaults?.image),
      dateModified: pageData?._updatedAt,
      datePublished: pageData?.publishedAt ?? pageData?._updatedAt,
    });
  } else if (type === "mainProduct") {
    // product pages
    return ProductJsonLd({
      productName: seo?.seoTitle ?? pageData?.name,
      images: seo?.seoImage ?? pageData?.productInfo?.images,
      url: `${url}/products/${slug}`,
      brand: "WebriQ",
      description: seo?.seoDescription ?? defaults?.description,
      price: pageData?.price,
      priceCurrency: "USD",
    });
  } else {
    // default schema type for all pages
    return PagesJsonLd({
      name: seo?.seoTitle ?? pageData?.title,
      description: seo?.seoDescription ?? defaults?.description,
      url: `${url}/${slug}`,
      logo: `${url}/favicon.ico`,
      contactPoint: contacts,
    });
  }
}
