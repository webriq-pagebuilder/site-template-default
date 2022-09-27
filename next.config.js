module.exports = {
  // reactStrictMode: true,
  i18n: {
    // internalized routing
    locales: ["en"],
    defaultLocale: "en",
  },
  experimental: {
    images: {
      allowFutureImage: true,
    },
  },
  images: {
    // define list of image provider domains to be served from the Next.js Image Optimization API.
    domains: ["cdn.sanity.io", "source.unsplash.com"],
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
