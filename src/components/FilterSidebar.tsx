// components/FilterSidebar.tsx
import { useState } from 'react';
import { FilterCounts } from '../types/product';

interface FilterSidebarProps {
  filters: {
    packaging: string[];
    brand: string[];
    inStock: boolean;
    printed: boolean;
  };
  filterCounts: FilterCounts | null;
  onFilterChange: (key: string, value: any) => void;
}

export function FilterSidebar({ filters, filterCounts, onFilterChange }: FilterSidebarProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleCheckboxChange = (key: 'packaging' | 'brand', value: string) => {
    const current = filters[key];
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value];
    onFilterChange(key, updated);
  };

  const handleToggleChange = (key: 'inStock' | 'printed') => {
    onFilterChange(key, !filters[key]);
  };

  return (
    <div className="w-full md:w-64 flex-shrink-0">
      {/* Mobile Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="w-full md:hidden bg-[#2D5A3F] text-white px-4 py-3 rounded-lg flex items-center justify-between font-medium mb-3"
      >
        <span>Filters</span>
        <svg
          className={`w-5 h-5 transition-transform ${isOpen ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {/* Filter Content */}
      <div className={`${isOpen ? 'block' : 'hidden'} md:block`}>
        <div className="bg-[#F2F2F2] p-4 rounded-lg md:sticky md:top-4">
          <h3 className="font-bold text-[#1A3F24] text-lg mb-4 hidden md:block">Filters</h3>

          {/* Packaging filter */}
          <div className="border-b border-[#E5E5E5] pb-4 mb-4">
            <h4 className="font-medium text-[#1A3F24] mb-2">Packaging</h4>
            <div className="max-h-48 overflow-y-auto">
              {filterCounts && Object.entries(filterCounts.packaging).map(([name, count]) => (
                <label key={name} className="flex items-center gap-2 text-sm text-[#4A4A4A] cursor-pointer hover:text-[#1A3F24] transition-colors py-1.5">
                  <input
                    type="checkbox"
                    checked={filters.packaging.includes(name)}
                    onChange={() => handleCheckboxChange('packaging', name)}
                    className="w-4 h-4 min-w-[1rem] border-2 border-[#E5E5E5] rounded focus:ring-2 focus:ring-[#FFC107] focus:ring-offset-2 text-[#FFC107]"
                  />
                  <span className="truncate">{name}</span>
                  <span className="text-gray-400 text-xs ml-auto">({count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Brand filter */}
          <div className="border-b border-[#E5E5E5] pb-4 mb-4">
            <h4 className="font-medium text-[#1A3F24] mb-2">Brand</h4>
            <div className="max-h-48 overflow-y-auto">
              {filterCounts && Object.entries(filterCounts.brand).map(([name, count]) => (
                <label key={name} className="flex items-center gap-2 text-sm text-[#4A4A4A] cursor-pointer hover:text-[#1A3F24] transition-colors py-1.5">
                  <input
                    type="checkbox"
                    checked={filters.brand.includes(name)}
                    onChange={() => handleCheckboxChange('brand', name)}
                    className="w-4 h-4 min-w-[1rem] border-2 border-[#E5E5E5] rounded focus:ring-2 focus:ring-[#FFC107] focus:ring-offset-2 text-[#FFC107]"
                  />
                  <span className="truncate">{name}</span>
                  <span className="text-gray-400 text-xs ml-auto">({count})</span>
                </label>
              ))}
            </div>
          </div>

          {/* Stock filter */}
          <div className="border-b border-[#E5E5E5] pb-4 mb-4">
            <h4 className="font-medium text-[#1A3F24] mb-2">Stock</h4>
            <label className="flex items-center gap-2 text-sm text-[#4A4A4A] cursor-pointer hover:text-[#1A3F24] transition-colors py-1.5">
              <input
                type="checkbox"
                checked={filters.inStock}
                onChange={() => handleToggleChange('inStock')}
                className="w-4 h-4 min-w-[1rem] border-2 border-[#E5E5E5] rounded focus:ring-2 focus:ring-[#FFC107] focus:ring-offset-2 text-[#FFC107]"
              />
              <span>In Stock</span>
              {filterCounts && (
                <span className="text-gray-400 text-xs ml-auto">({filterCounts.inStock})</span>
              )}
            </label>
          </div>

          {/* Printed filter */}
          <div>
            <h4 className="font-medium text-[#1A3F24] mb-2">Printed</h4>
            <label className="flex items-center gap-2 text-sm text-[#4A4A4A] cursor-pointer hover:text-[#1A3F24] transition-colors py-1.5">
              <input
                type="checkbox"
                checked={filters.printed}
                onChange={() => handleToggleChange('printed')}
                className="w-4 h-4 min-w-[1rem] border-2 border-[#E5E5E5] rounded focus:ring-2 focus:ring-[#FFC107] focus:ring-offset-2 text-[#FFC107]"
              />
              <span>Printed Products</span>
              {filterCounts && (
                <span className="text-gray-400 text-xs ml-auto">({filterCounts.printed})</span>
              )}
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}