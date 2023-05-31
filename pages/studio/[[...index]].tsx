import { useEffect } from "react";
import Head from "next/head";
import { NextStudio } from "next-sanity/studio";
import { NextStudioHead } from "next-sanity/studio/head";
import { StudioLayout, StudioProvider } from "sanity";
import config from "sanity.config";

export default function StudioPage() {
  var urlParams = typeof window !== "undefined" && new URLSearchParams(window.location.search);

  useEffect(() => {
    console.log("urlParams: ", urlParams);
    
    if (urlParams) {
      console.log(
        "Skipping invoking duplicate autologin script as one is already in progress..."
      );
    } else {
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
        
        window.localStorage.setItem("__studio_auth_token", urlParams.get("token"));
        console.log("[INFO], Autologin successful!");
  
        var errorMessage =
          "Oops, unable to autologin! Please retry or if the problem persists, notify WebriQ about this issue ...";
        var retries = 0;
        var confirmYes = confirm("Confirm you want to autologin?");
        if (confirmYes) {
          window.location.href = "/studio";
        } 
      } // else block is not run to set the autologin script
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
