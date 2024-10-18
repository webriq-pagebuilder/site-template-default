import React, { Suspense } from "react";
import { PreviewSuspense } from "next-sanity/preview";
import { getClient } from "lib/sanity.client";
import { homeQuery, globalSEOQuery } from "./api/query";
import { usePreview } from "lib/sanity.preview";
import { PageSections } from "components/page";
import { PreviewNoContent } from "components/PreviewNoContent";
import PageNotFound from "pages/404";
import { filterDataToSingleItem } from "components/list";
import { SEO } from "components/SEO";
import { PreviewBanner } from "components/PreviewBanner";
import InlineEditorContextProvider from "context/InlineEditorContext";
import { CommonPageData, SeoTags, SeoSchema } from "types";
import { addSEOJsonLd } from "components/SEO";
import { ThemeSettings } from "components/ThemeSettings";
import { ThemeSettingsProvider } from "context/ThemeSettingsContext";
import { defaultThemeConfig } from "components/theme-settings/defaultThemeConfig";

interface HomeProps {
  data: Data;
  preview: boolean;
  token?: string | null;
  source?: string;
  seo?: SeoTags[];
  seoSchema?: SeoSchema;
  theme?: any;
}

interface DocumentWithPreviewProps {
  data: Data;
  token: string | null;
}

interface Data {
  pageData: PageData | null;
}

interface PageData extends CommonPageData {
  collections: any;
  slug: string | string[];
  title: string;
  hasNeverPublished?: boolean | null;
}

function Home({ data, preview, token, source, theme }: HomeProps) {
  const showInlineEditor = source === "studio";
  const showThemeSetting = source === "theme";

  if (!data?.pageData) {
    return null;
  } else {
    if (preview) {
      return (
        <>
          <PreviewBanner />
          {showThemeSetting && (
            <ThemeSettingsProvider preview={preview} themeSettings={theme}>
              <ThemeSettings />
            </ThemeSettingsProvider>
          )}
          <PreviewSuspense fallback="Loading...">
            <InlineEditorContextProvider showInlineEditor={showInlineEditor}>
              <DocumentWithPreview {...{ data, token }} />
            </InlineEditorContextProvider>
          </PreviewSuspense>
        </>
      );
    }

    return <Document {...{ data }} />;
  }
}

/**
 *
 * @param {data} Data from getStaticProps based on current slug value
 *
 * @returns Document with published data
 */
function Document({ data }: { data: Data }) {
  const publishedData = data?.pageData;

  // General safeguard against empty data
  if (!publishedData) {
    return null;
  }

  if (publishedData?.hasNeverPublished) {
    return null;
  }

  {
    /*  Show page sections */
  }
  return (
    <Suspense fallback={null}>
      {data?.pageData && <PageSections data={publishedData} />}
    </Suspense>
  );
}

/**
 *
 * @param data Data from getStaticProps based on current slug value
 * @param token Token value supplied via `/api/preview` route
 * @param source Source value supplied via `/api/preview` route
 *
 * @returns Document with preview data
 */
function DocumentWithPreview({ data, token = null }: DocumentWithPreviewProps) {
  const previewDataEventSource = usePreview(token, homeQuery);

  const previewData: PageData =
    previewDataEventSource?.[0] || previewDataEventSource;

  // General safeguard against empty data
  if (!previewData) {
    return null;
  }

  return (
    <>
      {/* if no sections, show no sections only in preview */}
      {(!previewData ||
        !previewData?.sections ||
        previewData?.sections?.length === 0) && <PreviewNoContent />}

      {/*  Show page sections */}
      {data?.pageData && <PageSections data={previewData} />}
    </>
  );
}

export const getStaticProps = async ({
  preview = false,
  previewData = {},
}: any): Promise<{ props: HomeProps }> => {
  const client =
    preview && previewData?.token
      ? getClient(preview).withConfig({ token: previewData.token })
      : getClient(false);

  const themeQuery = preview
    ? "*[_type=='themeSettings'][0]"
    : "*[_type=='themeSettings' && !(_id in path('drafts.**'))][0]";

  const [indexPage, globalSEO, initialConfig] = await Promise.all([
    client.fetch(homeQuery),
    client.fetch(globalSEOQuery),
    client.fetch(themeQuery),
  ]);

  const theme = initialConfig || defaultThemeConfig;

  // pass page data and preview to helper function
  const pageData: PageData = filterDataToSingleItem(indexPage, preview);

  const data = { pageData };

  // SEO tags
  const seo = SEO({
    data: {
      title: data?.pageData?.title || "StackShift | Home page",
      type: data?.pageData?._type || "page",
      route: "",
      ...data?.pageData?.seo,
    },
    defaultSeo: globalSEO,
  });

  // Structured data (JSON-LD encoding)
  const seoSchema = {
    key: `${data?.pageData?._type}-jsonld`,
    innerHTML: addSEOJsonLd({
      seo: seo,
      type: data?.pageData?._type,
      defaults: globalSEO,
      slug: "",
      pageData: data?.pageData,
    }),
  };

  // if our query failed, then return null to display custom no-preview page
  if (!pageData) {
    return {
      props: {
        theme,
        preview,
        data: { pageData: null },
        seo,
        seoSchema,
      },
    };
  }

  return {
    props: {
      theme,
      preview,
      token: (preview && previewData.token) || "",
      source: (preview && previewData.source) || "",
      data,
      seo,
      seoSchema,
    },
  };
};

export default Home;
