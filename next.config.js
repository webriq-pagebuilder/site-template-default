module.exports = {
  // reactStrictMode: true,
  i18n: {
    // internalized routing
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    // define list of image provider domains to be served from the Next.js Image Optimization API.
    domains: ["cdn.sanity.io", "source.unsplash.com"],
    // optimize SVG images
    dangerouslyAllowSVG: true,
    contentDispositionType: 'attachment',
    contentSecurityPolicy: "default-src 'self'; script-src 'none'; sandbox;",
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: "/studio",
        destination: process.env.SITE_SANITY_STUDIO_URL || process.env.SANITY_STUDIO_URL,
        permanent: true,
      }
    ];
  },
};
