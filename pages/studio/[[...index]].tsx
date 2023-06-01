import { useEffect, useState } from "react";
import Head from "next/head";
import Image from "next/image";
import { NextStudio } from "next-sanity/studio";
import { useRouter } from "next/router";
import { StudioLayout, StudioProvider } from "sanity";
import config from "sanity.config";
import { Spinner, Text } from "@sanity/ui";
import { NEXT_PUBLIC_APP_URL } from "studio/config";
import AutologinPrepage from "studio/components/AutologinPrepage";

export default function StudioPage() {
  const router = useRouter();
  var verifyAutologinId, retries = 0;

  const [isReady, setIsReady] = useState(true);
  const [isAutologin, setIsAutologin] = useState(false);
  const [retryAutologin, setRetryAutologin] = useState(0);

  useEffect(() => {
    const urlParams = new URLSearchParams(window.location.search);
    if(router.query.token !== undefined && typeof window !== "undefined") {  
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
              }

              return res.json();
            })
            .then((result) => {
              window.localStorage.setItem([result?.token?.key], result?.token?.value);

              // verify if value was added to localStorage
              if(window.localStorage.getItem(result?.token?.key) !== null) {
                clearInterval(verifyAutologinId);
                console.log("[INFO] Successfully set autologin token!");
                setIsReady(true);
              } 

              retries++;
      
              if (retries >= 20) {
                clearInterval(verifyAutologinId);
                setRetryAutologin(retries);
              }
            })
          console.log("Autologin status: ", { ready: isReady, autologin: isAutologin, retries: retries });
        } catch(error) {
          console.log("[ERROR] Something went wrong. Failed to process autologin request. ", error);
        }
      };

      verifyAutologinId = setInterval(fetchAutologinToken, 500);
    } 
  }, [router.query])

  return (
    <>
      <Head>
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextStudio config={config}>
        <StudioProvider config={config}>
          {!isReady && isAutologin ? (
            retryAutologin >= 20 ? (
              <AutologinPrepage>
                <Image 
                  src="/assets/elements/Settings_Monochromatic-01.svg"
                  width={500}
                  height={500}
                  alt="Settings_Monochromatic-01"
                />
                <Text size={3} weight="bold">
                  Oops, unable to autologin!
                </Text>
                <Text muted size={1}>
                  Please notify WebriQ about this issue...
                </Text>
              </AutologinPrepage>
            ) : (
              // not ready, autologin, retries is less than or equal 10
              <AutologinPrepage>
                {/* <Spinner /> */}
                <span className="inline-block w-14 h-14 mb-5 border-4 border-webriq-babyblue border-b-slate-300 rounded-full animate-spin"/>
                <Text size={3} weight="bold">
                  Logging in to WebriQ Studio
                </Text>
                <Text className="animate-pulse" muted size={1}>
                  Please wait
                </Text>
              </AutologinPrepage>
            )
          ) : (
            // ready, not autologin
            <StudioLayout />
          )}
        </StudioProvider>
      </NextStudio>
    </>
  );
}
