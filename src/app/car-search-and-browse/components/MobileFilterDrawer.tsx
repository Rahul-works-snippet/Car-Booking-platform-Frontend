'use client';

import { useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';
import FilterPanel from './FilterPanel';
import { FilterState } from './types';

interface MobileFilterDrawerProps {
  isOpen: boolean;
  onClose: () => void;
  filters: FilterState;
  onFilterChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  totalResults: number;
}

export default function MobileFilterDrawer({
  isOpen,
  onClose,
  filters,
  onFilterChange,
  onReset,
  totalResults,
}: MobileFilterDrawerProps) {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => { document.body.style.overflow = ''; };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 lg:hidden">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
        aria-hidden="true"
      />
      {/* Drawer */}
      <div className="absolute right-0 top-0 bottom-0 w-80 max-w-full bg-background shadow-automotive-xl flex flex-col">
        {/* Drawer header */}
        <div className="flex items-center justify-between px-4 py-4 border-b border-border flex-shrink-0">
          <h2 className="font-bold text-foreground">Filter Cars</h2>
          <button
            onClick={onClose}
            className="w-8 h-8 flex items-center justify-center rounded-lg hover:bg-muted transition-colors"
            aria-label="Close filters"
          >
            <Icon name="XMarkIcon" size={20} variant="outline" />
          </button>
        </div>

        {/* Scrollable filter content */}
        <div className="flex-1 overflow-y-auto">
          <FilterPanel
            filters={filters}
            onFilterChange={onFilterChange}
            onReset={onReset}
            totalResults={totalResults}
          />
        </div>

        {/* Apply button */}
        <div className="p-4 border-t border-border flex-shrink-0">
          <button
            onClick={onClose}
            className="w-full h-11 bg-primary text-primary-foreground font-medium rounded-lg hover:bg-primary/90 active:scale-95 transition-all"
          >
            Show {totalResults} Result{totalResults !== 1 ? 's' : ''}
          </button>
        </div>
      </div>
    </div>
  );
}