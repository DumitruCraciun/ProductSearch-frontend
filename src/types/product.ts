// types/product.ts
// Type definitions for products and filters

export interface Product {
  id: number;
  code: string;
  description: string;
  stock: number;
  type_id: number;
  packaging: string;
  printed: string;
  brand: string;
}

export interface FilterCounts {
  packaging: Record<string, number>;
  brand: Record<string, number>;
  inStock: number;
  outOfStock: number;
  printed: number;
  notPrinted: number;
}

export interface ProductsResponse {
  data: Product[];
  meta: {
    total: number;
    page: number;
    limit: number;
    totalPages: number;
  };
  filters: FilterCounts;
}

export interface ProductFilters {
  search: string;
  packaging: string[];
  brand: string[];
  inStock: boolean;
  printed: boolean;
  sort: 'name_asc' | 'name_desc' | 'stock_desc';
}