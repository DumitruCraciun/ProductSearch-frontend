// components/ProductCard.tsx
import { Product } from '../types/product';

interface ProductCardProps {
  product: Product;
  searchTerm?: string;
}

function highlightText(text: string, searchTerm: string): string {
  if (!searchTerm || searchTerm.trim() === '') return text;
  
  const regex = new RegExp(`(${searchTerm.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi');
  const parts = text.split(regex);
  
  return parts.map((part, index) => 
    regex.test(part) 
      ? `<mark class="bg-[#FFC107] text-[#1A3F24] font-medium px-0.5 rounded">${part}</mark>`
      : part
  ).join('');
}

export function ProductCard({ product, searchTerm = '' }: ProductCardProps) {
  const isInStock = product.stock > 0;

  return (
    <div className="product-card p-3 sm:p-4">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-2">
        <span 
          className="text-xs font-mono text-gray-500 bg-gray-100 px-2 py-1 rounded truncate max-w-full sm:max-w-[60%]"
          dangerouslySetInnerHTML={{ 
            __html: highlightText(product.code, searchTerm) 
          }}
        />
        <span 
          className={`text-xs font-medium px-2 py-1 rounded whitespace-nowrap ${
            isInStock 
              ? 'bg-green-100 text-green-700' 
              : 'bg-red-100 text-red-700'
          }`}
        >
          {isInStock ? `${product.stock} in stock` : 'Out of stock'}
        </span>
      </div>
      
      <h3 
        className="font-semibold text-[#1A3F24] text-base sm:text-lg mb-1 line-clamp-2"
        dangerouslySetInnerHTML={{ 
          __html: highlightText(product.description, searchTerm) 
        }}
      />
      
      <div className="flex flex-wrap gap-1.5 sm:gap-2 mt-2 text-xs sm:text-sm text-gray-600">
        <span className="bg-[#F2F2F2] px-2 py-1 rounded">
          {product.packaging}
        </span>
        <span className="bg-[#F2F2F2] px-2 py-1 rounded">
          {product.brand}
        </span>
        {product.printed === 'Yes' && (
          <span className="bg-[#FFC107] text-[#1A3F24] px-2 py-1 rounded font-medium">
            Printed
          </span>
        )}
      </div>
    </div>
  );
}