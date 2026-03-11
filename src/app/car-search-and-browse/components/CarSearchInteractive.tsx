'use client';

import { useState, useCallback, useEffect } from 'react';
import Header from '@/components/common/Header';
import CustomerSupportWidget from '@/components/common/CustomerSupportWidget';
import FilterPanel from './FilterPanel';
import CarGrid from './CarGrid';
import SortBar from './SortBar';
import MobileFilterDrawer from './MobileFilterDrawer';
import { Car, FilterState, SortOption } from './types';
import { getCars } from '@/lib/api';

const defaultFilters: FilterState = {
  location: '',
  pickupDate: '',
  dropoffDate: '',
  categories: [],
  priceMin: 0,
  priceMax: 25000,
  transmission: '',
  fuelType: '',
  seats: '',
  search: '',
};

// Transform API response to match frontend Car type
function transformApiCar(apiCar: any): Car {
  return {
    id: apiCar.id,
    make: apiCar.make,
    model: apiCar.model,
    year: apiCar.year,
    category: apiCar.category,
    pricePerDay: apiCar.price_per_day,
    transmission: apiCar.transmission,
    fuelType: apiCar.fuel,
    seats: apiCar.seats,
    rating: apiCar.rating || 0,
    reviewCount: apiCar.reviews || 0,
    fuelEfficiency: apiCar.fuel_efficiency || 0,
    location: apiCar.location || '',
    available: apiCar.available !== false,
    image: apiCar.image_url || '',
    alt: `${apiCar.make} ${apiCar.model}`,
    features: apiCar.features || [],
    badge: apiCar.badge || undefined,
  };
}

export default function CarSearchInteractive() {
  const [filters, setFilters] = useState<FilterState>(defaultFilters);
  const [sortBy, setSortBy] = useState<SortOption>('popularity');
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [filteredCars, setFilteredCars] = useState<Car[]>([]);
  const [error, setError] = useState<string | null>(null);

  // Fetch cars from API
  useEffect(() => {
    const fetchCars = async () => {
      setIsLoading(true);
      setError(null);
      try {
        // Map sort option to API sort parameter
        let apiSort = 'price_asc';
        if (sortBy === 'price_asc') apiSort = 'price_asc';
        else if (sortBy === 'price_desc') apiSort = 'price_desc';
        else if (sortBy === 'popularity') apiSort = 'rating_desc';
        else if (sortBy === 'fuel_efficiency') apiSort = 'price_asc'; // API doesn't have fuel_efficiency sort yet
        else if (sortBy === 'newest') apiSort = 'newest';

        const response = await getCars({
          location: filters.location || undefined,
          category: filters.categories.length > 0 ? filters.categories[0] : undefined,
          fuel: filters.fuelType || undefined,
          transmission: filters.transmission || undefined,
          minPrice: filters.priceMin,
          maxPrice: filters.priceMax,
          seats: filters.seats ? parseInt(filters.seats) : undefined,
          sort: apiSort,
          limit: 50, // Fetch more for client-side filtering
        });

        if (response.success && response.cars) {
          let cars = response.cars.map(transformApiCar);

          // Apply search filter (not done by API)
          if (filters.search) {
            const q = filters.search.toLowerCase();
            cars = cars.filter((c: Car) =>
              c.make.toLowerCase().includes(q) ||
              c.model.toLowerCase().includes(q) ||
              c.category.toLowerCase().includes(q)
            );
          }

          // Apply additional client-side sorting
          if (sortBy === 'fuel_efficiency') {
            cars.sort((a: Car, b: Car) => b.fuelEfficiency - a.fuelEfficiency);
          }

          setFilteredCars(cars);
        } else {
          setError('Failed to load cars');
          setFilteredCars([]);
        }
      } catch (err) {
        console.error('Error fetching cars:', err);
        setError(err instanceof Error ? err.message : 'Failed to load cars');
        setFilteredCars([]);
      } finally {
        setIsLoading(false);
      }
    };

    // Debounce the API call
    const timer = setTimeout(() => {
      fetchCars();
    }, 300);

    return () => clearTimeout(timer);
  }, [filters, sortBy]);

  const handleFilterChange = (updated: Partial<FilterState>) => {
    setFilters(prev => ({ ...prev, ...updated }));
  };

  const handleReset = () => {
    setFilters(defaultFilters);
    setSortBy('popularity');
  };

  return (
    <div className="min-h-screen bg-background">
      <Header />

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        {/* Page heading */}
        <div className="mb-6">
          <h1 className="text-2xl font-bold text-foreground">Find Your Perfect Car</h1>
          <p className="text-sm text-muted-foreground mt-1">
            {filteredCars.length} vehicle{filteredCars.length !== 1 ? 's' : ''} available
          </p>
          {error && (
            <p className="text-sm text-red-500 mt-2">
              ⚠️ {error}. Make sure the backend API is running.
            </p>
          )}
        </div>

        <div className="flex gap-6">
          {/* Desktop Filter Panel */}
          <aside className="hidden lg:block w-72 flex-shrink-0">
            <FilterPanel
              filters={filters}
              onFilterChange={handleFilterChange}
              onReset={handleReset}
              totalResults={filteredCars.length}
            />
          </aside>

          {/* Main Content */}
          <div className="flex-1 min-w-0">
            <SortBar
              sortBy={sortBy}
              onSortChange={setSortBy}
              totalResults={filteredCars.length}
              onMobileFilterOpen={() => setMobileFilterOpen(true)}
              searchValue={filters.search}
              onSearchChange={(v) => handleFilterChange({ search: v })}
            />
            <CarGrid cars={filteredCars} isLoading={isLoading} />
          </div>
        </div>
      </main>

      {/* Mobile Filter Drawer */}
      <MobileFilterDrawer
        isOpen={mobileFilterOpen}
        onClose={() => setMobileFilterOpen(false)}
        filters={filters}
        onFilterChange={handleFilterChange}
        onReset={handleReset}
        totalResults={filteredCars.length}
      />

      <CustomerSupportWidget />
    </div>
  );
}