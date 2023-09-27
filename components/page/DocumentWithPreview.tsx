import React from "react";
import Head from "next/head";
import { homeQuery } from "pages/api/query";
import { usePreview } from "lib/sanity.preview";
import { PageSections } from "components/page";
import { PreviewNoContent } from "components/PreviewNoContent";
import { SEO } from "components/list";
import { DocumentWithPreviewProps, PageData } from "pages";

/**
 *
 * @param data Data from getStaticProps based on current slug value
 * @param token Token value supplied via `/api/preview` route
 * @param source Source value supplied via `/api/preview` route
 *
 * @returns Document with preview data
 */
export function DocumentWithPreview({
  data,
  token = null,
  defaultSeo,
}: DocumentWithPreviewProps) {
  const previewDataEventSource = usePreview(token, homeQuery);

  const previewData: PageData =
    previewDataEventSource?.[0] || previewDataEventSource;

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  const { title, _type, seo } = previewData;

  return (
    <>
      <Head>
        <SEO
          data={{
            pageTitle: title,
            type: _type,
            route: previewData?.slug,
            ...seo,
          }}
          defaultSeo={defaultSeo}
        />
        <title>{seo?.seoTitle ?? title ?? "WebriQ Studio"}</title>
      </Head>

      {/* if no sections, show no sections only in preview */}

      {(!previewData ||
        !previewData?.sections ||
        previewData?.sections?.length === 0) && <PreviewNoContent />}

      {/*  Show page sections */}
      {data?.pageData && <PageSections data={previewData} />}
    </>
  );
}
