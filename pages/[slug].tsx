import React from 'react';
import Head from 'next/head';
import { useRouter } from 'next/router';
import { groq } from 'next-sanity';
import { PreviewSuspense } from 'next-sanity/preview';
import { sanityClient, getClient } from 'lib/sanity.client';
import { blogQuery, slugQuery } from './api/query';
import { usePreview } from 'lib/sanity.preview';
import { PageSections } from 'components/page';
import BlogSections from 'components/blog';
import { PreviewBanner } from 'components/PreviewBanner';
import { PreviewNoContent } from 'components/PreviewNoContent';
import { filterDataToSingleItem } from 'components/list';
import PageNotFound from 'pages/404';
import {
  DocumentPresence,
  useDocumentPresence,
  useGlobalPresence,
  usePresenceStore,
  DocumentPreviewPresence,
} from 'sanity';
import {
  GetStaticPaths,
  GetStaticProps,
  GetStaticPropsContext,
  NextPage,
} from 'next';

import { PageDataProps, BlogsDataProps } from 'types';

interface PageData {
  data: {
    pageData?: PageDataProps;
    blogData?: BlogsDataProps;
  };
}

interface PageBySlugProps extends PageData {
  preview: boolean;
  token: string;
  source: string;
}

interface DocumentWithPreviewProps extends PageData {
  slug: string | string[];
  token: string;
  source: string;
}

export const PageBySlug: NextPage<PageBySlugProps> = ({
  data,
  preview,
  token,
  source,
}) => {
  const router = useRouter();
  const slug = router.query.slug;

  if (!data?.pageData && !data?.blogData) {
    return <PageNotFound />;
  } else {
    if (preview) {
      return (
        <>
          <PreviewBanner />
          <PreviewSuspense fallback='Loading...'>
            <DocumentWithPreview
              {...{ data, token: token || null, slug, source }}
            />
          </PreviewSuspense>
        </>
      );
    }

    return <Document {...{ data }} />;
  }
};

/**
 *
 * @param {data} Data from getStaticProps based on current slug value
 *
 * @returns Document with published data
 */
const Document: NextPage<PageData> = ({ data }) => {
  const publishedData = data?.pageData || data?.blogData; // latest published data in Sanity

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  const { title, seo } = publishedData;

  return (
    <>
      <Head>
        <meta name='viewport' content='width=360 initial-scale=1' />
        <title>{seo?.seoTitle ?? title ?? 'WebriQ Studio'}</title>
      </Head>

      {/*  Show page sections */}
      {data?.pageData && (
        <PageSections data={data?.pageData} enableInlineEditing={false} />
      )}

      {/* Show Blog sections */}
      {data?.blogData && <BlogSections data={data?.blogData} />}
    </>
  );
};

/**
 *
 * @param data Data from getStaticProps based on current slug value
 * @param slug Slug value from getStaticProps
 * @param token Token value supplied via `/api/preview` route
 *
 * @returns Document with preview data
 */
const DocumentWithPreview: NextPage<DocumentWithPreviewProps> = ({
  data,
  slug,
  token = null,
  source,
}) => {
  // Current drafts data in Sanity
  const previewDataEventSource = usePreview(
    token,
    data?.pageData ? slugQuery : blogQuery, // as a fallback we assume it's a blog post
    {
      slug,
    }
  );

  const previewData = previewDataEventSource?.[0] || previewDataEventSource; // Latest preview data in Sanity
  const enableInlineEditing = source === 'studio';

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  const { title, seo, _type } = previewData;

  return (
    <>
      <Head>
        <meta name='viewport' content='width=360 initial-scale=1' />
        <title>{seo?.seoTitle ?? title ?? 'WebriQ Studio'}</title>
      </Head>

      {/* if page has no sections, show no sections only in preview */}
      {_type === 'page' &&
        (!previewData ||
          !previewData?.sections ||
          previewData?.sections?.length === 0) && <PreviewNoContent />}

      {/*  Show page sections */}
      {data?.pageData && (
        <PageSections
          data={previewData}
          enableInlineEditing={enableInlineEditing}
        />
      )}

      {/* Show Blog sections */}
      {data?.blogData && <BlogSections data={previewData} />}
    </>
  );
};

export function WhoIsEditing({ documentId }) {
  const global = useGlobalPresence();
  const presence = useDocumentPresence(documentId);

  React.useEffect(() => {
    console.log({ presence, documentId, global });

    if (presence) {
      console.log('presence: ', { presence });
    }
  }, [presence, documentId, global]);

  const presenceStore = usePresenceStore();
  const [presence2, setPresence2] = React.useState([]);

  React.useEffect(() => {
    const subscription = presenceStore
      .documentPresence(documentId)
      .subscribe(nextPresence => {
        console.log('presenceStore updated ', nextPresence);
        setPresence2(nextPresence);
      });

    return () => {
      subscription.unsubscribe();
    };
  }, [documentId, presenceStore]);

  return (
    <>
      <div className='flex-start flex max-h-8 text-center'>
        <DocumentPreviewPresence presence={presence} />
      </div>
      <div
        hidden
        className='sticky bottom-0 right-0 max-w-full bg-black p-4 text-white'
      >
        <p>Presence!</p>
      </div>
    </>
  );
}

export const getStaticProps: GetStaticProps = async ({
  params,
  preview = false,
  previewData = {},
}: any) => {
  const client =
    preview && previewData?.token
      ? getClient(false).withConfig({ token: previewData.token })
      : getClient(preview);

  const [page, blogData] = await Promise.all([
    client.fetch(slugQuery, { slug: params.slug }),
    client.fetch(blogQuery, { slug: params.slug }),
  ]);

  // pass page data and preview to helper function
  const singlePageData: PageDataProps = filterDataToSingleItem(page, preview);
  const singleBlogData: BlogsDataProps = filterDataToSingleItem(
    blogData,
    preview
  );

  console.log(singleBlogData);

  return {
    props: {
      preview,
      source: (preview && previewData?.source) || '',
      token: (preview && previewData.token) || '',
      data: {
        pageData: singlePageData || null,
        blogData: singleBlogData || null,
      },
    },
    // If webhooks isn't setup then attempt to re-generate in 1 minute intervals
    revalidate: process.env.SANITY_REVALIDATE_SECRET ? undefined : 60,
  };
};

export const getStaticPaths: GetStaticPaths = async () => {
  const paths = await sanityClient.fetch(
    groq`*[_type in ["page", "post"] && defined(slug.current)][].slug.current`
  );

  return {
    paths: paths.map(slug => ({ params: { slug } })),
    fallback: true,
  };
};

export default React.memo(PageBySlug);
