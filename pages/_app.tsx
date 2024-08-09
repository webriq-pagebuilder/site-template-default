import type { AppProps } from "next/app";
import Head from "next/head";
import "../styles/globals.css";
import { NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO } from "studio/config";
import React, { useEffect, useState } from "react";
import useScript from "utils/useScript";
import { useRouter } from "next/router";
import { getRGBColor } from "utils/tw-colors";
import { sanityClient } from "lib/sanity.client";

function App({ Component, pageProps }: AppProps) {
  const { seo = [], seoSchema = {}, preview } = pageProps;

  const [themeConfig, setThemeConfig] = useState({ colors: {}, font: '' })

  if (NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO === "true") {
    let script_status = useScript(process.env.NEXT_PUBLIC_ECWID_SCRIPT);
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

  // TODO: Update to only sync style changes globally on save (theme settings)
  // get current theme settings
  useEffect(() => {
    //const query = "*[_type=='themeSettings' && !(_id in path('drafts.**'))][0]"
    const query = "*[_type=='themeSettings'][0]"
    
    // get initial theme settings
    sanityClient.fetch(query).then((initialConfig) => {
      if (initialConfig.theme) {
        const theme = initialConfig.theme;
        const colors = theme?.colors;
        const rgbColors = Object.entries(colors).reduce((acc, [key, value]) => {
          acc[key] = getRGBColor(value, key);
          return acc;
        }, {});

        setThemeConfig({
          colors: rgbColors,
          font: theme?.font,
        });
      }
    });

    // listen to real-time updates to theme settings
    const subscription = sanityClient
      .listen(query)
      .subscribe((config) => {
        if (config) {
          const theme = config?.result?.theme;
          const colors = theme?.colors;
          const rgbColors = colors && Object?.entries(colors)?.reduce((acc, [key, value]) => {
            acc[key] = getRGBColor(value, key);
            return acc;
          }, {});

          setThemeConfig({
            colors: rgbColors,
            font: theme?.font,
          }); 
        }
      })
    
    return () => {
      subscription.unsubscribe();
    }
  }, [])

  return (
    <>
      <Head>
        <style>:root {`{
            ${themeConfig?.colors?.primary} 
            ${themeConfig?.colors?.secondary} 
            ${themeConfig?.colors?.light} 
            ${themeConfig?.colors?.dark} 
            ${themeConfig?.font}
          }`}
        </style>
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
