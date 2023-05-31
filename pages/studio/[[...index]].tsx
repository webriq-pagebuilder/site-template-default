import { useEffect } from "react";
import Head from "next/head";
import { NextStudio } from "next-sanity/studio";
import { NextStudioHead } from "next-sanity/studio/head";
import { StudioLayout, StudioProvider } from "sanity";
import config from "sanity.config";
import { NEXT_PUBLIC_APP_URL } from "studio/config";

export default function StudioPage() {
  useEffect(() => {
    if (urlParams) {
      console.log(
        "Skipping invoking duplicate autologin script as one is already in progress..."
      );
    } else {
      var urlParams = typeof window !== "undefined" && new URLSearchParams(window.location.search);
      if (urlParams.get("token") && typeof window !== "undefined") {
        function cleanUp() {
          var localStorageItems = { ...window.localStorage };
          Object.entries(localStorageItems).every((item) => {
            var [key, value] = item;
            if (key.startsWith("__studio_auth_token")) {
              window.localStorage.removeItem(key);
            }
          });
        }
        
        cleanUp();
        fetch(`${NEXT_PUBLIC_APP_URL}/api/studio?${urlParams}`)
          .then((res) => {
            if (!res.ok) {
              cleanUp();
              alert(errorMessage);
              window.close();
            }
            return res.json();
          })
          .then((result) => {
            console.log("[INFO], Autologin successful!");
            window.localStorage.setItem([result.token.key], result.token.value);
          });
  
        var errorMessage =
          "Oops, unable to autologin! Please retry or if the problem persists, notify WebriQ about this issue ...";
        var retries = 0;
        var confirmYes = confirm("Confirm you want to autologin?");
        
        if (confirmYes) {
          var verifyAutologinId;

          function verifyAutologin() {
            if (
              Object.keys({ ...window.localStorage }).find((item) =>
                item.startsWith("__studio_auth_token")
              )
            ) {
              clearInterval(verifyAutologinId);
              window.location.href = "/studio";
              console.log("[INFO], Autologin successful!");
            }
    
            retries++;
    
            if (retries >= 20) {
              alert(errorMessage);
              cleanUp();
              window.close();
            }
          }
    
          verifyAutologinId = setInterval(verifyAutologin, 500);
        } else {
          cleanUp();
          window.close();
        } 
      } // else block is not run to set the autologin script
    }
  }, [])

  return (
    <>
      <Head>
        <NextStudioHead />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <NextStudio config={config}>
        <StudioProvider config={config}>
          <StudioLayout />
        </StudioProvider>
      </NextStudio>
    </>
  );
}
