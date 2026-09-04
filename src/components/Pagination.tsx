// components/Pagination.tsx
// Pagination controls

import { useState, useEffect } from 'react';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  onPageChange: (page: number) => void;
}

export function Pagination({ currentPage, totalPages, onPageChange }: PaginationProps) {
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 640);
    };
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  if (totalPages <= 1) return null;

  const getPageNumbers = () => {
    const pages: (number | string)[] = [];
    
    // Folosim delta=1 pentru mobil, delta=2 pentru desktop
    const delta = isMobile ? 1 : 2;
    
    // Paginile din jurul celei curente
    const range = [];
    for (let i = Math.max(2, currentPage - delta); i <= Math.min(totalPages - 1, currentPage + delta); i++) {
      range.push(i);
    }

    // Începutul
    if (currentPage - delta > 2) {
      pages.push(1, '...');
    } else {
      if (!pages.includes(1)) pages.push(1);
    }

    // Mijlocul
    pages.push(...range);

    // Sfârșitul
    if (isMobile) {
      // Pe mobil: doar "..." dacă mai sunt pagini după
      if (currentPage + delta < totalPages) {
        if (pages[pages.length - 1] !== '...') {
          pages.push('...');
        }
      }
    } else {
      // Pe desktop: afișăm ultima pagină
      if (currentPage + delta < totalPages - 1) {
        if (pages[pages.length - 1] !== '...') {
          pages.push('...');
        }
        pages.push(totalPages);
      } else if (totalPages > 1 && !pages.includes(totalPages)) {
        pages.push(totalPages);
      }
    }

    return pages;
  };

  return (
    <div className="flex justify-center items-center gap-1.5 sm:gap-2 mt-6 sm:mt-8">
      {/* Previous button */}
      <button
        onClick={() => onPageChange(currentPage - 1)}
        disabled={currentPage === 1}
        className={`min-w-[44px] h-[44px] sm:min-w-[48px] sm:h-[48px] px-3 sm:px-4 flex items-center justify-center rounded-md border text-sm sm:text-base font-medium ${
          currentPage === 1
            ? 'border-[#E5E5E5] text-gray-400 cursor-not-allowed'
            : 'border-[#1A3F24] text-[#1A3F24] hover:bg-[#1A3F24] hover:text-white transition-colors'
        }`}
      >
        <span className="sm:hidden">‹</span>
        <span className="hidden sm:inline">Previous</span>
      </button>

      {/* Page numbers */}
      {getPageNumbers().map((page, index) => (
        <button
          key={index}
          onClick={() => typeof page === 'number' && onPageChange(page)}
          disabled={page === '...'}
          className={`min-w-[44px] h-[44px] sm:min-w-[48px] sm:h-[48px] flex items-center justify-center rounded-md text-sm sm:text-base font-medium ${
            page === currentPage
              ? 'bg-[#FFC107] text-[#1A3F24]'
              : page === '...'
              ? 'text-gray-400 cursor-default px-1'
              : 'border border-[#E5E5E5] hover:bg-[#1A3F24] hover:text-white transition-colors'
          }`}
        >
          {page}
        </button>
      ))}

      {/* Next button */}
      <button
        onClick={() => onPageChange(currentPage + 1)}
        disabled={currentPage === totalPages}
        className={`min-w-[44px] h-[44px] sm:min-w-[48px] sm:h-[48px] px-3 sm:px-4 flex items-center justify-center rounded-md border text-sm sm:text-base font-medium ${
          currentPage === totalPages
            ? 'border-[#E5E5E5] text-gray-400 cursor-not-allowed'
            : 'border-[#1A3F24] text-[#1A3F24] hover:bg-[#1A3F24] hover:text-white transition-colors'
        }`}
      >
        <span className="sm:hidden">›</span>
        <span className="hidden sm:inline">Next</span>
      </button>
    </div>
  );
}