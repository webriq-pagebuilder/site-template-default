import { useEffect, useState } from "react";
import Head from "next/head";
import { NextStudio } from "next-sanity/studio";
import { useRouter } from "next/router";
import { StudioLayout, StudioProvider } from "sanity";
import config from "sanity.config";
import { NEXT_PUBLIC_APP_URL } from "studio/config";
import AutologinPrepage from "studio/components/AutologinPrepage";
import styles from "../../styles/Studio.module.css";

export default function StudioPage() {
  const maxRetries = 10;
  const router = useRouter();

  const [isReady, setIsReady] = useState(true);
  const [isAutologin, setIsAutologin] = useState(false);
  const [retryAutologin, setRetryAutologin] = useState(0);

  useEffect(() => {
    const urlParams = router?.asPath?.split("?")?.[1];
    if (router.query.token !== undefined && typeof window !== "undefined") {
      // cleanup (localStorage)
      function cleanUp() {
        const localStorageItems = { ...window.localStorage };
        Object.entries(localStorageItems).every((item) => {
          var [key, value] = item;
          if (key.startsWith("__studio_auth_token")) {
            window.localStorage.removeItem(key);
          }
        });
      }
      cleanUp();

      // set token
      function fetchAutologinToken() {
        try {
          console.log("Start setting up login to studio...");

          setIsAutologin(true);
          setIsReady(false);

          fetch(`${NEXT_PUBLIC_APP_URL}/api/studio?${urlParams}`)
            .then((res) => {
              if (!res.ok) {
                cleanUp();
                console.log("[INFO] Unable to fetch autologin token! ");
                setRetryAutologin(retryAutologin + 1);
              }
              return res.json();
            })
            .then((result) => {
              window.localStorage.setItem(
                [result?.token?.key],
                result?.token?.value
              );

              // verify if value was added to localStorage
              if (window.localStorage.getItem(result?.token?.key) !== null) {
                console.log("[INFO] Successfully set autologin token!");
                setIsReady(true);
              }
            });
          console.log("Autologin status: ", {
            ready: isReady,
            autologin: isAutologin,
            retries: retryAutologin,
          });
        } catch (error) {
          console.log(
            "[ERROR] Something went wrong. Failed to process autologin request. ",
            error
          );
        }
      }

      if (retryAutologin < maxRetries) {
        fetchAutologinToken();
      }
    }
  }, [router, retryAutologin]);

  if (!isReady && isAutologin) {
    return (
      <AutologinPrepage
        status={retryAutologin < maxRetries ? "retry" : "failed"}
      />
    );
  }

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
        {/* https://github.com/sanity-io/next-sanity/blob/main/packages/next-sanity/MIGRATE-v5-to-v6.md */}
        <meta
          name="viewport"
          content="width=device-width,initial-scale=1,viewport-fit=cover"
        />
      </Head>

      <NextStudio config={config}>
        <StudioProvider config={config}>
          <div
            className={`${styles["studio-nav"]} ${styles["studio-nav-bg"]}
          ${styles["studio-nav-text"]} ${styles["webriq-studio-text"]} 
          ${styles["pane-header"]} ${styles["header-plugins"]}
          ${styles["search-icon-bg"]} ${styles["search-icon"]} ${styles["list-pane"]}
          ${styles["pane-content"]} ${styles["svg-content"]} ${styles["fields"]}
          ${styles["document-panel"]} ${styles["new-document-button"]}
          ${styles["tools-menu"]} ${styles["right-nav"]} ${styles["pane-footer-url"]} ${styles["footer-right-buttons"]}
          ${styles["doc-action-button"]} ${styles["pane-footer"]}
         ${styles["media-file-metadata"]} ${styles["media-tags"]} ${styles["publish-button"]} h-screen`}
          >
            <StudioLayout />
          </div>
        </StudioProvider>
      </NextStudio>
    </>
  );
}
