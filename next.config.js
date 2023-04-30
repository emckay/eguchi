/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  pageExtensions: ["page.tsx", "api.ts"],
  experimental: {
    esmExternals: false,
  },
};

module.exports = nextConfig;
