// referenced from: https://github.com/vercel/next.js/issues/9051#issuecomment-556824393
import { SitemapStream, streamToPromise } from "sitemap";
import { IncomingMessage, ServerResponse } from "http";
import { groq } from "next-sanity";
import { sanityClient } from "@/lib/sanity.client";
import {
  NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO,
  NEXT_PUBLIC_SITE_URL,
} from "@/studio/config";

export default async function generateSitemap(
  req: IncomingMessage,
  res: ServerResponse
) {
  res.setHeader("Content-Type", "text/xml");

  // update with pages to include when generating the sitemap
  let mainPages: string[] = ["page", "post"];

  const ecommercePages = [
    "mainCollection",
    "mainProduct",
    "cartPage",
    "searchPage",
    "wishlistPage",
  ];

  if (NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO === "true") {
    mainPages = [...mainPages, ...ecommercePages];
  }

  try {
    const pages = await sanityClient.fetch(
      groq`*[_type in $pages && !(_id in path("drafts.**"))]{
        _type,
        slug != null => {
          "slug": slug.current
        },
        "publishedAt": _updatedAt
      }`,
      {
        pages: mainPages,
      }
    );

    const smStream = new SitemapStream({
      hostname: "https://" + req.headers.host,
      xmlns: {
        // trim the xml namespace
        news: true,
        xhtml: true,
        image: true,
        video: true,
        custom: [
          "xmlns:mobile='http://www.google.com/schemas/sitemap-mobile/1.0'",
        ],
      },
    });

    for (const page of pages) {
      if (page.slug && page.publishedAt) {
        smStream.write({
          url: pageUrl({ slug: page.slug, type: page._type }),
          lastmod: page.publishedAt,
          changefreq: "daily",
          priority: 0.7,
        });
      }
    }

    smStream.end();

    const sitemap = await streamToPromise(smStream).then((sm) => sm.toString());

    res.write(sitemap);
    res.end();
  } catch (error) {
    console.log("[ERROR] Failed to generate sitemap! ", error);
    res.statusCode = 500;
    res.end();
  }
}

function pageUrl({ slug, type }: { slug: string; type: string }) {
  if (type === "mainProduct") {
    return `${NEXT_PUBLIC_SITE_URL}/products/${slug}`;
  } else if (type === "mainCollection") {
    return `${NEXT_PUBLIC_SITE_URL}/collections/${slug}`;
  } else if (type === "cartPage") {
    return `${NEXT_PUBLIC_SITE_URL}/cart`;
  } else if (type === "wishlistPage") {
    return `${NEXT_PUBLIC_SITE_URL}/wishlist`;
  } else if (type === "searchPage") {
    return `${NEXT_PUBLIC_SITE_URL}/search`;
  } else {
    if (slug === "home") {
      return NEXT_PUBLIC_SITE_URL;
    }

    return `${NEXT_PUBLIC_SITE_URL}/${slug}`;
  }
}
