import "../styles/globals.css";
import React from "react";
import SEO from "../component/SEO";

function MyApp({ Component, pageProps }) {
  return (
    <>
      <SEO {...pageProps} />
      <Component {...pageProps} />
    </>
  );
}

export default React.memo(MyApp);
