import "../styles/globals.css";

import { AppProps } from "next/app";
import { lazy, Suspense } from "react";
// import useScript from "utils/useScript";
// import { useRouter } from "next/router";

export interface SharedPageProps {
  draftMode: boolean;
  token: string;
}

const PreviewProvider = lazy(() => import("components/PreviewProvider"));

function App({ Component, pageProps }: AppProps<SharedPageProps>) {
  // let script_status = useScript(process.env.NEXT_PUBLIC_ECWID_SCRIPT);
  // const { preview } = pageProps;
  // const router = useRouter();

  // patch: cleanup `secret=<secret>&slug=<slug>` when on preview mode as this causes ECWID to refresh indefinitely
  // useEffect(() => {
  //   if (
  //     typeof window !== "undefined" &&
  //     preview &&
  //     location.search?.includes("secret=") &&
  //     location.search?.includes("slug=")
  //   ) {
  //     router.push(`${window.location.pathname}`);
  //   }
  // }, [preview, router]);

  // for Ecwid script
  // useEffect(() => {
  //   if (script_status === "ready") {
  //     try {
  //       window.Ecwid.OnAPILoaded.add(function () {
  //         window.Ecwid.init();
  //       });
  //       window.Ecwid.OnPageLoaded.add(function (page) {
  //         if (page.type === "CATEGORY" || page.type === "PRODUCT") {
  //           Ecwid.openPage("cart");
  //         }

  //         if (page.type === "CART") {
  //           let elem = document.querySelector(".ec-cart--empty button");
  //           elem.addEventListener("click", (e) => {
  //             e.preventDefault();
  //             window.location.href = "/collections/all-products";
  //           });
  //         }
  //       });
  //     } catch (error) {
  //       console.log(error);
  //     }
  //   }
  // }, [script_status]);

  const { draftMode, token } = pageProps;

  return draftMode ? (
    <PreviewProvider token={token}>
      <Component {...pageProps} />
    </PreviewProvider>
  ) : (
    <Component {...pageProps} />
  );
}

export default App;
