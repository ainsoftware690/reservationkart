'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star, MapPin, Calendar, Heart, CheckCircle,
  ArrowRight, Sparkles, Plane,
} from 'lucide-react';
import { HOLIDAY_PACKAGES, HOLIDAY_CATEGORIES } from '../../lib/holidays';
import { useCurrency } from '../../contexts/CurrencyContext';

const TAG_COLORS = {
  'Best Seller':  'bg-orange-500',
  'Trending':     'bg-pink-500',
  'Best Value':   'bg-green-500',
  'Premium':      'bg-purple-500',
  'Romantic':     'bg-rose-500',
  'Family':       'bg-blue-500',
  'Seasonal':     'bg-amber-500',
  'Adventure':    'bg-emerald-500',
};

export default function HolidaysPage() {
  const { formatPrice } = useCurrency();
  const [category, setCategory] = useState('all');
  const [liked,    setLiked]    = useState(new Set());

  // For simplicity, all packages show in 'all'; future: filter by category tag mapping
  const packages = useMemo(() => HOLIDAY_PACKAGES, []);

  const toggleLike = (id) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-brand-dark py-20 sm:py-28 overflow-hidden">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=1600&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div className="absolute top-20 left-1/4 w-72 h-72 bg-pink-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 bg-purple-500/20 rounded-full blur-3xl" />

        <div className="relative container-custom text-center text-white">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-pink-500/20 text-pink-300 text-sm font-bold uppercase tracking-wider mb-4">
            <Sparkles className="h-3.5 w-3.5" />
            Holiday Packages
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
            Curated Holiday
            <span className="block text-brand-orange-400">Experiences</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Flights, hotels, tours, and unforgettable memories — all bundled in one perfect package.
          </p>

          {/* Category pills */}
          <div className="mt-8 flex flex-wrap justify-center gap-2">
            {HOLIDAY_CATEGORIES.map((cat) => {
              const isActive = category === cat.id;
              return (
                <button
                  key={cat.id}
                  type="button"
                  onClick={() => setCategory(cat.id)}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                    isActive
                      ? 'bg-brand-orange-500 text-white shadow-lg'
                      : 'bg-white/10 backdrop-blur-sm text-white hover:bg-white/20 border border-white/20'
                  }`}
                >
                  <span>{cat.emoji}</span>
                  {cat.label}
                </button>
              );
            })}
          </div>
        </div>
      </section>

      {/* Packages */}
      <section className="container-custom py-12 sm:py-16">
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl sm:text-3xl font-bold text-brand-dark">
            {packages.length} Holiday Packages
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {packages.map((pkg) => (
            <PackageCard
              key={pkg.id}
              pkg={pkg}
              isLiked={liked.has(pkg.id)}
              onLike={() => toggleLike(pkg.id)}
              formatPrice={formatPrice}
            />
          ))}
        </div>
      </section>

      {/* Why Book CTA */}
      <section className="py-16 bg-gradient-to-r from-brand-orange-500 to-brand-orange-600">
        <div className="container-custom text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold">Custom Holiday Plan?</h2>
          <p className="mt-3 text-white/90 max-w-xl mx-auto">
            Tell us your dream destination and budget — our experts will craft a personalized itinerary for you.
          </p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/contact"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-brand-orange-600 font-bold hover:bg-gray-50 shadow-lg">
              <Sparkles className="h-5 w-5" /> Plan My Trip
            </Link>
            <a href="tel:+18000000000"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white/20 backdrop-blur-sm text-white font-bold hover:bg-white/30">
              <Plane className="h-5 w-5" /> Talk to Expert
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}

/* ==========================================================
   PACKAGE CARD
   ========================================================== */
function PackageCard({ pkg, isLiked, onLike, formatPrice }) {
  const savings = pkg.oldPrice - pkg.price;

  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-2xl transition-all overflow-hidden group">
      <div className="relative h-56 overflow-hidden">
        <Image
          src={pkg.image}
          alt={pkg.title}
          fill
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          className="object-cover group-hover:scale-110 transition-transform duration-700"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />

        {/* Tag */}
        {pkg.tag && (
          <span className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white ${TAG_COLORS[pkg.tag] || 'bg-gray-500'}`}>
            {pkg.tag}
          </span>
        )}

        {/* Like */}
        <button
          type="button"
          onClick={onLike}
          aria-label={isLiked ? 'Unlike' : 'Like'}
          className="absolute top-3 right-3 w-9 h-9 rounded-full bg-white/90 flex items-center justify-center shadow-md hover:bg-white"
        >
          <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-500'}`} />
        </button>

        {/* Duration */}
        <div className="absolute bottom-3 left-3 inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-white/90 text-xs font-bold text-brand-dark">
          <Calendar className="h-3 w-3" />
          {pkg.nights}N / {pkg.days}D
        </div>
      </div>

      <div className="p-5">
        <h3 className="text-lg font-bold text-brand-dark line-clamp-1">{pkg.title}</h3>
        <div className="flex items-center gap-1 mt-1">
          <MapPin className="h-3 w-3 text-gray-400 flex-shrink-0" />
          <span className="text-xs text-gray-500 truncate">{pkg.destination}</span>
        </div>

        <div className="mt-3 flex items-center gap-2">
          <div className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-green-100">
            <Star className="h-3 w-3 fill-green-600 text-green-600" />
            <span className="text-xs font-bold text-green-700">{pkg.rating}</span>
          </div>
          <span className="text-xs text-gray-500">
            ({pkg.reviews.toLocaleString()} reviews)
          </span>
        </div>

        {/* Inclusions */}
        <div className="mt-4 flex flex-wrap gap-1.5">
          {pkg.inclusions.slice(0, 4).map((inc) => (
            <span key={inc} className="inline-flex items-center gap-1 px-2 py-0.5 rounded-md bg-blue-50 text-xs text-blue-700 font-medium">
              <CheckCircle className="h-2.5 w-2.5" />
              {inc}
            </span>
          ))}
          {pkg.inclusions.length > 4 && (
            <span className="text-xs text-gray-500">+{pkg.inclusions.length - 4} more</span>
          )}
        </div>

        {/* Price */}
        <div className="mt-4 pt-4 border-t border-gray-100 flex items-end justify-between gap-2">
          <div>
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-brand-orange-500">
                {formatPrice(pkg.price)}
              </span>
              {pkg.oldPrice && (
                <span className="text-sm text-gray-400 line-through">
                  {formatPrice(pkg.oldPrice)}
                </span>
              )}
            </div>
            <div className="text-xs text-green-600 font-semibold mt-0.5">
              Save {formatPrice(savings)} per person
            </div>
          </div>
          <Link
            href={`/contact?package=${pkg.id}`}
            className="inline-flex items-center gap-1 px-4 py-2 rounded-xl bg-brand-orange-500 text-white font-bold text-sm hover:bg-brand-orange-600 active:scale-95 transition-all flex-shrink-0"
          >
            View <ArrowRight className="h-3.5 w-3.5" />
          </Link>
        </div>
      </div>
    </article>
  );
}