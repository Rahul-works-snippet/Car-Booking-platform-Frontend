'use client';

import Icon from '@/components/ui/AppIcon';
import { SortOption } from './types';

interface SortBarProps {
  sortBy: SortOption;
  onSortChange: (sort: SortOption) => void;
  totalResults: number;
  onMobileFilterOpen: () => void;
  searchValue: string;
  onSearchChange: (v: string) => void;
}

const SORT_OPTIONS: { value: SortOption; label: string }[] = [
  { value: 'popularity', label: 'Most Popular' },
  { value: 'price_asc', label: 'Price: Low to High' },
  { value: 'price_desc', label: 'Price: High to Low' },
  { value: 'fuel_efficiency', label: 'Fuel Efficiency' },
  { value: 'newest', label: 'Newest First' },
];

export default function SortBar({ sortBy, onSortChange, totalResults, onMobileFilterOpen, searchValue, onSearchChange }: SortBarProps) {
  return (
    <div className="flex flex-col sm:flex-row gap-3 mb-5">
      {/* Search */}
      <div className="relative flex-1">
        <Icon name="MagnifyingGlassIcon" size={16} variant="outline" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
        <input
          type="text"
          value={searchValue}
          onChange={e => onSearchChange(e.target.value)}
          placeholder="Search make, model, or category..."
          className="w-full h-10 pl-9 pr-4 bg-card border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
        />
      </div>

      <div className="flex items-center gap-2">
        {/* Sort */}
        <div className="relative">
          <Icon name="BarsArrowDownIcon" size={16} variant="outline" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
          <select
            value={sortBy}
            onChange={e => onSortChange(e.target.value as SortOption)}
            className="h-10 pl-9 pr-8 bg-card border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none cursor-pointer"
          >
            {SORT_OPTIONS.map(opt => (
              <option key={opt.value} value={opt.value}>{opt.label}</option>
            ))}
          </select>
        </div>

        {/* Mobile filter button */}
        <button
          onClick={onMobileFilterOpen}
          className="lg:hidden flex items-center gap-2 h-10 px-4 bg-card border border-border rounded-lg text-sm font-medium text-foreground hover:border-primary hover:text-primary transition-colors"
        >
          <Icon name="AdjustmentsHorizontalIcon" size={16} variant="outline" />
          Filters
        </button>
      </div>
    </div>
  );
}