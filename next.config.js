/** @type {import('next').NextConfig} */
const nextConfig = {
  eslint: {
    ignoreDuringBuilds: true,
  },
  typescript: {
    ignoreBuildErrors: true,
  },
  
  output: 'standalone',
  
  // IMPORTANT: Setează un timeout rezonabil (120 secunde)
  staticPageGenerationTimeout: 120,
  
  // Previne generarea statică pentru toate paginile
  // (Forțează generarea dinamică pe server)
  experimental: {
    // Dacă folosești App Router, această opțiune ajută
  },
}

module.exports = nextConfig