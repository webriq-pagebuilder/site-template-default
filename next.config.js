// Next.JS security headers source: https://nextjs.org/docs/advanced-features/security-headers
// Next.JS next-safe package source: https://github.com/trezy/next-safe
const nextSafe = require("next-safe");
const { nanoid } = require("nanoid");
const withPWA = require("next-pwa");
const development = process.env.NODE_ENV === "development";

module.exports = withPWA({
  pwa: {
    dest: "public", // generate the service worker and workbox files into the public folder
    disable: false, // [default] generate service worker in both development and production environments
    sw: "service_worker.js", // service worker script file
  },
  target: "serverless",
  images: {
    domains: ["cdn.sanity.io"], // allow loading images from the Sanity.io CDN
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
            "img-src": "'self' data:",
            "manifest-src": "'self'",
            "object-src": "'none'",
            "prefetch-src": "'self'",
            "script-src": [
              `${
                development
                  ? `'nonce-${nanoid(
                      10
                    )}' 'unsafe-inline' 'unsafe-eval' http: https:`
                  : `'strict-dynamic' 'nonce-${nanoid(
                      10
                    )}' 'unsafe-inline' http: https:`
              }`,
            ],
            "style-src": "'unsafe-inline'",
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
