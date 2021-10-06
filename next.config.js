// Next.JS security headers source: https://nextjs.org/docs/advanced-features/security-headers
// Next.JS next-safe package source: https://github.com/trezy/next-safe
const nextSafe = require("next-safe");
const { nanoid } = require("nanoid");

module.exports = {
  target: "serverless",
  //add the [lang] attribute to the <html> tag
  i18n: {
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    domains: ["cdn.sanity.io"], // allow loading images from the Sanity.io CDN
    deviceSizes: [600, 640, 750, 828, 1024, 1080, 1200, 1366, 1920, 2048, 3840],
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
            "frame-ancestors": "'none'",
            "frame-src": "*",
            "img-src": "'self' data:",
            "manifest-src": "'self'",
            "object-src": "'none'",
            "prefetch-src": "'self'",
            "script-src": [
              `${
                typeof window !== "undefined"
                  ? `'strict-dynamic' 'nonce-${nanoid(
                      10
                    )}' 'unsafe-inline' http: https:`
                  : `'nonce-${nanoid(
                      10
                    )}' 'unsafe-inline' 'unsafe-eval' http: https:`
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
};
