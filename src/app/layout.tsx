// app/layout.tsx
import type { Metadata } from 'next';
import './globals.css';


export const metadata: Metadata = {
  title: 'Product Search - Product Catalog',
  description: 'Browse our product catalog with advanced filtering and search',
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="antialiased">{children}</body>
    </html>
  );
}