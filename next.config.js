/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: process.env.NODE_ENV === 'development' ? false : true,
  images: {
    domains: ['www.datocms-assets.com'],
  },
};

module.exports = nextConfig;
