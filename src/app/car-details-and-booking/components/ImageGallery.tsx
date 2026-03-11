'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

const images = [
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_18824cd48-1772163084104.png",
  alt: 'Silver BMW 5 Series sedan front three-quarter view on clean white background showing sleek body lines'
},
{
  src: "https://images.unsplash.com/photo-1632823471446-f9e996adf1b1",
  alt: 'BMW 5 Series rear view showing dual exhaust and LED taillights in studio lighting'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_175d9c28d-1772836676074.png",
  alt: 'BMW 5 Series interior showing black leather seats, dashboard, and infotainment system'
},
{
  src: "https://images.unsplash.com/photo-1650381287752-5fb541c84ccd",
  alt: 'BMW 5 Series side profile view on open road with mountain backdrop'
},
{
  src: "https://img.rocket.new/generatedImages/rocket_gen_img_1afa9c119-1773157628167.png",
  alt: 'Luxury sedan engine bay showing clean V6 engine with chrome accents'
}];


export default function ImageGallery() {
  const [activeIndex, setActiveIndex] = useState(0);

  const prev = () => setActiveIndex((i) => (i - 1 + images?.length) % images?.length);
  const next = () => setActiveIndex((i) => (i + 1) % images?.length);

  return (
    <div className="bg-card rounded-xl border border-border shadow-automotive overflow-hidden">
      {/* Main Image */}
      <div className="relative w-full h-72 sm:h-96 lg:h-[420px] overflow-hidden bg-muted">
        <AppImage
          src={images?.[activeIndex]?.src}
          alt={images?.[activeIndex]?.alt}
          fill
          className="object-cover transition-all duration-300"
          priority />
        
        {/* Badges */}
        <div className="absolute top-4 left-4 flex gap-2">
          <span className="bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-full shadow">Featured</span>
          <span className="bg-success text-success-foreground text-xs font-medium px-3 py-1 rounded-full shadow">Available</span>
        </div>
        {/* Nav Buttons */}
        <button
          onClick={prev}
          className="absolute left-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-automotive hover:bg-card transition-automotive"
          aria-label="Previous image">
          
          <Icon name="ChevronLeftIcon" size={20} variant="outline" />
        </button>
        <button
          onClick={next}
          className="absolute right-3 top-1/2 -translate-y-1/2 w-10 h-10 bg-card/80 backdrop-blur-sm rounded-full flex items-center justify-center shadow-automotive hover:bg-card transition-automotive"
          aria-label="Next image">
          
          <Icon name="ChevronRightIcon" size={20} variant="outline" />
        </button>
        {/* Counter */}
        <div className="absolute bottom-4 right-4 bg-card/80 backdrop-blur-sm text-foreground text-xs font-medium px-3 py-1 rounded-full">
          {activeIndex + 1} / {images?.length}
        </div>
      </div>
      {/* Thumbnails */}
      <div className="flex gap-2 p-3 overflow-x-auto">
        {images?.map((img, i) =>
        <button
          key={i}
          onClick={() => setActiveIndex(i)}
          className={`flex-shrink-0 w-16 h-12 rounded-lg overflow-hidden border-2 transition-automotive ${
          i === activeIndex ? 'border-primary' : 'border-transparent opacity-60 hover:opacity-100'}`
          }
          aria-label={`View image ${i + 1}`}>
          
            <div className="relative w-full h-full">
              <AppImage src={img?.src} alt={img?.alt} fill className="object-cover" />
            </div>
          </button>
        )}
      </div>
    </div>);

}