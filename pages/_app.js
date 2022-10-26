import "../styles/globals.css";
import React, { useEffect } from "react";
import SEO from "../component/SEO";
import "swiper/scss";
import "swiper/scss/navigation";
import "swiper/scss/pagination";
import useScript from "utils/useScript";

function MyApp({ Component, pageProps }) {
  let script_status = useScript(process.env.NEXT_PUBLIC_ECWID_SCRIPT);
  useEffect(() => {
    if (script_status === "ready") {
      try {
        window.Ecwid.OnAPILoaded.add(function () {
          window.Ecwid.init();
        });
        window.Ecwid.OnPageLoaded.add(function (page) {
          if (page.type === "CATEGORY" || page.type === "PRODUCT") {
            Ecwid.openPage("cart");
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
