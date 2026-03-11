export interface Car {
  id: string;
  make: string;
  model: string;
  year: number;
  category: string;
  pricePerDay: number;
  transmission: 'Automatic' | 'Manual';
  fuelType: 'Petrol' | 'Diesel' | 'Electric' | 'Hybrid';
  seats: number;
  rating: number;
  reviewCount: number;
  fuelEfficiency: number;
  location: string;
  available: boolean;
  image: string;
  alt: string;
  features: string[];
  badge?: string;
}

export interface FilterState {
  location: string;
  pickupDate: string;
  dropoffDate: string;
  categories: string[];
  priceMin: number;
  priceMax: number;
  transmission: string;
  fuelType: string;
  seats: string;
  search: string;
}

export type SortOption = 'popularity' | 'price_asc' | 'price_desc' | 'fuel_efficiency' | 'newest';

export const CAR_CATEGORIES = ['Economy', 'Compact', 'SUV', 'Luxury', 'Van', 'Sports', 'Electric'];