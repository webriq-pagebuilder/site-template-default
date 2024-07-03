import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import { NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO } from "studio/config";
import React, { useEffect } from "react";
import useScript from "utils/useScript";
import { useRouter } from "next/router";

function App({ Component, pageProps }: AppProps) {
  const { seo = [], seoSchema = {} } = pageProps;

  if (NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO === "true") {
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
      }
    }, [script_status]);
  }

  return (
    <>
      <Head>
        {seo?.map((tags) => {
          if (tags?.key === "page-title") {
            return <title key={tags?.key}>{tags?.title}</title>;
          } else if (tags?.href) {
            return <link {...tags} key={tags?.key} />;
          } else if (tags) {
            return <meta {...tags} key={tags?.key} />;
          }
        })}
        {seoSchema && (
          <script
            key={seoSchema?.key}
            type="application/ld+json"
            dangerouslySetInnerHTML={seoSchema?.innerHTML}
          />
        )}
      </Head>
      <Component {...pageProps} />
    </>
  );
}

export default App;
