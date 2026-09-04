// D:\Software\ProductSearch\frontend\next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Dezactivează optimizarea statică pentru toate paginile
  output: 'standalone',
  // Previne generarea paginilor statice
  staticPageGenerationTimeout: 0,
  // Forțează randarea dinamică
  generateStaticParams: async () => {
    return [];
  },
};

module.exports = nextConfig;