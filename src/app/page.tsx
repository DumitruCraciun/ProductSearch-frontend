// src/app/page.tsx
'use client';

import dynamic from 'next/dynamic';

// ✅ FORȚEAZĂ GENERAREA DINAMICĂ
export const dynamic = 'force-dynamic';
export const revalidate = 0; // Dezactivează caching-ul static

// Încarcă componenta principală doar pe client
const HomePageContent = dynamic(
  () => import('./HomePageContent'),
  { 
    ssr: false,
    loading: () => (
      <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center">
        <div className="text-[#2D5A3F] text-lg">Loading products...</div>
      </div>
    )
  }
);

export default function HomePage() {
  return <HomePageContent />;
}