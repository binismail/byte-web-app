// @ts-check

/**
 * @type {import('next').NextConfig}
 **/
const nextConfig = {
  reactStrictMode: true,
  swcMinify: true,
  pageExtensions: ['page.tsx', 'page.ts', 'page.jsx', 'page.js'],
  images: {
    domains: ['https://'],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'byte-biz-images-3.s3.eu-west-2.amazonaws.com',
      },
    ],
  },
};

module.exports = nextConfig;
