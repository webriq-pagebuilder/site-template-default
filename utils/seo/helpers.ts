// references from : https://github.com/garmeeh/next-seo/blob/master/src/utils/schema

import { ArticleAuthor, ContactPoint, Offers } from "./types";
import { seoImageUrl } from "@/lib/sanity";

function authorData(author: string | ArticleAuthor) {
  if (typeof author === "string") {
    return {
      "@type": "Person",
      name: author,
    };
  } else if (!!author?.name) {
    return {
      "@type": author?.type ?? "Person",
      name: author?.name,
      url: author?.url,
    };
  }

  return;
}

export function ImagesData(image: any) {
  if (typeof image === "string") {
    return seoImageUrl(image);
  }

  return image?.map((item) => seoImageUrl(item?.image));
}

export function setAuthorData(author?: string | string[]) {
  if (Array.isArray(author)) {
    return author?.map((item) => authorData(item)).filter((item) => !!item);
  } else if (author) {
    return authorData(author);
  }

  return;
}

export function setPublisherData(
  publisherName: string | undefined,
  publisherLogo?: string | undefined
) {
  return {
    "@type": "Organization",
    name: publisherName,
    logo: publisherLogo,
  };
}

export function setBrandData(brand?: string) {
  return {
    "@type": "Brand",
    name: brand,
  };
}

export function setOffersData(offers?: Offers) {
  return {
    "@type": "Offer",
    url: offers?.url,
    priceCurrency: offers?.priceCurrency,
    price: offers?.price,
    itemCondition: "https://schema.org/UsedCondition",
    availability: "https://schema.org/InStock",
  };
}

export function setContactPoint(contact: ContactPoint) {
  return {
    ...contact,
    "@type": "ContactPoint",
  };
}
