// components/ProductList.tsx
import { Product } from '../types/product';
import { ProductCard } from './ProductCard';

interface ProductListProps {
  products: Product[];
  loading: boolean;
  error: string | null;
  searchTerm?: string;
}

export function ProductList({ products, loading, error, searchTerm }: ProductListProps) {
  if (loading) {
    return (
      <div className="flex justify-center items-center py-12">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-[#FFC107]"></div>
        <span className="ml-3 text-[#1A3F24]">Loading products...</span>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-12">
        <p className="text-red-600 font-medium">Error loading products</p>
        <p className="text-sm text-gray-500 mt-1">{error}</p>
      </div>
    );
  }

  if (products.length === 0) {
    return (
      <div className="text-center py-12">
        <p className="text-lg text-[#1A3F24] font-medium">No products found</p>
        <p className="text-sm text-gray-500 mt-1">Try adjusting your filters or search terms</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-3 gap-3 sm:gap-4">
      {products.map((product) => (
        <ProductCard key={product.id} product={product} searchTerm={searchTerm} />
      ))}
    </div>
  );
}