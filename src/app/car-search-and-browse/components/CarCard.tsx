'use client';

import Link from 'next/link';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';
import { Car } from './types';

interface CarCardProps {
  car: Car;
}

const BADGE_COLORS: Record<string, string> = {
  'Best Seller': 'bg-amber-100 text-amber-700',
  'Family Pick': 'bg-green-100 text-green-700',
  'Eco Choice': 'bg-emerald-100 text-emerald-700',
  'Premium': 'bg-purple-100 text-purple-700',
  'Thrill Seeker': 'bg-red-100 text-red-700',
};

const FUEL_ICONS: Record<string, string> = {
  Electric: 'BoltIcon',
  Hybrid: 'SparklesIcon',
  Petrol: 'FireIcon',
  Diesel: 'BeakerIcon',
};

export default function CarCard({ car }: CarCardProps) {
  return (
    <div className="bg-card border border-border rounded-xl shadow-automotive-sm hover:shadow-automotive-md transition-all duration-200 overflow-hidden group flex flex-col">
      {/* Image */}
      <div className="relative overflow-hidden h-48 bg-muted flex-shrink-0">
        <AppImage
          src={car.image}
          alt={car.alt}
          fill
          unoptimized={true}
          className="object-cover group-hover:scale-105 transition-transform duration-300"
          sizes="(max-width: 640px) 100vw, (max-width: 1280px) 50vw, 33vw"
        />
        {/* Availability badge */}
        <div className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-semibold ${
          car.available ? 'bg-emerald-500 text-white' : 'bg-red-500 text-white'
        }`}>
          {car.available ? 'Available' : 'Unavailable'}
        </div>
        {/* Category badge */}
        {car.badge && (
          <div className={`absolute top-3 right-3 px-2.5 py-1 rounded-full text-xs font-semibold ${BADGE_COLORS[car.badge] || 'bg-blue-100 text-blue-700'}`}>
            {car.badge}
          </div>
        )}
      </div>

      {/* Content */}
      <div className="p-4 flex flex-col flex-1">
        {/* Title */}
        <div className="mb-3">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="font-bold text-foreground text-base leading-tight">
                {car.make} {car.model}
              </h3>
              <p className="text-xs text-muted-foreground mt-0.5">{car.year} · {car.category}</p>
            </div>
            <div className="text-right flex-shrink-0">
              <p className="text-lg font-bold text-primary">₹{car.pricePerDay}</p>
              <p className="text-xs text-muted-foreground">/day</p>
            </div>
          </div>
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1.5 mb-3">
          <div className="flex items-center gap-0.5">
            {Array.from({ length: 5 }).map((_, i) => (
              <Icon
                key={i}
                name="StarIcon"
                size={12}
                variant={i < Math.floor(car.rating) ? 'solid' : 'outline'}
                className={i < Math.floor(car.rating) ? 'text-amber-400' : 'text-muted-foreground'}
              />
            ))}
          </div>
          <span className="text-xs font-medium text-foreground">{car.rating}</span>
          <span className="text-xs text-muted-foreground">({car.reviewCount})</span>
        </div>

        {/* Specs */}
        <div className="grid grid-cols-2 gap-2 mb-4">
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon name="CogIcon" size={14} variant="outline" className="text-primary flex-shrink-0" />
            <span>{car.transmission}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon name={FUEL_ICONS[car.fuelType] as any} size={14} variant="outline" className="text-primary flex-shrink-0" />
            <span>{car.fuelType}</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon name="UserGroupIcon" size={14} variant="outline" className="text-primary flex-shrink-0" />
            <span>{car.seats} seats</span>
          </div>
          <div className="flex items-center gap-1.5 text-xs text-muted-foreground">
            <Icon name="MapPinIcon" size={14} variant="outline" className="text-primary flex-shrink-0" />
            <span className="truncate">{car.location}</span>
          </div>
        </div>

        {/* Features */}
        <div className="flex flex-wrap gap-1.5 mb-4">
          {car.features.slice(0, 3).map(f => (
            <span key={f} className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
              {f}
            </span>
          ))}
          {car.features.length > 3 && (
            <span className="px-2 py-0.5 bg-muted text-muted-foreground text-xs rounded-full">
              +{car.features.length - 3}
            </span>
          )}
        </div>

        {/* Actions */}
        <div className="mt-auto flex gap-2">
          <Link
            href={`/car-details-and-booking?id=${car.id}`}
            className="flex-1 flex items-center justify-center gap-1.5 h-10 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 active:scale-95 transition-all"
          >
            <Icon name="EyeIcon" size={16} variant="outline" />
            View Details
          </Link>
          {car.available && (
            <Link
              href={`/car-details-and-booking?id=${car.id}&book=true`}
              className="flex items-center justify-center w-10 h-10 border border-primary text-primary rounded-lg hover:bg-primary/10 active:scale-95 transition-all flex-shrink-0"
              aria-label="Quick book"
            >
              <Icon name="CalendarDaysIcon" size={16} variant="outline" />
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}