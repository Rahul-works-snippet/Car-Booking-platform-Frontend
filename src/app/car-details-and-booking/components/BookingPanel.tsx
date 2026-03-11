'use client';

import { useState } from 'react';
import Icon from '@/components/ui/AppIcon';
import Link from 'next/link';

interface BookingPanelProps {
  onStepChange: (step: number) => void;
}

interface AddOn {
  id: string;
  label: string;
  price: number;
  icon: string;
}

const addOns: AddOn[] = [
  { id: 'gps', label: 'GPS Navigation', price: 5, icon: 'MapIcon' },
  { id: 'child_seat', label: 'Child Safety Seat', price: 8, icon: 'UserIcon' },
  { id: 'wifi', label: 'Portable Wi-Fi', price: 7, icon: 'WifiIcon' },
  { id: 'roadside', label: 'Roadside Assistance', price: 10, icon: 'WrenchScrewdriverIcon' },
];

const insuranceOptions = [
  { id: 'basic', label: 'Basic Coverage', price: 0, description: 'Liability only, included in base price' },
  { id: 'standard', label: 'Standard Protection', price: 15, description: 'Collision + theft protection' },
  { id: 'premium', label: 'Premium Shield', price: 28, description: 'Full coverage, zero deductible' },
];

const BASE_PRICE_PER_DAY = 89;

export default function BookingPanel({ onStepChange }: BookingPanelProps) {
  const [pickup, setPickup] = useState('');
  const [dropoff, setDropoff] = useState('');
  const [pickupTime, setPickupTime] = useState('10:00');
  const [dropoffTime, setDropoffTime] = useState('10:00');
  const [pickupLocation, setPickupLocation] = useState('SFO Airport - Terminal 2');
  const [dropoffLocation, setDropoffLocation] = useState('SFO Airport - Terminal 2');
  const [selectedInsurance, setSelectedInsurance] = useState('basic');
  const [selectedAddOns, setSelectedAddOns] = useState<string[]>([]);
  const [promoCode, setPromoCode] = useState('');
  const [promoApplied, setPromoApplied] = useState(false);
  const [promoError, setPromoError] = useState('');
  const [termsAccepted, setTermsAccepted] = useState(false);
  const [saved, setSaved] = useState(false);
  const [showConfirmModal, setShowConfirmModal] = useState(false);
  const [bookingSuccess, setBookingSuccess] = useState(false);

  const calcDays = () => {
    if (!pickup || !dropoff) return 1;
    const d1 = new Date(pickup);
    const d2 = new Date(dropoff);
    const diff = Math.ceil((d2.getTime() - d1.getTime()) / (1000 * 60 * 60 * 24));
    return diff > 0 ? diff : 1;
  };

  const days = calcDays();
  const insurancePrice = insuranceOptions.find(o => o.id === selectedInsurance)?.price ?? 0;
  const addOnsTotal = selectedAddOns.reduce((sum, id) => {
    const a = addOns.find(a => a.id === id);
    return sum + (a?.price ?? 0);
  }, 0);
  const subtotal = (BASE_PRICE_PER_DAY + insurancePrice + addOnsTotal) * days;
  const discount = promoApplied ? Math.round(subtotal * 0.1) : 0;
  const taxes = Math.round((subtotal - discount) * 0.12);
  const total = subtotal - discount + taxes;

  const toggleAddOn = (id: string) => {
    setSelectedAddOns(prev => prev.includes(id) ? prev.filter(a => a !== id) : [...prev, id]);
  };

  const applyPromo = () => {
    if (promoCode.toUpperCase() === 'DRIVE10') {
      setPromoApplied(true);
      setPromoError('');
    } else {
      setPromoError('Invalid promo code. Try DRIVE10 for 10% off.');
      setPromoApplied(false);
    }
  };

  const handleBookNow = () => {
    if (!termsAccepted) return;
    onStepChange(4);
    setShowConfirmModal(true);
  };

  const handleConfirmPayment = () => {
    setShowConfirmModal(false);
    setBookingSuccess(true);
    onStepChange(5);
  };

  return (
    <>
      <div className="bg-card rounded-xl border border-border shadow-automotive-md overflow-hidden">
        {/* Price Header */}
        <div className="bg-primary px-5 py-4">
          <div className="flex items-end justify-between">
            <div>
              <span className="text-primary-foreground/80 text-sm">Starting from</span>
              <div className="flex items-baseline gap-1">
                <span className="text-3xl font-bold text-primary-foreground">${BASE_PRICE_PER_DAY}</span>
                <span className="text-primary-foreground/80 text-sm">/day</span>
              </div>
            </div>
            <div className="text-right">
              <span className="text-primary-foreground/80 text-xs">Total ({days} day{days > 1 ? 's' : ''})</span>
              <div className="text-xl font-bold text-primary-foreground">${total.toLocaleString()}</div>
            </div>
          </div>
        </div>

        <div className="p-5 flex flex-col gap-5">
          {/* Dates */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="CalendarDaysIcon" size={16} variant="outline" className="text-primary" />
              Rental Dates
            </h3>
            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Pick-up Date</label>
                <input
                  type="date"
                  value={pickup}
                  onChange={e => setPickup(e.target.value)}
                  className="w-full h-10 px-3 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-automotive"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Drop-off Date</label>
                <input
                  type="date"
                  value={dropoff}
                  onChange={e => setDropoff(e.target.value)}
                  className="w-full h-10 px-3 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-automotive"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Pick-up Time</label>
                <input
                  type="time"
                  value={pickupTime}
                  onChange={e => setPickupTime(e.target.value)}
                  className="w-full h-10 px-3 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-automotive"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Drop-off Time</label>
                <input
                  type="time"
                  value={dropoffTime}
                  onChange={e => setDropoffTime(e.target.value)}
                  className="w-full h-10 px-3 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-automotive"
                />
              </div>
            </div>
          </div>

          {/* Locations */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="MapPinIcon" size={16} variant="outline" className="text-primary" />
              Locations
            </h3>
            <div className="flex flex-col gap-2">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Pick-up Location</label>
                <select
                  value={pickupLocation}
                  onChange={e => setPickupLocation(e.target.value)}
                  className="w-full h-10 px-3 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-automotive"
                >
                  <option>SFO Airport - Terminal 2</option>
                  <option>Downtown San Francisco</option>
                  <option>Union Square Office</option>
                  <option>Oakland International Airport</option>
                </select>
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Drop-off Location</label>
                <select
                  value={dropoffLocation}
                  onChange={e => setDropoffLocation(e.target.value)}
                  className="w-full h-10 px-3 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-automotive"
                >
                  <option>SFO Airport - Terminal 2</option>
                  <option>Downtown San Francisco</option>
                  <option>Union Square Office</option>
                  <option>Oakland International Airport</option>
                </select>
              </div>
            </div>
          </div>

          {/* Insurance */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="ShieldCheckIcon" size={16} variant="outline" className="text-primary" />
              Insurance Coverage
            </h3>
            <div className="flex flex-col gap-2">
              {insuranceOptions.map(opt => (
                <label
                  key={opt.id}
                  className={`flex items-start gap-3 p-3 rounded-lg border cursor-pointer transition-automotive ${
                    selectedInsurance === opt.id ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
                  }`}
                >
                  <input
                    type="radio"
                    name="insurance"
                    value={opt.id}
                    checked={selectedInsurance === opt.id}
                    onChange={() => setSelectedInsurance(opt.id)}
                    className="mt-0.5 accent-primary"
                  />
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center justify-between">
                      <span className="text-sm font-medium text-foreground">{opt.label}</span>
                      <span className="text-sm font-semibold text-primary">
                        {opt.price === 0 ? 'Included' : `+$${opt.price}/day`}
                      </span>
                    </div>
                    <p className="text-xs text-muted-foreground mt-0.5">{opt.description}</p>
                  </div>
                </label>
              ))}
            </div>
          </div>

          {/* Add-ons */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-3 flex items-center gap-2">
              <Icon name="PlusCircleIcon" size={16} variant="outline" className="text-primary" />
              Additional Services
            </h3>
            <div className="grid grid-cols-2 gap-2">
              {addOns.map(addon => (
                <label
                  key={addon.id}
                  className={`flex flex-col items-center text-center gap-1.5 p-3 rounded-lg border cursor-pointer transition-automotive ${
                    selectedAddOns.includes(addon.id) ? 'border-primary bg-primary/5' : 'border-border hover:border-primary/40'
                  }`}
                >
                  <input
                    type="checkbox"
                    checked={selectedAddOns.includes(addon.id)}
                    onChange={() => toggleAddOn(addon.id)}
                    className="sr-only"
                  />
                  <Icon name={addon.icon as any} size={20} variant="outline" className={selectedAddOns.includes(addon.id) ? 'text-primary' : 'text-muted-foreground'} />
                  <span className="text-xs font-medium text-foreground leading-tight">{addon.label}</span>
                  <span className="text-xs text-primary font-semibold">+${addon.price}/day</span>
                  {selectedAddOns.includes(addon.id) && (
                    <Icon name="CheckCircleIcon" size={14} variant="solid" className="text-primary" />
                  )}
                </label>
              ))}
            </div>
          </div>

          {/* Promo Code */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-2 flex items-center gap-2">
              <Icon name="TagIcon" size={16} variant="outline" className="text-primary" />
              Promo Code
            </h3>
            <div className="flex gap-2">
              <input
                type="text"
                value={promoCode}
                onChange={e => setPromoCode(e.target.value)}
                placeholder="Enter code (e.g. DRIVE10)"
                className="flex-1 h-10 px-3 bg-background border border-border rounded-lg text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition-automotive"
              />
              <button
                onClick={applyPromo}
                className="h-10 px-4 bg-primary text-primary-foreground text-sm font-medium rounded-lg hover:bg-primary/90 transition-automotive"
              >
                Apply
              </button>
            </div>
            {promoApplied && (
              <p className="text-xs text-success mt-1 flex items-center gap-1">
                <Icon name="CheckCircleIcon" size={12} variant="solid" />
                10% discount applied!
              </p>
            )}
            {promoError && (
              <p className="text-xs text-error mt-1">{promoError}</p>
            )}
          </div>

          {/* Price Breakdown */}
          <div className="bg-muted rounded-lg p-4">
            <h3 className="text-sm font-semibold text-foreground mb-3">Price Breakdown</h3>
            <div className="flex flex-col gap-2 text-sm">
              <div className="flex justify-between">
                <span className="text-muted-foreground">Base rate ({days} day{days > 1 ? 's' : ''} × ${BASE_PRICE_PER_DAY})</span>
                <span className="text-foreground font-medium">${(BASE_PRICE_PER_DAY * days).toLocaleString()}</span>
              </div>
              {insurancePrice > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Insurance ({days} day{days > 1 ? 's' : ''} × ${insurancePrice})</span>
                  <span className="text-foreground font-medium">${(insurancePrice * days).toLocaleString()}</span>
                </div>
              )}
              {addOnsTotal > 0 && (
                <div className="flex justify-between">
                  <span className="text-muted-foreground">Add-ons ({days} day{days > 1 ? 's' : ''} × ${addOnsTotal})</span>
                  <span className="text-foreground font-medium">${(addOnsTotal * days).toLocaleString()}</span>
                </div>
              )}
              {discount > 0 && (
                <div className="flex justify-between text-success">
                  <span>Promo discount (10%)</span>
                  <span>-${discount.toLocaleString()}</span>
                </div>
              )}
              <div className="flex justify-between">
                <span className="text-muted-foreground">Taxes &amp; fees (12%)</span>
                <span className="text-foreground font-medium">${taxes.toLocaleString()}</span>
              </div>
              <div className="border-t border-border pt-2 flex justify-between font-bold text-base">
                <span className="text-foreground">Total</span>
                <span className="text-primary">${total.toLocaleString()}</span>
              </div>
            </div>
          </div>

          {/* Terms */}
          <label className="flex items-start gap-3 cursor-pointer">
            <input
              type="checkbox"
              checked={termsAccepted}
              onChange={e => setTermsAccepted(e.target.checked)}
              className="mt-0.5 w-4 h-4 accent-primary"
            />
            <span className="text-xs text-muted-foreground leading-relaxed">
              I agree to the{' '}
              <span className="text-primary underline cursor-pointer">Terms &amp; Conditions</span>
              {' '}and{' '}
              <span className="text-primary underline cursor-pointer">Privacy Policy</span>
              . I confirm I am 21+ years old with a valid driver&apos;s license.
            </span>
          </label>

          {/* Actions */}
          <div className="flex flex-col gap-2">
            <button
              onClick={handleBookNow}
              disabled={!termsAccepted}
              className="w-full h-12 bg-primary text-primary-foreground font-semibold rounded-lg shadow-automotive hover:shadow-automotive-md active:scale-95 transition-automotive disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
            >
              <Icon name="LockClosedIcon" size={18} variant="outline" />
              Book Now — ${total.toLocaleString()}
            </button>
            <button
              onClick={() => setSaved(v => !v)}
              className={`w-full h-10 border rounded-lg text-sm font-medium transition-automotive flex items-center justify-center gap-2 ${
                saved ? 'border-accent text-accent bg-accent/10' : 'border-border text-muted-foreground hover:border-primary hover:text-primary'
              }`}
            >
              <Icon name={saved ? 'BookmarkSolidIcon' : 'BookmarkIcon'} size={16} variant={saved ? 'solid' : 'outline'} />
              {saved ? 'Saved for Later' : 'Save for Later'}
            </button>
          </div>

          {/* Trust badges */}
          <div className="flex items-center justify-center gap-4 pt-1">
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Icon name="ShieldCheckIcon" size={14} variant="outline" className="text-success" />
              SSL Secured
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Icon name="LockClosedIcon" size={14} variant="outline" className="text-success" />
              PCI Compliant
            </div>
            <div className="flex items-center gap-1 text-xs text-muted-foreground">
              <Icon name="ArrowPathIcon" size={14} variant="outline" className="text-success" />
              Free Cancel
            </div>
          </div>
        </div>
      </div>

      {/* Confirm Modal */}
      {showConfirmModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm">
          <div className="bg-card rounded-xl border border-border shadow-automotive-xl w-full max-w-md p-6">
            <div className="flex items-center justify-between mb-4">
              <h2 className="text-lg font-bold text-foreground">Confirm Payment</h2>
              <button onClick={() => setShowConfirmModal(false)} className="text-muted-foreground hover:text-foreground">
                <Icon name="XMarkIcon" size={20} variant="outline" />
              </button>
            </div>
            <div className="bg-muted rounded-lg p-4 mb-4">
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Vehicle</span>
                <span className="font-medium text-foreground">2024 BMW 5 Series</span>
              </div>
              <div className="flex justify-between text-sm mb-2">
                <span className="text-muted-foreground">Duration</span>
                <span className="font-medium text-foreground">{days} day{days > 1 ? 's' : ''}</span>
              </div>
              <div className="flex justify-between text-sm font-bold">
                <span className="text-foreground">Total Amount</span>
                <span className="text-primary">${total.toLocaleString()}</span>
              </div>
            </div>
            <div className="mb-4">
              <label className="text-xs text-muted-foreground mb-1 block">Card Number</label>
              <input
                type="text"
                defaultValue="4242 4242 4242 4242"
                className="w-full h-10 px-3 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
              />
            </div>
            <div className="grid grid-cols-2 gap-3 mb-5">
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">Expiry</label>
                <input
                  type="text"
                  defaultValue="12/27"
                  className="w-full h-10 px-3 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
              <div>
                <label className="text-xs text-muted-foreground mb-1 block">CVV</label>
                <input
                  type="text"
                  defaultValue="123"
                  className="w-full h-10 px-3 bg-background border border-border rounded-lg text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary"
                />
              </div>
            </div>
            <button
              onClick={handleConfirmPayment}
              className="w-full h-12 bg-primary text-primary-foreground font-semibold rounded-lg shadow-automotive hover:shadow-automotive-md active:scale-95 transition-automotive flex items-center justify-center gap-2"
            >
              <Icon name="LockClosedIcon" size={18} variant="outline" />
              Confirm &amp; Pay ${total.toLocaleString()}
            </button>
          </div>
        </div>
      )}

      {/* Success Modal */}
      {bookingSuccess && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-foreground/50 backdrop-blur-sm">
          <div className="bg-card rounded-xl border border-border shadow-automotive-xl w-full max-w-md p-8 text-center">
            <div className="w-16 h-16 bg-success/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <Icon name="CheckCircleIcon" size={40} variant="solid" className="text-success" />
            </div>
            <h2 className="text-xl font-bold text-foreground mb-2">Booking Confirmed!</h2>
            <p className="text-muted-foreground text-sm mb-4">
              Your reservation for the 2024 BMW 5 Series has been confirmed. A confirmation email has been sent to your registered email address.
            </p>
            <div className="bg-muted rounded-lg p-4 mb-5 text-left">
              <div className="flex justify-between text-sm mb-1">
                <span className="text-muted-foreground">Booking Reference</span>
                <span className="font-mono font-bold text-primary">DE-2026-78432</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Total Paid</span>
                <span className="font-bold text-foreground">${total.toLocaleString()}</span>
              </div>
            </div>
            <div className="flex gap-3">
              <button
                onClick={() => setBookingSuccess(false)}
                className="flex-1 h-10 border border-border text-foreground text-sm font-medium rounded-lg hover:bg-muted transition-automotive"
              >
                Close
              </button>
              <Link
                href="/car-search-and-browse"
                className="flex-1 h-10 bg-primary text-primary-foreground text-sm font-medium rounded-lg flex items-center justify-center hover:bg-primary/90 transition-automotive"
              >
                Browse More Cars
              </Link>
            </div>
          </div>
        </div>
      )}
    </>
  );
}