import React from "react";
import Head from "next/head";
import dynamic from "next/dynamic";
import { homeQuery } from "./api/query";
import { getClient, usePreviewSubscription } from "../lib/sanity";
import NoPreview from "pages/no-preview";

const Components = {
  navigation: dynamic(() => import("../component/sections/navigation")),
  header: dynamic(() => import("../component/sections/hero")),
  pricing: dynamic(() => import("../component/sections/pricing")),
  features: dynamic(() => import("../component/sections/features")),
  team: dynamic(() => import("../component/sections/team")),
  blog: dynamic(() => import("../component/sections/blog")),
  portfolio: dynamic(() => import("../component/sections/portfolio")),
  callToAction: dynamic(() => import("../component/sections/call_to_action")),
  newsletter: dynamic(() => import("../component/sections/newsletter")),
  testimonial: dynamic(() => import("../component/sections/testimonials")),
  logoCloud: dynamic(() => import("../component/sections/logoCloud")),
  howItWorks: dynamic(() => import("../component/sections/how_it_works")),
  faqs: dynamic(() => import("../component/sections/faqs")),
  contact: dynamic(() => import("../component/sections/contact")),
  appPromo: dynamic(() => import("../component/sections/app_promo")),
  stats: dynamic(() => import("../component/sections/stats")),
  cookies: dynamic(() => import("../component/sections/cookies")),
  footer: dynamic(() => import("../component/sections/footer")),
  signInSignUp: dynamic(() => import("component/sections/sign_in_sign_up")),
  textComponent: dynamic(() => import("component/sections/text_component")),
};

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
function Home({ data, preview }) {
  let pageData;
  const { data: page } = usePreviewSubscription(homeQuery, {
    initialData: data,
    enabled: preview,
  });

  // for never published pages
  if (data?.pages?.hasNeverPublished) {
    pageData = data?.page;
  } else {
    // for published pages and pages with unpublished edits
    pageData = page?.page?.[0] || page?.[0];
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
        <title>{seo?.seoTitle ?? title}</title>
      </Head>
      {sections?.map((section, index) => {
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
            data={section}
          />
        );
      })}
    </>
  );
}

export async function getStaticProps({ preview = false }) {
  const indexPage = await getClient(preview).fetch(homeQuery);

  // pass page data and preview to helper function
  const page = filterDataToSingleItem(indexPage, preview);

  // if our query failed to return data
  // Reference: https://www.sanity.io/guides/nextjs-live-preview
  if (!page) return { notFound: true };

  return {
    props: {
      preview,
      data: { page },
    },
  };
}

export default React.memo(Home);
