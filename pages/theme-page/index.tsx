import React from "react";
import Head from "next/head";
import { PreviewSuspense } from "next-sanity/preview";
import { getClient } from "lib/sanity.client";
import { usePreview } from "lib/sanity.preview";
import { themePageQuery } from "pages/api/query";
import { PageSections } from "components/page";
import { PreviewNoContent } from "components/PreviewNoContent";
import { filterDataToSingleItem } from "components/list";
import { PreviewBanner } from "components/PreviewBanner";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { CommonPageData } from "types";
import { ThemeSettings } from "components/ThemeSettings";
import { defaultThemeConfig } from "components/theme-settings/defaultThemeConfig";

import PageNotFound from "pages/404";

interface ThemePageProps {
  data: Data;
  preview: boolean;
  token?: string;
  source?: string;
  theme?: any;
}

interface Data {
  themePageData: ThemePageData;
}

export interface ThemePageData extends CommonPageData {
  collections: any;
  slug: string | string[];
  title: string;
  hasNeverPublished?: boolean | null;
  id?: string;
}

interface DocumentWithPreviewProps {
  data: Data;
  token: string | undefined | null;
}

function ThemePage ({ data, preview, token, source, theme }: ThemePageProps) {
  const showInlineEditor = source === "studio";
  const showThemeSetting = source === "theme";

  if (!preview || !showThemeSetting) {
    return <PageNotFound />; // should only access theme page in preview mode
  }

  if (preview) {
    return (
      <>
        <PreviewBanner />
        {showThemeSetting && (
          <ThemeSettings preview={preview} themeSettings={theme} />
        )}
        <PreviewSuspense fallback="Loading...">
          <InlineEditorContextProvider showInlineEditor={showInlineEditor}>
            <DocumentWithPreview {...{ data, token }} />
          </InlineEditorContextProvider>
        </PreviewSuspense>
      </>
    );
  }
}

/**
 *
 * @param data Data from getStaticProps based on current slug value
 * @param token Token value supplied via `/api/preview` route
 *
 * @returns Document with preview data
 */
function DocumentWithPreview({ data, token = null }: DocumentWithPreviewProps) {
  const previewDataEventSource = usePreview(token, themePageQuery);
  const previewData: ThemePageData =
    previewDataEventSource?.[0] || previewDataEventSource;

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  return (
    <>
      <Head>
        <title>StackShift Studio | Theme Page</title>
      </Head>

      {/* if no sections, show no sections only in preview */}
      {(!previewData ||
        !previewData?.sections ||
        previewData?.sections?.length === 0) && <PreviewNoContent />}

      {/*  Show page sections */}
      {data?.themePageData && <PageSections data={previewData} />}
    </>
  );
}

export async function getStaticProps({
  preview = false,
  previewData = {},
}: any): Promise<{ props: ThemePageProps }> {
  const client =
    preview && previewData?.token
      ? getClient(preview).withConfig({ token: previewData.token })
      : getClient(false);

  const themeQuery = preview
    ? "*[_type=='themeSettings'][0]"
    : "*[_type=='themeSettings' && !(_id in path('drafts.**'))][0]";
  
  const [themePage, themeConfig] = await Promise.all([
    client.fetch(themePageQuery),
    client.fetch(themeQuery),
  ]);

  const theme = themeConfig || defaultThemeConfig;

  // pass page data and preview to helper function
  const themePageData: ThemePageData = filterDataToSingleItem(themePage, preview);

  const data = { themePageData };

  return {
    props: {
      theme,
      preview,
      token: (preview && previewData.token) || "",
      source: (preview && previewData.source) || "",
      data,
    },
  };
}

export default React.memo(ThemePage);
