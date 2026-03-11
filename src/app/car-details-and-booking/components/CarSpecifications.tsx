'use client';

import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

interface Spec {
  icon: string;
  label: string;
  value: string;
}

const specs: Spec[] = [
  { icon: 'CalendarIcon', label: 'Year', value: '2024' },
  { icon: 'CogIcon', label: 'Transmission', value: 'Automatic' },
  { icon: 'FireIcon', label: 'Fuel Type', value: 'Gasoline' },
  { icon: 'UserGroupIcon', label: 'Seats', value: '5 Passengers' },
  { icon: 'ArchiveBoxIcon', label: 'Luggage', value: '3 Large Bags' },
  { icon: 'BoltIcon', label: 'Engine', value: '2.0L Turbo' },
  { icon: 'MapPinIcon', label: 'Mileage', value: 'Unlimited' },
  { icon: 'ShieldCheckIcon', label: 'Insurance', value: 'Basic Included' },
];

const features = [
  'Bluetooth Connectivity',
  'Apple CarPlay / Android Auto',
  'Backup Camera',
  'Lane Departure Warning',
  'Adaptive Cruise Control',
  'Heated Front Seats',
  'Sunroof / Moonroof',
  'Keyless Entry & Start',
  'Premium Sound System',
  'USB Charging Ports',
];

export default function CarSpecifications() {
  return (
    <div className="bg-card rounded-xl border border-border shadow-automotive p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-3 mb-6">
        <div>
          <div className="flex items-center gap-2 mb-1">
            <Link href="/car-search-and-browse" className="text-sm text-primary hover:underline flex items-center gap-1">
              <Icon name="ChevronLeftIcon" size={14} variant="outline" />
              Back to Search
            </Link>
          </div>
          <h1 className="text-2xl font-bold text-foreground">2024 BMW 5 Series</h1>
          <p className="text-muted-foreground text-sm mt-1">Luxury Sedan &bull; San Francisco, CA</p>
        </div>
        <div className="flex items-center gap-3">
          <div className="flex items-center gap-1">
            {[1,2,3,4,5].map(i => (
              <Icon key={i} name="StarIcon" size={16} variant="solid" className="text-accent" />
            ))}
            <span className="text-sm font-medium text-foreground ml-1">4.9</span>
            <span className="text-sm text-muted-foreground">(128 reviews)</span>
          </div>
        </div>
      </div>

      {/* Specs Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 mb-6">
        {specs.map((spec) => (
          <div key={spec.label} className="flex flex-col items-center text-center p-3 bg-muted rounded-lg gap-1.5">
            <Icon name={spec.icon as any} size={20} variant="outline" className="text-primary" />
            <span className="text-xs text-muted-foreground font-medium">{spec.label}</span>
            <span className="text-sm font-semibold text-foreground">{spec.value}</span>
          </div>
        ))}
      </div>

      {/* Description */}
      <div className="mb-6">
        <h2 className="text-base font-semibold text-foreground mb-2">About This Vehicle</h2>
        <p className="text-sm text-muted-foreground leading-relaxed">
          Experience the pinnacle of luxury and performance with the 2024 BMW 5 Series. This executive sedan combines cutting-edge technology with refined comfort, making it the perfect choice for business travel or leisure trips. The spacious interior features premium leather upholstery, advanced driver assistance systems, and a state-of-the-art infotainment system to keep you connected throughout your journey.
        </p>
      </div>

      {/* Features */}
      <div>
        <h2 className="text-base font-semibold text-foreground mb-3">Key Features</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
          {features.map((feature) => (
            <div key={feature} className="flex items-center gap-2 text-sm text-foreground">
              <Icon name="CheckCircleIcon" size={16} variant="solid" className="text-success flex-shrink-0" />
              {feature}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}