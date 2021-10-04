// Next.JS security headers source: https://nextjs.org/docs/advanced-features/security-headers
// Referrer Policy security header: https://scotthelme.co.uk/a-new-security-header-referrer-policy/

const securityHeaders = [
  {
    // controls DNS prefetching; reduces latency when the user clicks a link
    key: "X-DNS-Prefetch-Control",
    value: "on",
  },
  {
    // prevent XSS exploits for websites that allow users to upload and share files
    key: "X-Content-Type-Options",
    value: "nosniff",
  },
  {
    // will not allow the secure origin to be sent on a HTTP request, only HTTPS
    key: "Referrer-Policy",
    value: "strict-origin",
  },
];

module.exports = {
  target: "serverless",
  //add the lang attribute to the html tag in Next.js
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
        // Apply these headers to all routes in your application.
        source: "/(.*)",
        headers: securityHeaders,
      },
    ];
  },
};
