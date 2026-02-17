import React, { useEffect, useState } from "react";
import type { AppProps } from "next/app";
import { NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO } from "studio/config";
import { useRouter } from "next/router";
import { setProjectTheme } from "utils/theme";
import { getClient } from "lib/sanity.client";
import { getGlobalCookies } from "./api/query";
import { defaultThemeConfig } from "components/theme-settings/defaultThemeConfig";
import { StackShiftUIProvider } from "@stackshift-ui/system";
import { Image, Link } from "components/ui";
import { Components } from "components/list";
import Head from "next/head";
import useScript from "utils/useScript";

// global styles
import "vanilla-cookieconsent/dist/cookieconsent.css";
import "../styles/globals.css";

const Cookies = Components.cookies;

function App({ Component, pageProps }: AppProps) {
  const { seo = [], seoSchema = {}, preview, theme } = pageProps;

  const [themeConfig, setThemeConfig] = useState(theme);
  const [componentData, setComponentData] = React.useState(pageProps);

  const cookiesExcludedRoutes = [
    "/home",
    "/",
    "/studio/[[...index]]",
    "/success",
    "/no-preview",
  ];

  const router = useRouter();
  const client = getClient(preview);

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

  if (NEXT_PUBLIC_SANITY_STUDIO_IN_CSTUDIO === "true") {
    let script_status = useScript(process.env.NEXT_PUBLIC_ECWID_SCRIPT);

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
    client.fetch(
      `${query}{
        ...,
        themes[] {
          ...,
          colors {
            light {
              background,
              primary,
              secondary,
            },
            dark {
              background,
              primary,
              secondary,
            }
          }
        }
      }`
    )
    .then((initialConfig) => {
      const currentTheme = initialConfig;
      setThemeConfig(currentTheme);
    });

    // listen to real-time updates to theme settings
    const subscription = client.listen(query).subscribe((config) => {
      if (config) {
        const theme = config?.result;
        setThemeConfig(theme);
      }
    });

    return () => {
      subscription.unsubscribe();
    };
  }, [preview]);

  // fetch cookies component
  useEffect(() => {
    try {
      client.fetch(getGlobalCookies).then((cookies) => {
        if (cookies) {
          if (!cookiesExcludedRoutes?.includes(router?.route)) {
            // Set cookies at the top level of data
            const data = {
              ...pageProps.data,
              cookies,
            };
            setComponentData({ ...pageProps, data });
          }
        }
      });
    } catch (error) {
      console.log(error);
    }
  }, []);

  return (
    <>
      <Head>
        <style>:root{setProjectTheme(themeConfig ?? defaultThemeConfig)}</style>
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
      <StackShiftUIProvider components={{ Image, Link }}>
        <Component {...pageProps} />
        {/* Render Cookies globally except on whitelisted routes */}
        {componentData?.data?.cookies?.[0] &&
          !cookiesExcludedRoutes.includes(router.route) && (
            <Cookies data={componentData?.data?.cookies?.[0]} />
          )}
      </StackShiftUIProvider>
    </>
  );
}

export default App;
