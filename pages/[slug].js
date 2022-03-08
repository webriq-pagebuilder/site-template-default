import React from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { getClient, usePreviewSubscription } from "../lib/sanity";
import dynamic from "next/dynamic";
import { blogQuery, blogNavAndFooter, slugQuery } from "./api/query";
import { groq } from "next-sanity";
import NoPreview from "pages/no-preview";

const Components = {
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

/**
 * Helper function to return the correct version of the document
 * If we're in "preview mode" and have multiple documents, return the draft
 *
 * Reference: https://www.sanity.io/guides/nextjs-live-preview
 */
function filterDataToSingleItem(data, preview) {
  if (!Array.isArray(data)) {
    return data[0];
  }

  if (data.length === 1) {
    return data[0];
  } else if (data.length === 2) {
    // Published document with unpublished edits returns 2 ids (1 with draft prefix and 1 without) so array length is 2

    // add flag to differentiate a never published document from one with unpublished edits since either would have "drafts" in their ids
    data[1].hasUnpublishedEdits = true;

    // return the draft document to show live preview updates
    return data[1];
  }

  if (preview) {
    return data.find((item) => item._id.startsWith(`drafts.`)) || data[0];
  }

  return data[0];
}

function Page({ data, preview }) {
  const router = useRouter();
  if (!router.isFallback && !data?.pages?.slug) {
    return (
      <BlogPage
        data={data?.blogData}
        preview={preview}
        navAndFooter={data?.navAndFooter?.[0]?.sections}
      />
    );
  }

  const slug = data?.pages?.slug;
  let pageData;
  const { data: pages } = usePreviewSubscription(slugQuery, {
    params: { slug },
    initialData: data,
    enabled: preview,
  });

  // for never published pages, assign the draft data to the pageData
  if (!data?.pages?.hasUnpublishedEdits) {
    pageData = data?.pages;
  } else {
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
    slug: params.slug,
  });

  const blogData = await getClient(preview).fetch(blogQuery, {
    slug: params.slug,
  });

  const navAndFooter = await getClient(preview).fetch(blogNavAndFooter, {
    slug: params.slug,
  });

  // pass page data and preview to helper function
  const pages = filterDataToSingleItem(page, preview);

  // if our query failed to return data
  // Reference: https://www.sanity.io/guides/nextjs-live-preview
  if (!pages) return { notFound: true };

  return {
    props: {
      preview,
      data: {
        pages,
        blogData,
        navAndFooter,
      },
    },
  };
}

export async function getStaticPaths() {
  const paths = await getClient().fetch(
    groq`*[_type == "page" && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map((slug) => ({ params: { slug } })),
    fallback: true,
  };
}

export default React.memo(Page);
