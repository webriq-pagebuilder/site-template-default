import "../styles/globals.css";
import React from "react";
import SEO from "../component/SEO";
import { EcwidContextProvider } from "context/EcwidContext";

function MyApp({ Component, pageProps }) {
  return (
    <EcwidContextProvider>
      <SEO {...pageProps} />
      <Component {...pageProps} />
    </EcwidContextProvider>
  );
}

export default React.memo(MyApp);
