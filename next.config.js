module.exports = {
  reactStrictMode: true,
  i18n: {
    // internalized routing
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    // define list of image provider domains to be served from the Next.js Image Optimization API.
    domains: ["cdn.sanity.io"],
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
};
