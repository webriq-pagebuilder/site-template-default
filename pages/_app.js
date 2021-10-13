import "../styles/globals.css";
import React from "react";
import Head from "next/head";
import { urlFor } from "lib/sanity";

function MyApp({ Component, pageProps }) {
  const seo = pageProps?.data?.page?.[0]?.seo ?? pageProps?.data?.page?.seo;
  const title =
    pageProps?.data?.page?.[0]?.title ?? pageProps?.data?.page?.title;
  const slug = pageProps?.data?.page?.[0]?.slug ?? pageProps?.data?.page?.slug;

  const url = `${
    process.env.NODE_ENV === "development"
      ? "http://localhost:3000"
      : process.env.NEXT_PUBLIC_SITE_URL
  }/${slug ?? ""}`;

  return (
    <>
      <Head>
        {/* SEO Meta Tags */}
        <meta name="title" content={seo?.seoTitle ?? title} key="title" />
        <meta name="keywords" content={seo?.seoKeywords} key="keywords" />
        <meta name="synonyms" content={seo?.seoSynonyms} key="synonyms" />
        <meta
          name="description"
          content={seo?.seoDescription}
          key="description"
        />
        {/* Open Graph / Facebook */}
        <meta
          property="og:title"
          content={seo?.seoTitle ?? title}
          key="ogtitle"
        />
        <meta property="og:url" content={url} key="ogurl" />
        <meta
          property="og:description"
          content={seo?.seoDescription}
          key="ogdesc"
        />
        <meta property="og:title" content={seo?.seoTitle} key="ogtitle" />
        <meta
          property="og:image"
          content={urlFor(seo?.seoImage)}
          key="ogimage"
        />
        {/* Twitter */}
        <meta name="twitter:card" content="summary_large_image" key="twcard" />
        <meta name="twitter:url" content={url} key="twurl" />
        <meta
          name="twitter:title"
          content={seo?.seoTitle ?? title}
          key="twtitle"
        />
        <meta
          name="twitter:description"
          content={seo?.seoDescription}
          key="twdesc"
        />
        <meta
          name="twitter:image"
          content={urlFor(seo?.seoImage)}
          key="twimage"
        />
        <title>{seo?.seoTitle || title}</title>
        {/* PWA tags*/}
        <meta
          name="application-name"
          content={`${title} PWA` ?? "DXP Studio PWA"}
          key="appName"
        />
        <meta
          name="apple-mobile-web-app-capable"
          content="yes"
          key="appleMobileWebAppCapable"
        />
        <meta
          name="apple-mobile-web-app-status-bar-style"
          content="default"
          key="appMobileWebAppStatBarStyle"
        />
        <meta
          name="apple-mobile-web-app-title"
          content={`${title} PWA` ?? "DXP Studio PWA"}
          key="appleAppTitle"
        />
        <meta
          name="mobile-web-app-capable"
          content="yes"
          key="mobileWebAppCapable"
        />
        <meta name="theme-color" content="#0045d8" key="themeColor" />
        <link rel="manifest" href="manifest.json" />
        <link
          rel="apple-touch-icon"
          sizes="192x192"
          href="assets/icons/icon-192x192.png"
        />
        <link
          rel="apple-touch-icon"
          sizes="512x512"
          href="assets/icons/icon-512x512.png"
        />
        <link
          rel="icon"
          type="image/png"
          href="assets/icons/icon-192x192.png"
        />
        <link
          rel="mask-icon"
          href="assets/icons/settings.svg"
          color="#0045d8"
        />
        <link rel="shortcut icon" href="favicon.ico" />
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default React.memo(MyApp);
