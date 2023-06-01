import { useEffect, useState } from "react";
import Head from "next/head";
import { NextStudio } from "next-sanity/studio";
import { useRouter } from "next/router";
import { StudioLayout, StudioProvider } from "sanity";
import config from "sanity.config";
import { NEXT_PUBLIC_APP_URL } from "studio/config";
import AutologinPrepage from "studio/components/AutologinPrepage";

export default function StudioPage() {
  const router = useRouter();
  const startTime = Date.now();
  let intervalCount = 0; // interval count

  const [isReady, setIsReady] = useState(false);
  const [isAutologin, setIsAutologin] = useState(false);

  useEffect(() => {
    if(router?.query?.token && typeof window !== "undefined") {  
      const urlParams = new URLSearchParams(window.location.search); 

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

      // set token
      async function fetchAutologinToken() {
        // 3 retries
        while(!isReady && !isAutologin && Date.now() - startTime < 3 * 60 * 1000) {
          // increment per interval then log current count
          intervalCount++;

          console.log("🚀 ~ auto login attempts: ", intervalCount);

          try {
            console.log("Start setting up login to studio...");
            await fetch(`${NEXT_PUBLIC_APP_URL}/api/studio?${urlParams}`)
              .then((res) => {
                if (!res.ok) {
                  cleanUp();
                  console.log("[INFO] Unable to fetch autologin token! ", res);
                }

                return res.json();
              })
              .then((result) => {
                window.localStorage.setItem([result.token.key], result.token.value);

                // verify if value was added to localStorage
                if(!window.localStorage.getItem(result.token.key)) {
                  console.log("Failed to set autologin token! Retrying...")
                } else {
                  console.log("[INFO] Successfully set autologin token!");

                  setIsReady(true);
                  setIsAutologin(true);
                  router.reload();
                }
              })
          } catch(error) {
            console.log("[ERROR] Something went wrong. Failed to process autologin request. ", error);
            setIsReady(false);
          }
        }
      }
      fetchAutologinToken();
    } 
  }, [router.query])

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextStudio config={config}>
        <StudioProvider config={config}>
          {(!isReady || !isAutologin) ? (
            <AutologinPrepage 
              ready={isReady}
              autologin={isAutologin}
            />
          ): <StudioLayout />}
        </StudioProvider>
      </NextStudio>
    </>
  );
}
