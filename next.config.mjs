/** @type {import("next").NextConfig} */

const nextConfig = {
  staticPageGenerationTimeout: 900,
  i18n: {
    // internalized routing
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      { hostname: "cdn.sanity.io" },
      { hostname: "source.unsplash.com" },
      { hostname: "**.cdninstagram.com" },
    ],
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    // Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: true,
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
  async rewrites() {
    return [{ source: "/sitemap.xml", destination: "/api/sitemap" }];
  },
  compiler: {
    // Remove console logs only in production
    removeConsole:
      process.env.NODE_ENV === "production"
        ? { exclude: ["error", "info"] }
        : false,
  },
  webpack: (config) => {
    config.experiments = {
      ...config.experiments,
      topLevelAwait: true,
    };
    config.output.environment = {
      ...config.output.environment,
      asyncFunction: true,
    };
    return config;
  },
};

export default nextConfig;
