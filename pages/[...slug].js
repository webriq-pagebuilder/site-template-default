import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "../lib/sanity";
import dynamic from "next/dynamic";
import {
  blogQuery,
  blogNavAndFooter,
  slugQuery,
  productsQuery,
  productCategoryQuery,
  siteSettingsQuery,
} from "./api/query";
import { groq } from "next-sanity";

export const Components = {
  navigation: dynamic(() => import("component/sections/navigation")),
  header: dynamic(() => import("component/sections/hero")),
  features: dynamic(() => import("component/sections/features")),
  portfolio: dynamic(() => import("component/sections/portfolio")),
  blog: dynamic(() => import("component/sections/blog")),
  contact: dynamic(() => import("component/sections/contact")),
  pricing: dynamic(() => import("component/sections/pricing")),
  testimonial: dynamic(() => import("component/sections/testimonials")),
  team: dynamic(() => import("component/sections/team")),
  howItWorks: dynamic(() => import("component/sections/how_it_works")),
  newsletter: dynamic(() => import("component/sections/newsletter")),
  faqs: dynamic(() => import("component/sections/faqs")),
  callToAction: dynamic(() => import("component/sections/call_to_action")),
  stats: dynamic(() => import("component/sections/stats")),
  cookies: dynamic(() => import("component/sections/cookies")),
  appPromo: dynamic(() => import("component/sections/app_promo")),
  logoCloud: dynamic(() => import("component/sections/logoCloud")),
  footer: dynamic(() => import("component/sections/footer")),
  signInSignUp: dynamic(() => import("component/sections/sign_in_sign_up")),
  textComponent: dynamic(() => import("component/sections/text_component")),
};

const BlogPage = dynamic(() => import("component/blog/"));
const ProductPage = dynamic(() => import("component/store/product"));
const CategoryPage = dynamic(() => import("component/store/category"));
const NoPreview = dynamic(() => import("pages/no-preview"));

/**
 * Helper function to return the correct version of the document
 * If we're in "preview mode" and have multiple documents, return the draft
 *
 * Reference: https://www.sanity.io/guides/nextjs-live-preview
 */
export function filterDataToSingleItem(data, preview) {
  if (!Array.isArray(data)) {
    return data[0];
  }

  if (data.length === 1) {
    // To help identify never published pages from published ones since on preview, no document with _id `drafts` is returned
    if (data[0]._id.includes("drafts")) {
      data[0].hasNeverPublished = true;
    }

    return data[0];
  } else if (data.length === 2) {
    // Published document with unpublished edits returns 2 ids (1 with draft prefix and 1 without) so array length is 2

    // add flag to differentiate a never published document from one with unpublished edits since either would have "drafts" in their ids
    data[1].hasUnpublishedEdits = true;

    // return the draft document to show live preview updates
    return data[1];
  }

  if (preview) {
    return data.find((item) => item._id.includes("drafts")) || data[0];
  }

  return data[0];
}

function Page({ data, preview }) {
  const router = useRouter();

  if (!router.isFallback && !data?.pages?.slug) {
    if (Object.keys(data?.products).length !== 0) {
      return (
        <ProductPage
          {...{
            data: data?.products?.[0],
            siteSettings: data?.siteSettings,
            preview,
          }}
        />
      );
    } else if (Object.keys(data?.categories).length !== 0) {
      return (
        <CategoryPage
          {...{
            data: data?.categories?.[0],
            siteSettings: data?.siteSettings,
            preview,
          }}
        />
      );
    } else {
      return (
        <BlogPage
          {...{
            data: blogData,
            preview,
            navAndFooter: data?.navAndFooter?.[0]?.sections,
          }}
        />
      );
    }
  }

  const slug = data?.pages?.slug;
  let pageData;
  const { data: pages } = usePreviewSubscription(slugQuery, {
    params: { slug },
    initialData: data,
    enabled: preview,
  });

  // for never published pages
  if (data?.pages?.hasNeverPublished) {
    pageData = data?.pages;
  } else {
    // for published pages and pages with unpublished edits
    pageData = pages?.pages || pages?.[0];
  }

  if (!pageData) {
    return null;
  }

  const { sections, title, seo } = pageData;

  /*
   *  For new unpublished pages, return page telling user that the page needs to be published first before it can be previewed
   *  This prevents showing 404 page when the page is not published yet
   */
  if (!pageData?.hasUnpublishedEdits && pageData?._id?.includes("drafts")) {
    return (
      <>
        <Head>
          <title>Unpublished Page</title>
        </Head>
        <NoPreview />
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{seo?.seoTitle || title}</title>
      </Head>
      {sections &&
        sections?.map((section, index) => {
          const Component = Components[section._type];

          // skip rendering unknown components
          if (!Component) {
            return null;
          }

          return (
            <Component
              key={index}
              template={{
                bg: "gray",
                color: "webriq",
              }}
              {...{ [section._type]: section }}
              data={section}
            />
          );
        })}
    </>
  );
}

export async function getStaticProps({ params, preview = false }) {
  const page = await getClient(preview).fetch(slugQuery, {
    slug: params.slug?.[0],
  });

  const blogData = await getClient(preview).fetch(blogQuery, {
    slug: params.slug?.[0],
  });

  const navAndFooter = await getClient(preview).fetch(blogNavAndFooter, {
    slug: params.slug?.[0],
  });

  const products = await getClient(preview).fetch(productsQuery, {
    slug: params.slug?.[0],
  });
  const categories = await getClient(preview).fetch(productCategoryQuery, {
    slug: params.slug?.[0],
  });

  const siteSettings = await getClient(preview).fetch(siteSettingsQuery);

  // pass page data and preview to helper function
  const pages = filterDataToSingleItem(page, preview);

  // if our query failed to return data for page, return data for blog page
  // Reference: https://www.sanity.io/guides/nextjs-live-preview
  if (!pages) {
    return {
      props: {
        preview,
        data: {
          blogData,
          navAndFooter,
          products,
          categories,
          siteSettings,
        },
      },
    };
  }

  return {
    props: {
      preview,
      data: { pages },
    },
  };
}

export async function getStaticPaths() {
  const pages = await getClient().fetch(
    groq`*[_type == "page" && defined(slug.current)][].slug.current`
  );
  const products = await getClient().fetch(
    groq`*[_type == "products" && defined(slug.current)][].slug.current`
  );
  const categories = await getClient().fetch(
    groq`*[_type == "categories" && defined(slug.current)][].slug.current`
  );

  return {
    paths: [
      ...pages.map((slug) => ({ params: { slug: [slug] } })),
      ...products.map((slug) => ({ params: { slug: [slug] } })),
      ...categories.map((slug) => ({ params: { slug: [slug] } })),
    ],
    fallback: true,
  };
}

export default React.memo(Page);
