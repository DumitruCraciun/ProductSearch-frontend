// src/app/HomePageContent.tsx
'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useProducts } from '../hooks/useProducts';
import { ProductList } from '../components/ProductList';
import { FilterSidebar } from '../components/FilterSidebar';
import { SearchBox } from '../components/SearchBox';
import { Pagination } from '../components/Pagination';
import { ResetButton } from '../components/ResetButton';

export default function HomePage() {
  const router = useRouter();
  const searchParams = useSearchParams();
  
  const initialSearch = searchParams.get('search') || '';
  const initialPage = parseInt(searchParams.get('page') || '1');
  const initialPackaging = searchParams.get('packaging')?.split(',') || [];
  const initialBrand = searchParams.get('brand')?.split(',') || [];
  const initialInStock = searchParams.get('inStock') === 'true';
  const initialPrinted = searchParams.get('printed') === 'true';

  const [search, setSearch] = useState(initialSearch);
  const [filters, setFilters] = useState({
    packaging: initialPackaging,
    brand: initialBrand,
    inStock: initialInStock,
    printed: initialPrinted,
  });
  const [currentPage, setCurrentPage] = useState(initialPage);
  const [sort, setSort] = useState<'name_asc' | 'name_desc' | 'stock_desc'>('name_asc');
  const searchInputRef = useRef<HTMLInputElement>(null);

  const {
    products,
    loading,
    error,
    total,
    totalPages,
    filterCounts,
    fetchProducts,
  } = useProducts();

  const updateUrl = useCallback(() => {
    const params = new URLSearchParams();
    if (search) params.set('search', search);
    if (currentPage > 1) params.set('page', String(currentPage));
    if (filters.packaging.length > 0) {
      params.set('packaging', filters.packaging.join(','));
    }
    if (filters.brand.length > 0) {
      params.set('brand', filters.brand.join(','));
    }
    if (filters.inStock) params.set('inStock', 'true');
    if (filters.printed) params.set('printed', 'true');
    
    const queryString = params.toString();
    router.replace(`/?${queryString}`);
  }, [search, currentPage, filters, router]);

  useEffect(() => {
    fetchProducts({
      page: currentPage,
      search,
      packaging: filters.packaging,
      brand: filters.brand,
      inStock: filters.inStock,
      printed: filters.printed,
      sort,
    });
  }, [fetchProducts, currentPage, search, filters, sort]);

  useEffect(() => {
    updateUrl();
  }, [updateUrl]);

  const handleFilterChange = (key: string, value: string[] | boolean) => {
    setFilters((prev) => ({ ...prev, [key]: value }));
    setCurrentPage(1);
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const handleSearchChange = (value: string) => {
    setSearch(value);
    setCurrentPage(1);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleReset = () => {
    setSearch('');
    setFilters({
      packaging: [],
      brand: [],
      inStock: false,
      printed: false,
    });
    setCurrentPage(1);
    setSort('name_asc');
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 100);
  };

  const handleEscapeClear = () => {
    setSearch('');
    setFilters({
      packaging: [],
      brand: [],
      inStock: false,
      printed: false,
    });
    setCurrentPage(1);
    setSort('name_asc');
    setTimeout(() => {
      searchInputRef.current?.focus();
    }, 50);
  };

  const hasFilters = search !== '' || 
    filters.packaging.length > 0 || 
    filters.brand.length > 0 || 
    filters.inStock || 
    filters.printed;

  // ADĂUGĂ VERIFICĂRILE ASTEA PENTRU SIGURANȚĂ:
  if (loading && products.length === 0) {
    return (
      <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center">
        <div className="text-[#2D5A3F] text-lg">Loading products...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#F2F2F2] flex items-center justify-center">
        <div className="text-red-500">Error: {error}</div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#F2F2F2]">
      {/* Header */}
      <header className="bg-[#2D5A3F] text-white py-3 sm:py-4 shadow-lg border-b-4 border-[#FFC107]">
        <div className="container mx-auto px-3 sm:px-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2 sm:gap-3">
              <div className="w-8 h-8 sm:w-10 sm:h-10 bg-[#FFC107] rounded-lg flex items-center justify-center text-[#2D5A3F] font-bold text-base sm:text-xl">
                P
              </div>
              <div>
                <h1 className="text-lg sm:text-2xl font-bold tracking-tight">Product Search</h1>
                <p className="hidden xs:block text-[10px] sm:text-xs text-gray-300">Product Catalog · Meadow Vale Foods</p>
                <p className="text-xs text-gray-300 hidden sm:block">Product Catalog · Meadow Vale Foods</p>
              </div>
            </div>
            <div className="text-xs sm:text-sm text-gray-300">
              {!loading && products && products.length > 0 && (
                <span className="bg-[#2D5A3F] px-2 py-0.5 sm:px-3 sm:py-1 rounded-full border border-[#FFC107]/30 text-xs sm:text-sm">
                  {total} products
                </span>
              )}
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="container mx-auto px-3 sm:px-4 py-4 sm:py-6">
        {/* Search and Sort */}
        <div className="flex flex-col sm:flex-row gap-3 sm:gap-4 mb-4 sm:mb-6">
          <div className="flex-1">
            <SearchBox 
              ref={searchInputRef}  
              value={search} 
              onChange={handleSearchChange} 
              onEscapeClear={handleEscapeClear}
            />
          </div>
          <div className="flex flex-wrap items-center gap-2 sm:gap-4">
            <select
              value={sort}
              onChange={(e) => setSort(e.target.value as typeof sort)}
              className="flex-1 sm:flex-none px-3 sm:px-4 py-2.5 sm:py-2 border border-[#E5E5E5] rounded-md bg-white focus:outline-none focus:ring-2 focus:ring-[#FFC107] text-sm"
            >
              <option value="name_asc">Name A-Z</option>
              <option value="name_desc">Name Z-A</option>
              <option value="stock_desc">In Stock First</option>
            </select>
            <ResetButton onReset={handleReset} hasFilters={hasFilters} />
          </div>
        </div>

        {/* Filters and Products */}
        <div className="flex flex-col md:flex-row gap-4 sm:gap-6">
          <FilterSidebar
            filters={filters}
            filterCounts={filterCounts}
            onFilterChange={handleFilterChange}
          />
          
          <div className="flex-1 min-w-0">
            <ProductList products={products} loading={loading} error={error} searchTerm={search} />
            
            {!loading && !error && products && products.length > 0 && (
              <Pagination
                currentPage={currentPage}
                totalPages={totalPages}
                onPageChange={handlePageChange}
              />
            )}
          </div>
        </div>
      </main>

      {/* Footer */}
      <footer className="bg-[#2D5A3F] text-white py-3 sm:py-4 mt-6 sm:mt-8 border-t-4 border-[#FFC107]">
        <div className="container mx-auto px-3 sm:px-4 text-center text-xs sm:text-sm">
          <p>
            © {new Date().getFullYear()} <span className="text-[#FFC107] font-medium">Product Search</span>
            {' '}— Demo for <span className="text-[#FFC107] font-medium">Meadow Vale Foods</span>
          </p>
          <p className="text-[10px] sm:text-xs text-gray-400 mt-1">
            Built by <span className="font-semibold">Dumitru Craciun</span> — Next.js · Node.js · Express · PostgreSQL · Tailwind
          </p>
        </div>
      </footer>
    </div>
  );
}