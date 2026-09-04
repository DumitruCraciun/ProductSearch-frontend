// hooks/useProducts.ts
// Custom hook for fetching products with filters and pagination

import { useState, useEffect, useCallback } from 'react';
import { Product, ProductsResponse, ProductFilters } from '../types/product';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

interface UseProductsResult {
  products: Product[];
  loading: boolean;
  error: string | null;
  total: number;
  totalPages: number;
  currentPage: number;
  filterCounts: ProductsResponse['filters'] | null;
  fetchProducts: (params: Partial<ProductFilters & { page: number }>) => Promise<void>;
}

export function useProducts(): UseProductsResult {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [total, setTotal] = useState<number>(0);
  const [totalPages, setTotalPages] = useState<number>(0);
  const [currentPage, setCurrentPage] = useState<number>(1);
  const [filterCounts, setFilterCounts] = useState<ProductsResponse['filters'] | null>(null);

  const fetchProducts = useCallback(async (params: Partial<ProductFilters & { page: number }> = {}) => {
    setLoading(true);
    setError(null);

    try {
      // Build query string
      const queryParams = new URLSearchParams();
      
      if (params.page) queryParams.append('page', String(params.page));
      if (params.search) queryParams.append('search', params.search);
      if (params.packaging && params.packaging.length > 0) {
        queryParams.append('packaging', params.packaging.join(','));
      }
      if (params.brand && params.brand.length > 0) {
        queryParams.append('brand', params.brand.join(','));
      }
      if (params.inStock !== undefined) {
        queryParams.append('inStock', String(params.inStock));
      }
      if (params.printed !== undefined) {
        queryParams.append('printed', String(params.printed));
      }
      if (params.sort) queryParams.append('sort', params.sort);

      const url = `${API_URL}/products?${queryParams.toString()}`;
      const response = await fetch(url);

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const data: ProductsResponse = await response.json();
      
      if (!data || !data.meta) {
          console.error('Invalid response structure:', data);
          setProducts([]);
          setTotal(0);
          setTotalPages(0);
          setCurrentPage(1);
          setFilterCounts(null);
          setLoading(false);
          return;
        }
        
        setProducts(data.data || []);
        setTotal(data.meta.total || 0);
        setTotalPages(data.meta.totalPages || 0);
        setCurrentPage(data.meta.page || 1);
        setFilterCounts(data.filters || null);
        
        console.log('✅ Products loaded:', data.data?.length || 0);
        
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Failed to fetch products');
      console.error('Error fetching products:', err);
    } finally {
      setLoading(false);
    }
  }, []);

  // Initial fetch on mount
  useEffect(() => {
    fetchProducts({ page: 1 });
  }, [fetchProducts]);

  return {
    products,
    loading,
    error,
    total,
    totalPages,
    currentPage,
    filterCounts,
    fetchProducts,
  };
}