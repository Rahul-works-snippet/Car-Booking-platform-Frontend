'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';

interface SearchHeaderProps {
  defaultLocation?: string;
  defaultPickup?: string;
  defaultDropoff?: string;
  onSearch?: (params: { location: string; pickup: string; dropoff: string }) => void;
}

const SearchHeader = ({
  defaultLocation = '',
  defaultPickup = '',
  defaultDropoff = '',
  onSearch,
}: SearchHeaderProps) => {
  const [location, setLocation] = useState(defaultLocation);
  const [pickup, setPickup] = useState(defaultPickup);
  const [dropoff, setDropoff] = useState(defaultDropoff);
  const [expanded, setExpanded] = useState(false);

  const handleSearch = () => {
    onSearch?.({ location, pickup, dropoff });
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') handleSearch();
  };

  return (
    <div className="w-full bg-card border-b border-border shadow-automotive-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
        {/* Desktop layout */}
        <div className="hidden sm:flex items-end gap-3">
          {/* Location */}
          <div className="flex-1 min-w-0">
            <label htmlFor="search-location" className="block text-xs font-caption font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
              Pick-up Location
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <Icon name="MapPinIcon" size={18} variant="outline" />
              </div>
              <input
                id="search-location"
                type="text"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="City, airport, or address"
                className="w-full h-12 pl-10 pr-4 bg-background border border-border rounded-automotive text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-[3px] focus:ring-ring/20 focus:border-primary transition-automotive duration-automotive"
              />
            </div>
          </div>

          {/* Pickup date */}
          <div className="w-44">
            <label htmlFor="search-pickup" className="block text-xs font-caption font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
              Pick-up Date
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <Icon name="CalendarIcon" size={18} variant="outline" />
              </div>
              <input
                id="search-pickup"
                type="date"
                value={pickup}
                onChange={(e) => setPickup(e.target.value)}
                className="w-full h-12 pl-10 pr-3 bg-background border border-border rounded-automotive text-sm font-data text-foreground focus:outline-none focus:ring-[3px] focus:ring-ring/20 focus:border-primary transition-automotive duration-automotive"
              />
            </div>
          </div>

          {/* Dropoff date */}
          <div className="w-44">
            <label htmlFor="search-dropoff" className="block text-xs font-caption font-medium text-muted-foreground mb-1.5 uppercase tracking-wide">
              Drop-off Date
            </label>
            <div className="relative">
              <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                <Icon name="CalendarIcon" size={18} variant="outline" />
              </div>
              <input
                id="search-dropoff"
                type="date"
                value={dropoff}
                onChange={(e) => setDropoff(e.target.value)}
                className="w-full h-12 pl-10 pr-3 bg-background border border-border rounded-automotive text-sm font-data text-foreground focus:outline-none focus:ring-[3px] focus:ring-ring/20 focus:border-primary transition-automotive duration-automotive"
              />
            </div>
          </div>

          {/* Search button */}
          <button
            onClick={handleSearch}
            className="h-12 px-7 bg-primary text-primary-foreground text-sm font-caption font-medium rounded-automotive shadow-automotive hover:shadow-automotive-md active:scale-95 transition-automotive duration-automotive focus:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 flex items-center gap-2 flex-shrink-0"
          >
            <Icon name="MagnifyingGlassIcon" size={18} variant="outline" />
            Search
          </button>
        </div>

        {/* Mobile layout */}
        <div className="sm:hidden">
          <button
            onClick={() => setExpanded((v) => !v)}
            className="w-full flex items-center gap-3 h-12 px-4 bg-background border border-border rounded-automotive text-sm font-body text-muted-foreground transition-automotive duration-automotive"
          >
            <Icon name="MagnifyingGlassIcon" size={18} variant="outline" />
            <span className="flex-1 text-left truncate">
              {location || 'Where are you going?'}
            </span>
            {pickup && dropoff && (
              <span className="font-data text-xs text-secondary">{pickup} → {dropoff}</span>
            )}
            <Icon name={expanded ? 'ChevronUpIcon' : 'ChevronDownIcon'} size={16} variant="outline" />
          </button>

          {expanded && (
            <div className="mt-3 flex flex-col gap-3">
              <div className="relative">
                <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                  <Icon name="MapPinIcon" size={18} variant="outline" />
                </div>
                <input
                  type="text"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  placeholder="Pick-up location"
                  className="w-full h-12 pl-10 pr-4 bg-background border border-border rounded-automotive text-sm font-body text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-[3px] focus:ring-ring/20 focus:border-primary transition-automotive duration-automotive"
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                    <Icon name="CalendarIcon" size={16} variant="outline" />
                  </div>
                  <input
                    type="date"
                    value={pickup}
                    onChange={(e) => setPickup(e.target.value)}
                    className="w-full h-12 pl-9 pr-2 bg-background border border-border rounded-automotive text-sm font-data text-foreground focus:outline-none focus:ring-[3px] focus:ring-ring/20 focus:border-primary transition-automotive duration-automotive"
                  />
                </div>
                <div className="relative">
                  <div className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground pointer-events-none">
                    <Icon name="CalendarIcon" size={16} variant="outline" />
                  </div>
                  <input
                    type="date"
                    value={dropoff}
                    onChange={(e) => setDropoff(e.target.value)}
                    className="w-full h-12 pl-9 pr-2 bg-background border border-border rounded-automotive text-sm font-data text-foreground focus:outline-none focus:ring-[3px] focus:ring-ring/20 focus:border-primary transition-automotive duration-automotive"
                  />
                </div>
              </div>
              <button
                onClick={() => { handleSearch(); setExpanded(false); }}
                className="w-full h-12 bg-primary text-primary-foreground text-sm font-caption font-medium rounded-automotive shadow-automotive active:scale-95 transition-automotive duration-automotive flex items-center justify-center gap-2"
              >
                <Icon name="MagnifyingGlassIcon" size={18} variant="outline" />
                Search Cars
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SearchHeader;