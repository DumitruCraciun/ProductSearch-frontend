// D:\Software\ProductSearch\frontend\next.config.js

/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Elimină output: 'standalone' dacă nu e necesar
  // Elimină generateStaticParams
};

module.exports = nextConfig;