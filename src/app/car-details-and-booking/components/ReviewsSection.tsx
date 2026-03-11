'use client';

import { useState } from 'react';
import AppImage from '@/components/ui/AppImage';
import Icon from '@/components/ui/AppIcon';

interface Review {
  id: number;
  name: string;
  avatar: string;
  avatarAlt: string;
  rating: number;
  date: string;
  title: string;
  body: string;
  helpful: number;
  tags: string[];
}

const reviews: Review[] = [
{
  id: 1,
  name: 'Michael Chen',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_17cf2aeb9-1763296571533.png",
  avatarAlt: 'Professional headshot of Asian man with short black hair in white shirt smiling',
  rating: 5,
  date: 'Feb 28, 2026',
  title: 'Exceptional experience from start to finish',
  body: 'The BMW 5 Series was in immaculate condition. Pickup was seamless at SFO and the car drove beautifully throughout our 5-day business trip. The infotainment system was intuitive and the fuel economy was impressive. Highly recommend DriveEasy for corporate travel.',
  helpful: 24,
  tags: ['Business Travel', 'Clean Car', 'Easy Pickup']
},
{
  id: 2,
  name: 'Sarah Williams',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_12620605b-1772329335837.png",
  avatarAlt: 'Young professional woman with brown hair and warm smile in casual business attire',
  rating: 5,
  date: 'Feb 15, 2026',
  title: 'Perfect for our family road trip',
  body: 'We rented this for a week-long California road trip. The luggage space was more than adequate for our family of four. The child seat add-on was a great value and the GPS was accurate throughout. Will definitely book again for our next trip.',
  helpful: 18,
  tags: ['Family Trip', 'Spacious', 'Great Value']
},
{
  id: 3,
  name: 'James Rodriguez',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_1fbb80d51-1763296048066.png",
  avatarAlt: 'Hispanic man with beard and glasses in navy blue shirt looking confident',
  rating: 4,
  date: 'Jan 30, 2026',
  title: 'Great car, minor paperwork delay',
  body: 'The vehicle itself was fantastic — smooth ride, premium interior, and all features worked perfectly. There was a slight delay at pickup due to paperwork, but the staff resolved it quickly. Overall a very positive experience and I would rent from DriveEasy again.',
  helpful: 11,
  tags: ['Smooth Ride', 'Premium Interior']
},
{
  id: 4,
  name: 'Priya Sharma',
  avatar: "https://img.rocket.new/generatedImages/rocket_gen_img_14172f3b5-1763301352044.png",
  avatarAlt: 'Indian woman with long dark hair in professional blazer smiling confidently',
  rating: 5,
  date: 'Jan 12, 2026',
  title: 'Luxury at an affordable price',
  body: 'I was pleasantly surprised by how affordable the BMW 5 Series was compared to other rental services. The car was spotless, fully fueled, and the booking process on the website was incredibly smooth. The promo code saved me an extra 10% too!',
  helpful: 31,
  tags: ['Affordable', 'Clean', 'Easy Booking']
}];


const filterOptions = ['All Reviews', '5 Stars', '4 Stars', '3 Stars & Below'];

export default function ReviewsSection() {
  const [activeFilter, setActiveFilter] = useState('All Reviews');
  const [helpfulClicked, setHelpfulClicked] = useState<number[]>([]);

  const filtered = reviews.filter((r) => {
    if (activeFilter === 'All Reviews') return true;
    if (activeFilter === '5 Stars') return r.rating === 5;
    if (activeFilter === '4 Stars') return r.rating === 4;
    if (activeFilter === '3 Stars & Below') return r.rating <= 3;
    return true;
  });

  const avgRating = (reviews.reduce((s, r) => s + r.rating, 0) / reviews.length).toFixed(1);

  const toggleHelpful = (id: number) => {
    setHelpfulClicked((prev) => prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]);
  };

  return (
    <div className="bg-card rounded-xl border border-border shadow-automotive p-6">
      {/* Header */}
      <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
        <div>
          <h2 className="text-lg font-bold text-foreground">Customer Reviews</h2>
          <div className="flex items-center gap-2 mt-1">
            <div className="flex items-center gap-0.5">
              {[1, 2, 3, 4, 5].map((i) =>
              <Icon key={i} name="StarIcon" size={16} variant="solid" className="text-accent" />
              )}
            </div>
            <span className="text-2xl font-bold text-foreground">{avgRating}</span>
            <span className="text-sm text-muted-foreground">({reviews.length} reviews)</span>
          </div>
        </div>
        {/* Rating Distribution */}
        <div className="flex flex-col gap-1 min-w-[160px]">
          {[5, 4, 3, 2, 1].map((star) => {
            const count = reviews.filter((r) => r.rating === star).length;
            const pct = Math.round(count / reviews.length * 100);
            return (
              <div key={star} className="flex items-center gap-2">
                <span className="text-xs text-muted-foreground w-3">{star}</span>
                <Icon name="StarIcon" size={10} variant="solid" className="text-accent" />
                <div className="flex-1 h-1.5 bg-muted rounded-full overflow-hidden">
                  <div className="h-full bg-accent rounded-full" style={{ width: `${pct}%` }} />
                </div>
                <span className="text-xs text-muted-foreground w-6">{count}</span>
              </div>);

          })}
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 flex-wrap mb-5">
        {filterOptions.map((f) =>
        <button
          key={f}
          onClick={() => setActiveFilter(f)}
          className={`px-3 py-1.5 rounded-full text-xs font-medium transition-automotive ${
          activeFilter === f ? 'bg-primary text-primary-foreground' : 'bg-muted text-muted-foreground hover:bg-primary/10 hover:text-primary'}`
          }>
          
            {f}
          </button>
        )}
      </div>

      {/* Reviews List */}
      <div className="flex flex-col gap-5">
        {filtered.map((review) =>
        <div key={review.id} className="border-b border-border last:border-0 pb-5 last:pb-0">
            <div className="flex items-start gap-3 mb-3">
              <div className="w-10 h-10 rounded-full overflow-hidden flex-shrink-0">
                <AppImage src={review.avatar} alt={review.avatarAlt} width={40} height={40} className="object-cover w-full h-full" />
              </div>
              <div className="flex-1 min-w-0">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="font-semibold text-sm text-foreground">{review.name}</span>
                  <span className="text-xs text-muted-foreground">{review.date}</span>
                </div>
                <div className="flex items-center gap-0.5 mt-0.5">
                  {[1, 2, 3, 4, 5].map((i) =>
                <Icon
                  key={i}
                  name="StarIcon"
                  size={12}
                  variant={i <= review.rating ? 'solid' : 'outline'}
                  className={i <= review.rating ? 'text-accent' : 'text-muted-foreground'} />

                )}
                </div>
              </div>
            </div>
            <h4 className="text-sm font-semibold text-foreground mb-1">{review.title}</h4>
            <p className="text-sm text-muted-foreground leading-relaxed mb-3">{review.body}</p>
            <div className="flex flex-wrap items-center gap-2">
              {review.tags.map((tag) =>
            <span key={tag} className="text-xs bg-muted text-muted-foreground px-2 py-0.5 rounded-full">{tag}</span>
            )}
              <button
              onClick={() => toggleHelpful(review.id)}
              className={`ml-auto flex items-center gap-1 text-xs transition-automotive ${
              helpfulClicked.includes(review.id) ? 'text-primary' : 'text-muted-foreground hover:text-primary'}`
              }>
              
                <Icon name="HandThumbUpIcon" size={14} variant={helpfulClicked.includes(review.id) ? 'solid' : 'outline'} />
                Helpful ({review.helpful + (helpfulClicked.includes(review.id) ? 1 : 0)})
              </button>
            </div>
          </div>
        )}
      </div>
    </div>);

}