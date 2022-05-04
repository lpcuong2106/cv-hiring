/** @type {import('next').NextConfig} */
module.exports = {
  env: {
    URL_API: process.env.URL_API,
  },
  reactStrictMode: true,
  images: {
    domains: [],
  },
  eslint: {
    // Warning: This allows production builds to successfully complete even if
    // your project has ESLint errors.
    ignoreDuringBuilds: true,
  },
  swcMinify: false,
};
