// D:\Software\ProductSearch\frontend\next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // dezactivează generarea statică
  output: 'standalone',
  // Previne generarea paginilor statice
  staticPageGenerationTimeout: 0,
  // Forțează toate paginile să fie dinamice
  generateStaticParams: async () => {
    return [];
  },
  // Dezactivează optimizarea statică
  experimental: {
    optimizeCss: false,
  },
};

module.exports = nextConfig;