import React, { lazy, Suspense, useState } from "react";
import dynamic from "next/dynamic";
import Head from "next/head";
import { useRouter } from "next/router";
import { blogQuery, blogNavAndFooter, slugQuery } from "./api/query";
import { groq } from "next-sanity";
import NoPreview from "pages/no-preview";
import { sanityConfig } from "lib/config";
import { getClient, sanityClient } from "lib/sanity.server";

export const Components = {
  navigation: dynamic(() => import("component/sections/navigation")),
  header: dynamic(() => import("component/sections/header")),
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
  // C-Studio
  cartSection: dynamic(() => import("component/sections/cart_section")),
  featuredProducts: dynamic(() =>
    import("component/sections/featured_products")
  ),
  productInfo: dynamic(() => import("component/sections/product_info")),
  wishlistSection: dynamic(() => import("component/sections/wishlist")),
  pages_featuredProducts: dynamic(() =>
    import("component/sections/pages_featuredProducts")
  ),
  pages_productInfo: dynamic(() =>
    import("component/sections/pages_productInfo")
  ),
  allProducts: dynamic(() => import("component/sections/all_products")),
};

const BlogPage = dynamic(() => import("component/blog/"));

const PreviewMode = lazy(() => import("next-sanity/preview"));

function Page({ data: initialData = {}, preview, token }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);

  const pageData = data?.page || data?.[0];
  const slug = pageData?.slug;

  if (!router.isFallback && data.blogData) {
    return (
      <BlogPage
        data={data?.blogData}
        preview={preview}
        navAndFooter={data?.navAndFooter?.[0]?.sections}
      />
    );
  }

  if (!router.isFallback && !slug) {
    return null;
  }

  if (!pageData) {
    return null;
  }

  const { sections, title, seo } = pageData;

  /*
   *  For new unpublished pages, return page telling user that the page needs to be published first before it can be previewed
   *  This prevents showing 404 page when the page is not published yet
   */
  if (
    !pageData?.hasUnpublishedEdits &&
    pageData?._id?.includes("drafts") &&
    !preview
  ) {
    return (
      <>
        <Head>
          <meta name="viewport" content="width=260 initial-scale=1" />
          <title>Unpublished Page</title>
        </Head>
        <NoPreview />
      </>
    );
  }

  return (
    <>
      {preview && slug && (
        <Suspense fallback={null}>
          <PreviewMode
            projectId={sanityConfig.projectId}
            dataset={sanityConfig.dataset}
            initial={initialData}
            query={slugQuery}
            onChange={setData}
            token={token}
            params={{ slug }}
          />
        </Suspense>
      )}
      <Head>
        <meta name="viewport" content="width=260 initial-scale=1" />
        <title>{seo?.seoTitle ?? title}</title>
      </Head>
      {sections &&
        sections?.map((section, index) => {
          const Component = Components?.[section?._type];

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

export async function getStaticProps({
  params,
  preview = false,
  previewData = {},
}) {
  const client =
    preview && previewData?.token
      ? getClient(false).withConfig({ token: previewData.token })
      : getClient(preview);

  const [page, blogData, navAndFooter] = await Promise.all([
    client.fetch(slugQuery, { slug: params.slug }),
    client.fetch(blogQuery, { slug: params.slug }),
    client.fetch(blogNavAndFooter, { slug: params.slug }),
  ]);
  // pass page data and preview to helper function
  const singlePageData = filterDataToSingleItem(page, preview);

  if (!singlePageData) {
    return {
      notFound: true,
    };
  }

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      data: {
        page: singlePageData || null,
        blogData: blogData || null,
        navAndFooter: navAndFooter || null,
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}

export async function getStaticPaths() {
  const paths = await sanityClient.fetch(
    groq`*[_type in ["page", "post"] && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

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

export default React.memo(Page);
