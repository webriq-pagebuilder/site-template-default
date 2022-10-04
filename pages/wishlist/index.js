import { memo, useState, Suspense } from "react";
import Head from "next/head";
import { useRouter } from "next/router";
import { sanityConfig } from "lib/config";
import { getClient } from "lib/sanity.server";
import { wishlistPageQuery } from "pages/api/query";
import { Components, filterDataToSingleItem } from "../[slug]";
import PageNotFound from "pages/404";
import NoPreview from "pages/no-preview";

function WishlistPage({ data: initialData = {}, preview, token }) {
  const router = useRouter();
  const [data, setData] = useState(initialData);

  const wishlistData = data?.wishlistPage || data?.wishlistPage?.[0];
  const slug = wishlistData?.slug;

  if (!router.isFallback && !slug) {
    return <PageNotFound />;
  }

  if (!wishlistData) {
    return null;
  }

  const { name, sections, seo } = wishlistData;

  /*
   *  For new unpublished pages, return page telling user that the page needs to be published first before it can be previewed
   *  This prevents showing 404 page when the page is not published yet
   */
  if (
    !wishlistData?.hasUnpublishedEdits &&
    wishlistData?._id?.includes("drafts")
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
      {/* {preview && slug && (
        <Suspense fallback={null}>
          <PreviewMode
            projectId={sanityConfig.projectId}
            dataset={sanityConfig.dataset}
            initial={initialData}
            query={wishlistPageQuery}
            onChange={setData}
            token={token}
            params={{ slug }}
          />
        </Suspense>
      )} */}
      <Head>
        <meta name="viewport" content="width=260 initial-scale=1" />
        <title>{seo?.seoTitle || name}</title>
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
              data={section}
            />
          );
        })}
    </>
  );
}

export async function getStaticProps({ preview = false, previewData = {} }) {
  const client =
    preview && previewData?.token
      ? getClient(false).withConfig({ token: previewData.token })
      : getClient(preview);

  const wishlistData = await client.fetch(wishlistPageQuery);

  // pass page data and preview to helper function
  const wishlistPage = filterDataToSingleItem(wishlistData, preview);

  return {
    props: {
      preview,
      token: (preview && previewData.token) || "",
      data: { wishlistPage },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
}

export default memo(WishlistPage);
