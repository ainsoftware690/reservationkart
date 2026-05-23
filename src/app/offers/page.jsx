'use client';

import { useState } from 'react';
import Link from 'next/link';
import {
  Copy, Check, Clock, Tag, Sparkles, Gift,
  Plane, Hotel, Calendar, Percent,
} from 'lucide-react';
import { OFFERS } from '../../lib/offers';

const CATEGORIES = [
  { id: 'all',         label: 'All Offers',      icon: Sparkles },
  { id: 'flights',     label: 'Flight Offers',   icon: Plane    },
  { id: 'hotels',      label: 'Hotel Offers',    icon: Hotel    },
  { id: 'seasonal',    label: 'Seasonal',        icon: Calendar },
];

// Extended offers — more variety
const EXTENDED_OFFERS = [
  ...OFFERS,
  {
    id: 'hotel-saver', title: 'Hotel Saver',
    discount: '$50 OFF',          code: 'STAY50',
    description: 'Save $50 on hotel bookings above $200',
    color: 'from-cyan-500 to-blue-600',
    icon: '🏨', expiresIn: '30 days',
  },
  {
    id: 'last-minute', title: 'Last-Minute Deals',
    discount: '25% OFF',          code: 'LASTMIN25',
    description: 'Book flights departing within 7 days for 25% off',
    color: 'from-red-500 to-orange-500',
    icon: '⚡', expiresIn: 'Always available',
  },
  {
    id: 'family-pack', title: 'Family Package',
    discount: '$100 OFF',         code: 'FAMILY100',
    description: 'Special discount on family of 4 or more travelers',
    color: 'from-violet-500 to-purple-600',
    icon: '👨‍👩‍👧‍👦', expiresIn: 'Limited time',
  },
  {
    id: 'birthday-spl', title: 'Birthday Special',
    discount: '15% OFF',          code: 'BIRTHDAY15',
    description: 'Celebrate your birthday with a discount on any flight',
    color: 'from-pink-500 to-rose-500',
    icon: '🎂', expiresIn: 'Within your birthday month',
  },
];

export default function OffersPage() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [copiedCode,    setCopiedCode]     = useState(null);

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {}
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-orange-500 via-brand-orange-600 to-pink-600 py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <div className="absolute top-20 left-1/4 w-80 h-80 bg-yellow-400 rounded-full blur-3xl" />
          <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-pink-400 rounded-full blur-3xl" />
        </div>

        {/* Floating decorative elements */}
        <div className="absolute top-10 left-10 text-6xl opacity-20 animate-bounce">🎁</div>
        <div className="absolute bottom-10 right-10 text-6xl opacity-20 animate-pulse">✈️</div>
        <div className="absolute top-1/2 right-20 text-5xl opacity-20">💰</div>

        <div className="relative container-custom text-center text-white">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/20 backdrop-blur-sm text-sm font-bold uppercase tracking-wider mb-4">
            <Gift className="h-3.5 w-3.5" />
            Limited Time Deals
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
            Exclusive Travel
            <span className="block">Offers & Deals</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white/90 max-w-2xl mx-auto">
            Save big on flights, hotels, and packages with our handpicked promo codes
          </p>

          {/* Stats */}
          <div className="mt-8 flex flex-wrap justify-center gap-6 sm:gap-12">
            {[
              { value: `${EXTENDED_OFFERS.length}+`, label: 'Active Offers' },
              { value: '50%',                         label: 'Max Discount' },
              { value: '24/7',                        label: 'Available'    },
            ].map((s) => (
              <div key={s.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold">{s.value}</div>
                <div className="text-sm text-white/80 mt-1">{s.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="sticky top-16 md:top-20 z-30 bg-white border-b border-gray-200 shadow-sm">
        <div className="container-custom py-4">
          <div className="flex items-center gap-2 overflow-x-auto pb-1">
            {CATEGORIES.map((cat) => {
              const Icon     = cat.icon;
              const isActive = activeCategory === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setActiveCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold whitespace-nowrap transition-all ${
                    isActive
                      ? 'bg-brand-orange-500 text-white shadow-md'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  <Icon className="h-4 w-4" />
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Featured Offer Banner */}
      <section className="container-custom py-8">
        <div className="relative bg-gradient-to-r from-brand-dark to-blue-900 rounded-3xl p-6 sm:p-10 overflow-hidden">
          <div className="absolute top-0 right-0 w-64 h-64 bg-brand-orange-500/20 rounded-full blur-3xl -translate-y-1/2 translate-x-1/2" />
          <div className="relative flex flex-col sm:flex-row items-center gap-6 text-white">
            <div className="text-6xl sm:text-8xl">🎉</div>
            <div className="flex-1 text-center sm:text-left">
              <span className="inline-block px-3 py-1 rounded-full bg-brand-orange-500/30 text-brand-orange-300 text-xs font-bold uppercase tracking-wider mb-2">
                Featured Offer
              </span>
              <h2 className="text-2xl sm:text-4xl font-bold">First Booking? Get 20% OFF</h2>
              <p className="mt-2 text-white/80">
                New users get exclusive 20% discount on their first flight booking. No minimum spend.
              </p>
            </div>
            <div className="flex flex-col items-center gap-3">
              <div className="text-center">
                <div className="text-xs text-white/60 uppercase tracking-wider">Use Code</div>
                <div className="text-2xl font-bold text-brand-orange-400 font-mono">FIRSTFLY</div>
              </div>
              <button
                onClick={() => handleCopy('FIRSTFLY')}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange-500 text-white font-bold hover:bg-brand-orange-600"
              >
                {copiedCode === 'FIRSTFLY' ? (
                  <><Check className="h-4 w-4" /> Copied!</>
                ) : (
                  <><Copy className="h-4 w-4" /> Copy Code</>
                )}
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* All Offers Grid */}
      <section className="container-custom pb-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-bold text-brand-dark">All Active Offers</h2>
          <span className="text-sm font-semibold text-gray-500">
            {EXTENDED_OFFERS.length} offers
          </span>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-5">
          {EXTENDED_OFFERS.map((offer) => (
            <OfferCard
              key={offer.id}
              offer={offer}
              copiedCode={copiedCode}
              onCopy={handleCopy}
            />
          ))}
        </div>
      </section>

      {/* How to Use Section */}
      <section className="bg-white py-16">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="text-sm font-bold uppercase tracking-wider text-brand-orange-500">
              How It Works
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-brand-dark">
              Use Coupons in 3 Easy Steps
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            {[
              { step: '01', icon: Copy,    title: 'Copy Code',  desc: 'Click the copy button on any offer card to copy the promo code to your clipboard' },
              { step: '02', icon: Plane,   title: 'Book Trip',  desc: 'Search for your flight or hotel and proceed to the checkout page' },
              { step: '03', icon: Percent, title: 'Apply & Save',desc: 'Paste the code in the promo field at checkout and watch your savings appear' },
            ].map(({ step, icon: Icon, title, desc }) => (
              <div key={step} className="relative bg-gradient-to-br from-brand-orange-50 to-white rounded-2xl p-6 border border-orange-100">
                <div className="absolute -top-3 -right-3 w-12 h-12 rounded-full bg-brand-orange-500 text-white flex items-center justify-center font-bold shadow-lg">
                  {step}
                </div>
                <div className="w-12 h-12 rounded-xl bg-brand-orange-500/10 flex items-center justify-center text-brand-orange-500">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-brand-dark">{title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-brand-orange-500 to-pink-600">
        <div className="container-custom text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to Save?</h2>
          <p className="mt-3 text-white/90">Start booking with these exclusive offers today</p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link href="/flights"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-orange-600 font-bold hover:bg-gray-50">
              <Plane className="h-5 w-5" /> Book Flights
            </Link>
            <Link href="/hotels"
              className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white font-bold hover:bg-white/30">
              <Hotel className="h-5 w-5" /> Book Hotels
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ==========================================================
   OFFER CARD
   ========================================================== */
function OfferCard({ offer, copiedCode, onCopy }) {
  const isCopied = copiedCode === offer.code;

  return (
    <article className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1">
      {/* Gradient header */}
      <div className={`relative p-5 bg-gradient-to-br ${offer.color} text-white`}>
        <div className="text-4xl mb-2">{offer.icon}</div>
        <div className="text-xs font-semibold opacity-90 uppercase tracking-wide">{offer.title}</div>
        <div className="text-2xl sm:text-3xl font-bold mt-1">{offer.discount}</div>

        {/* Ticket cutouts */}
        <div className="absolute -bottom-3 left-0 w-6 h-6 bg-white rounded-full" />
        <div className="absolute -bottom-3 right-0 w-6 h-6 bg-white rounded-full" />
      </div>

      {/* Body */}
      <div className="p-5">
        <p className="text-sm text-gray-600 leading-relaxed min-h-[3rem]">
          {offer.description}
        </p>

        <button
          type="button"
          onClick={() => onCopy(offer.code)}
          aria-label={`Copy promo code ${offer.code}`}
          className={`mt-4 w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border-2 border-dashed transition-colors ${
            isCopied
              ? 'border-green-400 bg-green-50'
              : 'border-brand-orange-300 bg-brand-orange-50 hover:bg-brand-orange-100'
          }`}
        >
          <div className="flex items-center gap-2 min-w-0">
            <Tag className={`h-4 w-4 flex-shrink-0 ${isCopied ? 'text-green-600' : 'text-brand-orange-500'}`} />
            <span className={`text-sm font-bold truncate ${isCopied ? 'text-green-700' : 'text-brand-orange-700'}`}>
              {offer.code}
            </span>
          </div>
          {isCopied ? (
            <span className="flex items-center gap-1 text-xs font-bold text-green-600">
              <Check className="h-3.5 w-3.5" />
              Copied
            </span>
          ) : (
            <Copy className="h-3.5 w-3.5 text-brand-orange-500 flex-shrink-0" />
          )}
        </button>

        <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
          <Clock className="h-3 w-3" />
          Valid for {offer.expiresIn}
        </div>
      </div>
    </article>
  );
}