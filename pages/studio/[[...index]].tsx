import { useEffect } from "react";
import Head from "next/head";
import { NextStudio } from "next-sanity/studio";
import { NextStudioHead } from "next-sanity/studio/head";
import { StudioLayout, StudioProvider } from "sanity";
import config from "sanity.config";
import { NEXT_PUBLIC_APP_URL, NEXT_PUBLIC_SANITY_API_READ_TOKEN } from "../../studio/config";

export default function StudioPage() {
  var urlParams = new URLSearchParams(window.location.search);

  useEffect(() => {
    console.log("urlParams: ", urlParams);
    if (urlParams.get("token")) {
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
          console.log("APP request: ", res.json())
          return res.json();
        })
        .then((result) => {
          console.log("[INFO], Autologin successful!");
          window.localStorage.setItem(result.token.key, result.token.value);
          console.log("API result: ", result)
          console.log("token set: ", typeof window !== undefined && window.localStorage.getItem("__studio_auth_token"))
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
    }
  }, [urlParams])

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
