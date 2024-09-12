import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO } from "studio/config";
import Head from "next/head";
import { useRouter } from "next/router";
import useScript from "utils/useScript";
import { getRGBColor } from "utils/theme";
import { sanityClient } from "lib/sanity.client";
import { defaultThemeConfig } from "components/theme-settings/defaultThemeConfig";

import "../styles/globals.css";

function App({ Component, pageProps, theme }: AppProps & { theme: any }) {
  const { seo = [], seoSchema = {}, preview } = pageProps;

  const [themeConfig, setThemeConfig] = useState(theme);

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

  // get current theme settings
  useEffect(() => {
    const query = preview
      ? "*[_type=='themeSettings'][0]"
      : "*[_type=='themeSettings' && !(_id in path('drafts.**'))][0]";

    // get initial theme settings
    sanityClient.fetch(query).then((initialConfig) => {
      if (initialConfig.theme) {
        const theme = initialConfig.theme;
        setThemeConfig(theme);
      }
    });

    // listen to real-time updates to theme settings if in preview mode
    if (preview) {
      const subscription = sanityClient
        .listen(query)
        .subscribe((config) => {
          if (config) {
            const theme = config?.result?.theme;
            setThemeConfig(theme);
          }
        })

      return () => {
        subscription.unsubscribe();
      };
    }
  }, [preview]);

  return (
    <>
      <Head>
        <style>:root {`{
          ${getRGBColor((themeConfig?.extend?.colors || defaultThemeConfig?.extend?.colors)?.primary, "primary")} 
          ${getRGBColor((themeConfig?.extend?.colors || defaultThemeConfig?.extend?.colors)?.secondary, "secondary")} 
          ${getRGBColor((themeConfig?.extend?.colors || defaultThemeConfig?.extend?.colors)?.light, "light")} 
          ${getRGBColor((themeConfig?.extend?.colors || defaultThemeConfig?.extend?.colors)?.dark, "dark")}
          --font-size: ${(themeConfig || defaultThemeConfig)?.["font-size"]};
          --font-weight: ${(themeConfig || defaultThemeConfig)?.["font-weight"]};
          --border-radius: ${(themeConfig || defaultThemeConfig)?.radius};
          font-family: ${(themeConfig || defaultThemeConfig)?.font};
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