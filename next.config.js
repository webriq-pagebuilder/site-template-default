// Next.JS security headers source: https://nextjs.org/docs/advanced-features/security-headers
// Next.JS next-safe package source: https://github.com/trezy/next-safe
const nextSafe = require("next-safe");
const { nanoid } = require("nanoid");
const withPWA = require("next-pwa");
const isDev = process.env.NODE_ENV === "development";

module.exports = withPWA({
  pwa: {
    dest: "public", // generate the service worker and workbox files into the public folder
    mode: "production", // force next-pwa to generate worker box production build
    buildExcludes: [/chunks\/.*/], // Don't precache files under .next/static/chunks
    sw: "service_worker.js", // service worker script file
    skipWaiting: true, // installs new SW when available without a promt, we only need to send a reload request to user.
    dynamicStartUrl: false, // recommended: set to false if your start url always returns same HTML document, then start url will be precached, this will help to speed up first load.
    reloadOnOnline: false, // prevents reloads on offline/online switch
    sourcemap: false,
  },
  target: "serverless",
  images: {
    domains: ["cdn.sanity.io"], // allow loading images from the Sanity.io CDN
  },
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },

  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
    ];
  },
  async headers() {
    return [
      {
        source: "/:path*",
        headers: nextSafe({
          contentTypeOptions: "nosniff",
          contentSecurityPolicy: {
            "base-uri": "'none'",
            "child-src": "'none'",
            "connect-src": "*",
            "default-src": "'self'",
            "font-src": "'self'",
            "form-action": "'self'",
            "frame-ancestors": "'self' https: http:",
            "frame-src": "*",
            "img-src": "'self' https: data:",
            "manifest-src": "'self'",
            "object-src": "'none'",
            "prefetch-src": "'self'",
            "script-src": [
              `${`'nonce-${nanoid(
                10
              )}' 'unsafe-inline' 'unsafe-eval' http: https:`}`,
            ],
            "style-src": "'unsafe-inline'",
            "style-src-elem": `${isDev ? "'unsafe-inline'" : "'self'"}`,
            "worker-src": "'self'",
            reportOnly: false,
          },
          frameOptions: "SAMEORIGIN", // indicates whether the site should be allowed to be displayed within an 'iframe'
          permissionsPolicy: {},
          permissionsPolicyDirectiveSupport: ["proposed", "standard"],
          isDev: false,
          referrerPolicy: "no-referrer",
          xssProtection: "1; mode=block",
        }),
      },
    ];
  },
});
