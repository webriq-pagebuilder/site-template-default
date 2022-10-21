import "../styles/globals.css";
import React from "react";
import SEO from "../component/SEO";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import { EcwidContextProvider } from "context/EcwidContext";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  const { preview } = pageProps;
  const router = useRouter();

  // patch: cleanup `secret=<secret>&slug=<slug>` when on preview mode as this causes ECWID to refresh indefinitely
  React.useEffect(() => {
    if (
      typeof window !== "undefined" &&
      preview &&
      location.search?.includes("secret=") &&
      location.search?.includes("slug=")
    ) {
      router.push(`${window.location.pathname}`);
    }
  }, [preview, router]);

  return (
    <>
      <EcwidContextProvider>
        <SEO {...pageProps} />
        <Component {...pageProps} />
      </EcwidContextProvider>
    </>
  );
}

export default React.memo(MyApp);
