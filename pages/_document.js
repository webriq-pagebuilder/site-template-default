// Overrides the default Document to add things globally in Next.js

import Document, { Html, Head, Main, NextScript } from "next/document";

class MyDocument extends Document {
  render() {
    return (
      <Html lang="en">
        <Head>
          {/* meta tags */}
          <meta name="application-name" content="WebriQ DXP Studio PWA" />
          <meta name="apple-mobile-web-app-capable" content="yes" />
          <meta
            name="apple-mobile-web-app-status-bar-style"
            content="default"
          />
          <meta
            name="apple-mobile-web-app-title"
            content="WebriQ DXP Studio PWA"
          />
          <meta name="description" content="WebriQ DXP Studio PWA" />
          <meta name="mobile-web-app-capable" content="yes" />
          <meta name="theme-color" content="#0045d8" />

          {/* link tags */}
          <link rel="manifest" href="manifest.json" />
          <link
            rel="apple-touch-icon"
            sizes="192x192"
            href="assets/icons/icon-192x192.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="256x256"
            href="assets/icons/icon-256x256.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="384x384"
            href="assets/icons/icon-384x384.png"
          />
          <link
            rel="apple-touch-icon"
            sizes="512x512"
            href="assets/icons/icon-512x512.png"
          />
          <link
            rel="icon"
            type="image/png"
            href="assets/icons/icon-192x192.png"
          />
          <link
            rel="mask-icon"
            href="assets/icons/settings.svg"
            color="#0045d8"
          />
          <link rel="shortcut icon" href="favicon.ico" />
        </Head>
        <body>
          <Main />
          <NextScript />
        </body>
      </Html>
    );
  }
}

export default MyDocument;
