// next.config.ts
import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  // Dezactivează generarea paginilor statice
  output: 'standalone',
  staticPageGenerationTimeout: 0,
};

export default nextConfig;