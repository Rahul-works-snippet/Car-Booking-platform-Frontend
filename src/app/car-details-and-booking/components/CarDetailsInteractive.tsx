'use client';

import { useState, useEffect } from 'react';
import Header from '@/components/common/Header';
import BookingProgressIndicator from '@/components/common/BookingProgressIndicator';
import CustomerSupportWidget from '@/components/common/CustomerSupportWidget';
import ImageGallery from './ImageGallery';
import CarSpecifications from './CarSpecifications';
import BookingPanel from './BookingPanel';
import ReviewsSection from './ReviewsSection';

export default function CarDetailsInteractive() {
  const [currentStep, setCurrentStep] = useState(1);
  const [isHydrated, setIsHydrated] = useState(false);

  useEffect(() => {
    setIsHydrated(true);
  }, []);

  if (!isHydrated) {
    return (
      <div className="min-h-screen bg-background">
        <div className="h-16 bg-card border-b border-border" />
        <div className="max-w-7xl mx-auto px-4 py-8">
          <div className="h-96 bg-muted rounded-lg animate-pulse" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      <Header />
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
        <div className="mb-6">
          <BookingProgressIndicator currentStep={currentStep} onStepClick={setCurrentStep} />
        </div>
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Left Column */}
          <div className="flex-1 min-w-0 flex flex-col gap-8">
            <ImageGallery />
            <CarSpecifications />
            <ReviewsSection />
          </div>
          {/* Right Column - Booking Panel */}
          <div className="w-full lg:w-96 flex-shrink-0">
            <div className="lg:sticky lg:top-24">
              <BookingPanel onStepChange={setCurrentStep} />
            </div>
          </div>
        </div>
      </div>
      <CustomerSupportWidget />
    </div>
  );
}