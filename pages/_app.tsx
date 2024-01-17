import type { AppProps } from "next/app";
import Script from "next/script";
import "../styles/globals.css";

function App({ Component, pageProps }: AppProps) {
  return (
    <>
      <Component {...pageProps} />

      {process.env.NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO &&
        pageProps?.hasCStudioComponents && (
          <Script
            id="ecwid-script"
            src={process.env.NEXT_PUBLIC_ECWID_SCRIPT}
            strategy="lazyOnload"
            onLoad={() => {
              try {
                window.Ecwid.OnAPILoaded.add(function () {
                  window.Ecwid.init();
                });
                window.Ecwid.OnPageLoaded.add(function (page) {
                  if (page.type === "CATEGORY" || page.type === "PRODUCT") {
                    Ecwid.openPage("cart");
                  }

                  if (page.type === "CART") {
                    let elem = document.querySelector(".ec-cart--empty button");
                    elem.addEventListener("click", (e) => {
                      e.preventDefault();
                      window.location.href = "/collections/all-products";
                    });
                  }
                });
              } catch (error) {
                console.log(error);
              }
            }}
          />
        )}
    </>
  );
}

export default App;
