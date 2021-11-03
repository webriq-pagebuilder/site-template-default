import "../styles/globals.css";
import React from "react";
import SEO from "../component/SEO";

function MyApp({ Component, pageProps }) {
  const pageData = {
    ...pageProps?.data?.page?.seo,
    title: pageProps?.data?.page?.title,
    slug: pageProps?.data?.page?.slug,
  };

  return (
    <>
      <SEO data={pageData} />
      <Component {...pageProps} />
    </>
  );
}

export default React.memo(MyApp);
