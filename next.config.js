// D:\Software\ProductSearch\frontend\next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },

  output: 'standalone',
  staticPageGenerationTimeout: 0,
};

module.exports = nextConfig;