/** @type {import('next').NextConfig} */

const nextConfig = {
  i18n: {
    // internalized routing
    locales: ["en"],
    defaultLocale: "en",
  },
  compiler: {
    // ssr and displayName are configured by default
    styledComponents: true
  },
  images: {
    domains: ["cdn.sanity.io", "source.unsplash.com"]
  },
  typescript: {
    // Set this to false if you want production builds to abort if there's type errors
    ignoreBuildErrors: true,
  },
  eslint: {
    /// Set this to false if you want production builds to abort if there's lint errors
    ignoreDuringBuilds: true,
  },
  async redirects() {
    return [
      {
        source: "/home",
        destination: "/",
        permanent: true,
      },
      {
        source: '/studio',
        destination: '/studio.html',
        permanent: true
      },
    ];
  },
}

module.exports = nextConfig