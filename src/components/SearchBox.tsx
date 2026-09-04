// components/SearchBox.tsx
import { useState, useEffect, forwardRef, useRef } from 'react';

interface SearchBoxProps {
  value: string;
  onChange: (value: string) => void;
  onEscapeClear?: () => void;
  placeholder?: string;
}

export const SearchBox = forwardRef<HTMLInputElement, SearchBoxProps>(
  ({ value, onChange, onEscapeClear, placeholder = 'Search products...' }, ref) => {
    const [localValue, setLocalValue] = useState(value);
    const inputRef = useRef<HTMLInputElement | null>(null);

    useEffect(() => {
      setLocalValue(value);
    }, [value]);

    useEffect(() => {
      const timer = setTimeout(() => {
        if (localValue !== value) {
          onChange(localValue);
        }
      }, 300);

      return () => clearTimeout(timer);
    }, [localValue, onChange, value]);

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Escape') {
        e.preventDefault();
        
        if (localValue.length > 0) {
          setLocalValue('');
          onChange('');
        } else {
          if (onEscapeClear) {
            onEscapeClear();
            setTimeout(() => {
              inputRef.current?.focus();
            }, 50);
          }
        }
      }
    };

    const setRefs = (element: HTMLInputElement | null) => {
      inputRef.current = element;
      if (typeof ref === 'function') {
        ref(element);
      } else if (ref && 'current' in ref) {
        (ref as React.MutableRefObject<HTMLInputElement | null>).current = element;
      }
    };

    return (
      <div className="relative">
        <input
          ref={setRefs}
          type="text"
          value={localValue}
          onChange={(e) => setLocalValue(e.target.value)}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          className="w-full px-4 py-2.5 sm:py-2 pl-10 border border-[#E5E5E5] rounded-md focus:outline-none focus:ring-2 focus:ring-[#FFC107] focus:border-transparent text-base sm:text-sm"
          autoFocus
        />
        {/* Icon search */}
        <svg
          className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
        </svg>
        
        {/* Indicator pentru Esc */}
        {localValue.length > 0 && (
          <div className="hidden sm:flex absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono text-gray-500">
              Esc
            </kbd>
            <span className="text-gray-300">to clear</span>
          </div>
        )}
        
        {localValue.length === 0 && value.length === 0 && (
          <div className="hidden sm:flex absolute right-3 top-1/2 transform -translate-y-1/2 text-xs text-gray-400 items-center gap-1">
            <kbd className="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-[10px] font-mono text-gray-500">
              Esc
            </kbd>
            <span className="text-gray-300">to reset all</span>
          </div>
        )}
      </div>
    );
  }
);

SearchBox.displayName = 'SearchBox';