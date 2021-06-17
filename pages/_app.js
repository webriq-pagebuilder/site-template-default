import "../styles/globals.css"
import React from "react"

function MyApp({ Component, pageProps }) {

  React.useEffect(() =>  {
    if ("scrollRestoration" in window.history) {
      window.history.scrollRestoration = "auto"
    }
  },[pageProps]);
  
  return <Component {...pageProps} />
}

export default React.memo(MyApp)
