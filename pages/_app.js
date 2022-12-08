import "../styles/globals.css";
import React, { useEffect } from "react";
import SEO from "../component/SEO";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import useScript from "utils/useScript";
import { useRouter } from "next/router";

function MyApp({ Component, pageProps }) {
  let script_status = useScript(process.env.NEXT_PUBLIC_ECWID_SCRIPT);
  const { preview } = pageProps;
  const router = useRouter();

  // patch: cleanup `secret=<secret>&slug=<slug>` when on preview mode as this causes ECWID to refresh indefinitely
  useEffect(() => {
    if (
      typeof window !== "undefined" &&
      preview &&
      location.search?.includes("secret=") &&
      location.search?.includes("slug=")
    ) {
      router.push(`${window.location.pathname}`);
    }
  }, [preview, router]);

  // for Ecwid script
  useEffect(() => {
    if (script_status === "ready") {
      try {
        window.Ecwid.OnAPILoaded.add(function () {
          window.Ecwid.init();
        });
        window.Ecwid.OnPageLoaded.add(function (page) {
          if (page.type === "CATEGORY" || page.type === "PRODUCT") {
            if (
              window.location.pathname === "/cart" &&
              window.location.search === ""
            ) {
              Ecwid.openPage("cart");
            } else {
              router.push("/collections/all-products");
            }
          }
        });
      } catch (error) {
        console.log(error);
      }
    }
  }, [script_status]);

  return (
    <>
      <SEO {...pageProps} />
      <Component {...pageProps} />
    </>
  );
}

export default React.memo(MyApp);
