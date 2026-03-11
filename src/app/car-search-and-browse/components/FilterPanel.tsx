'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import { FilterState, CAR_CATEGORIES } from './types';

interface FilterPanelProps {
  filters: FilterState;
  onFilterChange: (updated: Partial<FilterState>) => void;
  onReset: () => void;
  totalResults: number;
}

const LOCATIONS = ['Mumbai', 'Delhi', 'Bangalore', 'Pune', 'Hyderabad'];

export default function FilterPanel({ filters, onFilterChange, onReset, totalResults }: FilterPanelProps) {
  const [priceRange, setPriceRange] = useState<[number, number]>([filters.priceMin, filters.priceMax]);

  const handleCategoryToggle = (cat: string) => {
    const updated = filters.categories.includes(cat)
      ? filters.categories.filter(c => c !== cat)
      : [...filters.categories, cat];
    onFilterChange({ categories: updated });
  };

  const handlePriceCommit = () => {
    onFilterChange({ priceMin: priceRange[0], priceMax: priceRange[1] });
  };

  const activeFilterCount =
    (filters.location ? 1 : 0) +
    filters.categories.length +
    (filters.transmission ? 1 : 0) +
    (filters.fuelType ? 1 : 0) +
    (filters.seats ? 1 : 0) +
    (filters.priceMax < 500 ? 1 : 0);

  return (
    <div className="bg-card border border-border rounded-xl shadow-automotive-sm sticky top-20 overflow-y-auto max-h-[calc(100vh-100px)]">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-border">
        <div className="flex items-center gap-2">
          <Icon name="AdjustmentsHorizontalIcon" size={18} variant="outline" className="text-primary" />
          <span className="font-semibold text-sm text-foreground">Filters</span>
          {activeFilterCount > 0 && (
            <span className="w-5 h-5 rounded-full bg-primary text-primary-foreground text-xs flex items-center justify-center font-medium">
              {activeFilterCount}
            </span>
          )}
        </div>
        {activeFilterCount > 0 && (
          <button
            onClick={onReset}
            className="text-xs text-primary hover:text-primary/80 font-medium transition-colors"
          >
            Reset all
          </button>
        )}
      </div>

      <div className="p-4 space-y-5">
        {/* Location */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Location
          </label>
          <div className="relative">
            <Icon name="MapPinIcon" size={16} variant="outline" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <select
              value={filters.location}
              onChange={e => onFilterChange({ location: e.target.value })}
              className="w-full h-10 pl-9 pr-3 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors appearance-none"
            >
              <option value="">All Locations</option>
              {LOCATIONS.map(loc => (
                <option key={loc} value={loc}>{loc}</option>
              ))}
            </select>
          </div>
        </div>

        {/* Dates */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Pickup Date
          </label>
          <div className="relative">
            <Icon name="CalendarIcon" size={16} variant="outline" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              type="date"
              value={filters.pickupDate}
              onChange={e => onFilterChange({ pickupDate: e.target.value })}
              className="w-full h-10 pl-9 pr-3 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
        </div>
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Drop-off Date
          </label>
          <div className="relative">
            <Icon name="CalendarIcon" size={16} variant="outline" className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none" />
            <input
              type="date"
              value={filters.dropoffDate}
              onChange={e => onFilterChange({ dropoffDate: e.target.value })}
              className="w-full h-10 pl-9 pr-3 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
            />
          </div>
        </div>

        {/* Category */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Category
          </label>
          <div className="flex flex-wrap gap-2">
            {CAR_CATEGORIES.map(cat => (
              <button
                key={cat}
                onClick={() => handleCategoryToggle(cat)}
                className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors border ${
                  filters.categories.includes(cat)
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground border-border hover:border-primary hover:text-primary'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* Price Range */}
        <div>
          <div className="flex items-center justify-between mb-2">
            <label className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
              Price / Day
            </label>
            <span className="text-xs font-medium text-foreground">
              ${priceRange[0]} – ${priceRange[1]}
            </span>
          </div>
          <input
            type="range"
            min={0}
            max={500}
            step={5}
            value={priceRange[1]}
            onChange={e => setPriceRange([priceRange[0], parseInt(e.target.value)])}
            onMouseUp={handlePriceCommit}
            onTouchEnd={handlePriceCommit}
            className="w-full accent-primary"
          />
          <div className="flex justify-between text-xs text-muted-foreground mt-1">
            <span>$0</span>
            <span>$500+</span>
          </div>
        </div>

        {/* Transmission */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Transmission
          </label>
          <div className="flex gap-2">
            {['', 'Automatic', 'Manual'].map(t => (
              <button
                key={t}
                onClick={() => onFilterChange({ transmission: t })}
                className={`flex-1 py-2 rounded-lg text-xs font-medium border transition-colors ${
                  filters.transmission === t
                    ? 'bg-primary text-primary-foreground border-primary'
                    : 'bg-background text-foreground border-border hover:border-primary'
                }`}
              >
                {t || 'Any'}
              </button>
            ))}
          </div>
        </div>

        {/* Fuel Type */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Fuel Type
          </label>
          <select
            value={filters.fuelType}
            onChange={e => onFilterChange({ fuelType: e.target.value })}
            className="w-full h-10 px-3 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          >
            <option value="">All Types</option>
            <option value="Petrol">Petrol</option>
            <option value="Diesel">Diesel</option>
            <option value="Electric">Electric</option>
            <option value="Hybrid">Hybrid</option>
          </select>
        </div>

        {/* Seats */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-2">
            Min. Seats
          </label>
          <select
            value={filters.seats}
            onChange={e => onFilterChange({ seats: e.target.value })}
            className="w-full h-10 px-3 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/20 focus:border-primary transition-colors"
          >
            <option value="">Any</option>
            <option value="2">2+</option>
            <option value="4">4+</option>
            <option value="5">5+</option>
            <option value="7">7+</option>
          </select>
        </div>

        {/* Results count */}
        <div className="pt-2 border-t border-border">
          <p className="text-xs text-center text-muted-foreground">
            <span className="font-semibold text-primary">{totalResults}</span> vehicle{totalResults !== 1 ? 's' : ''} match your filters
          </p>
        </div>
      </div>
    </div>
  );
}