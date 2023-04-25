/** @type {import("next").NextConfig} */

const nextConfig = {
  i18n: {
    // internalized routing
    locales: ["en"],
    defaultLocale: "en",
  },
  images: {
    remotePatterns: [
      { hostname: "cdn.sanity.io" },
      { hostname: "source.unsplash.com" },
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
      {
        source: "/intent/:path*",
        destination: "/studio/intent/:path*",
        permanent: false
      },
      {
        source: "/webriq-forms/:path*",
        destination: "/studio/webriq-forms/:path*",
        permanent: false
      }
    ];
  }
}

export default nextConfig