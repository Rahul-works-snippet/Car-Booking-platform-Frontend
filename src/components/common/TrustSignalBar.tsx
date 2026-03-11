'use client';

import { useState, useEffect } from 'react';
import Icon from '@/components/ui/AppIcon';

const trustSignals = [
  {
    icon: 'ShieldCheckIcon',
    title: 'SSL Secured',
    description: '256-bit encryption',
    color: 'text-success',
  },
  {
    icon: 'StarIcon',
    title: '4.9/5 Rating',
    description: '12,000+ reviews',
    color: 'text-accent',
  },
  {
    icon: 'TruckIcon',
    title: '500+ Vehicles',
    description: 'All categories',
    color: 'text-primary',
  },
  {
    icon: 'PhoneIcon',
    title: '24/7 Support',
    description: 'Always available',
    color: 'text-secondary',
  },
  {
    icon: 'ArrowPathIcon',
    title: 'Free Cancellation',
    description: 'Up to 24h before',
    color: 'text-success',
  },
  {
    icon: 'CreditCardIcon',
    title: 'Secure Payment',
    description: 'PCI DSS compliant',
    color: 'text-primary',
  },
];

const testimonials = [
  { text: '"Seamless booking experience. Will use again!"', author: 'Sarah M.' },
  { text: '"Best rates and excellent vehicle condition."', author: 'James T.' },
  { text: '"Quick pickup, no hidden fees. Highly recommend."', author: 'Priya K.' },
];

interface TrustSignalBarProps {
  showTestimonials?: boolean;
}

const TrustSignalBar = ({ showTestimonials = true }: TrustSignalBarProps) => {
  const [testimonialIndex, setTestimonialIndex] = useState(0);

  useEffect(() => {
    if (!showTestimonials) return;
    const interval = setInterval(() => {
      setTestimonialIndex((i) => (i + 1) % testimonials.length);
    }, 4000);
    return () => clearInterval(interval);
  }, [showTestimonials]);

  return (
    <div className="w-full bg-card border-t border-border">
      {/* Trust signals grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4">
          {trustSignals.map((signal) => (
            <div
              key={signal.title}
              className="flex flex-col items-center text-center gap-1.5 p-3 rounded-automotive hover:bg-muted transition-automotive duration-automotive"
            >
              <div className={`${signal.color}`}>
                <Icon name={signal.icon as any} size={22} variant="outline" />
              </div>
              <span className="text-xs font-caption font-medium text-foreground leading-tight">
                {signal.title}
              </span>
              <span className="text-xs font-caption text-muted-foreground leading-tight">
                {signal.description}
              </span>
            </div>
          ))}
        </div>

        {/* Testimonial rotator */}
        {showTestimonials && (
          <div className="mt-5 pt-5 border-t border-border flex flex-col sm:flex-row items-center justify-between gap-4">
            <div className="flex items-center gap-3 min-h-[40px]">
              <div className="flex-shrink-0 w-8 h-8 rounded-full bg-accent/20 flex items-center justify-center">
                <Icon name="ChatBubbleLeftEllipsisIcon" size={16} variant="outline" className="text-accent" />
              </div>
              <div className="transition-automotive duration-automotive">
                <p className="text-sm font-body text-foreground italic">
                  {testimonials[testimonialIndex].text}
                </p>
                <p className="text-xs font-caption text-muted-foreground mt-0.5">
                  — {testimonials[testimonialIndex].author}
                </p>
              </div>
            </div>

            {/* Dots */}
            <div className="flex items-center gap-1.5">
              {testimonials.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setTestimonialIndex(i)}
                  className={`w-1.5 h-1.5 rounded-full transition-automotive duration-automotive focus:outline-none focus-visible:ring-2 focus-visible:ring-ring ${
                    i === testimonialIndex ? 'bg-primary w-4' : 'bg-muted-foreground/40'
                  }`}
                  aria-label={`Testimonial ${i + 1}`}
                />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default TrustSignalBar;