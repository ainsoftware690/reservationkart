'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import {
  Star, MapPin, Wifi, Dumbbell, Waves, UtensilsCrossed,
  SlidersHorizontal, Heart, ArrowRight,
} from 'lucide-react';
import { HOTELS } from '../../lib/hotels';
import { useCurrency } from '../../contexts/CurrencyContext';
import HotelSearch from '../components/sections/HotelSearch';

const AMENITY_ICONS = {
  'WiFi':           Wifi,
  'Pool':           Waves,
  'Gym':            Dumbbell,
  'Restaurant':     UtensilsCrossed,
  'Infinity Pool':  Waves,
};

const TAG_COLORS = {
  'Luxury':        'bg-purple-500',
  'Iconic':        'bg-blue-500',
  'Popular':       'bg-green-500',
  'Trending':      'bg-pink-500',
  'Best Value':    'bg-orange-500',
  'Ultra Luxury':  'bg-yellow-600',
};

export default function HotelsPage() {
  const { formatPrice }           = useCurrency();
  const [sortBy,   setSortBy]     = useState('price-asc');
  const [maxPrice, setMaxPrice]   = useState(1500);
  const [minStars, setMinStars]   = useState(0);
  const [liked,    setLiked]      = useState(new Set());

  const filtered = useMemo(() => {
    let result = HOTELS.filter(
      (h) => h.pricePerNight <= maxPrice && h.stars >= minStars
    );
    switch (sortBy) {
      case 'price-asc':  result.sort((a, b) => a.pricePerNight - b.pricePerNight); break;
      case 'price-desc': result.sort((a, b) => b.pricePerNight - a.pricePerNight); break;
      case 'rating':     result.sort((a, b) => b.rating - a.rating); break;
      default: break;
    }
    return result;
  }, [sortBy, maxPrice, minStars]);

  const toggleLike = (id) => {
    setLiked((prev) => {
      const next = new Set(prev);
      next.has(id) ? next.delete(id) : next.add(id);
      return next;
    });
  };

  const nights = 1;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <div className="bg-gradient-to-br from-blue-900 via-blue-800 to-brand-dark relative overflow-hidden py-16 sm:py-24 pb-40 sm:pb-48">
        <div className="absolute inset-0 opacity-20" style={{
          backgroundImage: 'url(https://images.unsplash.com/photo-1542314831-068cd1dbfeeb?w=1600&q=80)',
          backgroundSize: 'cover', backgroundPosition: 'center',
        }} />
        <div className="relative container-custom text-center text-white">
          <h1 className="text-3xl sm:text-5xl font-bold">Find Your Perfect Stay</h1>
          <p className="mt-3 text-white/80 text-lg">
            500,000+ hotels worldwide at best prices
          </p>
        </div>
      </div>

      {/* Search */}
      <HotelSearch />

      {/* Results */}
      <div className="container-custom pb-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Filters */}
          <aside className="hidden lg:block lg:col-span-3">
            <div className="bg-white rounded-2xl shadow-sm p-5 space-y-6 sticky top-24">
              <div className="flex items-center justify-between">
                <h3 className="font-bold text-brand-dark flex items-center gap-2">
                  <SlidersHorizontal className="h-4 w-4" /> Filters
                </h3>
                <button
                  onClick={() => { setMaxPrice(1500); setMinStars(0); }}
                  className="text-xs font-semibold text-brand-orange-500 hover:underline"
                >
                  Clear all
                </button>
              </div>

              {/* Price filter */}
              <div>
                <h4 className="text-sm font-bold text-brand-dark mb-3">
                  Max Price: {formatPrice(maxPrice)}/night
                </h4>
                <input type="range" min={50} max={1500} step={50} value={maxPrice}
                  onChange={(e) => setMaxPrice(Number(e.target.value))}
                  className="w-full accent-brand-orange-500" />
                <div className="flex justify-between text-xs text-gray-500 mt-1">
                  <span>{formatPrice(50)}</span>
                  <span>{formatPrice(1500)}</span>
                </div>
              </div>

              {/* Star filter */}
              <div>
                <h4 className="text-sm font-bold text-brand-dark mb-3">Minimum Stars</h4>
                <div className="flex gap-2">
                  {[0, 3, 4, 5].map((s) => (
                    <button key={s} type="button"
                      onClick={() => setMinStars(s)}
                      className={`flex-1 py-2 rounded-lg text-xs font-bold transition-all ${
                        minStars === s ? 'bg-brand-orange-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                      }`}
                    >
                      {s === 0 ? 'All' : `${s}★`}
                    </button>
                  ))}
                </div>
              </div>

              {/* Sort */}
              <div>
                <h4 className="text-sm font-bold text-brand-dark mb-3">Sort By</h4>
                <div className="space-y-2">
                  {[
                    { id: 'price-asc',  label: 'Price: Low to High' },
                    { id: 'price-desc', label: 'Price: High to Low' },
                    { id: 'rating',     label: 'Top Rated'          },
                  ].map((opt) => (
                    <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
                      <input type="radio" name="sort" value={opt.id}
                        checked={sortBy === opt.id}
                        onChange={() => setSortBy(opt.id)}
                        className="accent-brand-orange-500" />
                      <span className="text-sm text-gray-700">{opt.label}</span>
                    </label>
                  ))}
                </div>
              </div>
            </div>
          </aside>

          {/* Hotel Cards */}
          <main className="lg:col-span-9">
            <div className="flex items-center justify-between mb-4">
              <p className="text-sm font-semibold text-brand-dark">
                {filtered.length} hotels found
              </p>
              <select value={sortBy} onChange={(e) => setSortBy(e.target.value)}
                className="lg:hidden px-3 py-2 rounded-lg border-2 border-gray-200 bg-white text-sm font-semibold focus:border-brand-orange-500 focus:outline-none">
                <option value="price-asc">Price: Low to High</option>
                <option value="price-desc">Price: High to Low</option>
                <option value="rating">Top Rated</option>
              </select>
            </div>

            <div className="space-y-4">
              {filtered.map((hotel) => (
                <HotelCard
                  key={hotel.id}
                  hotel={hotel}
                  nights={nights}
                  isLiked={liked.has(hotel.id)}
                  onLike={() => toggleLike(hotel.id)}
                  formatPrice={formatPrice}
                />
              ))}

              {filtered.length === 0 && (
                <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                  <h3 className="text-lg font-bold text-brand-dark">No hotels match your filters</h3>
                  <button onClick={() => { setMaxPrice(1500); setMinStars(0); }}
                    className="mt-4 px-6 py-2 rounded-lg bg-brand-orange-500 text-white font-semibold">
                    Clear Filters
                  </button>
                </div>
              )}
            </div>
          </main>
        </div>
      </div>
    </div>
  );
}

function HotelCard({ hotel, nights, isLiked, onLike, formatPrice }) {
  return (
    <article className="bg-white rounded-2xl shadow-sm hover:shadow-lg transition-all overflow-hidden group">
      <div className="flex flex-col sm:flex-row">
        {/* Image */}
        <div className="relative sm:w-72 h-48 sm:h-auto flex-shrink-0 overflow-hidden">
          <Image
            src={hotel.image}
            alt={hotel.name}
            fill
            sizes="(max-width: 640px) 100vw, 288px"
            className="object-cover group-hover:scale-105 transition-transform duration-500"
          />
          {hotel.tag && (
            <span className={`absolute top-3 left-3 px-2 py-1 rounded-full text-xs font-bold text-white ${TAG_COLORS[hotel.tag] || 'bg-gray-500'}`}>
              {hotel.tag}
            </span>
          )}
          <button
            type="button"
            onClick={onLike}
            aria-label={isLiked ? 'Unlike' : 'Like'}
            className="absolute top-3 right-3 w-8 h-8 rounded-full bg-white/90 flex items-center justify-center shadow-sm"
          >
            <Heart className={`h-4 w-4 ${isLiked ? 'fill-red-500 text-red-500' : 'text-gray-400'}`} />
          </button>
        </div>

        {/* Content */}
        <div className="flex-1 p-5 flex flex-col justify-between">
          <div>
            <div className="flex flex-wrap items-start justify-between gap-2">
              <div>
                <h3 className="text-lg font-bold text-brand-dark">{hotel.name}</h3>
                <div className="flex items-center gap-1 mt-1">
                  <MapPin className="h-3 w-3 text-gray-400" />
                  <span className="text-sm text-gray-500">{hotel.city}, {hotel.country}</span>
                </div>
              </div>
              <div className="flex">
                {Array.from({ length: hotel.stars }).map((_, i) => (
                  <Star key={i} className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                ))}
              </div>
            </div>

            <div className="mt-3 flex items-center gap-2">
              <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-green-100">
                <Star className="h-3 w-3 fill-green-600 text-green-600" />
                <span className="text-xs font-bold text-green-700">{hotel.rating}</span>
              </div>
              <span className="text-xs text-gray-500">
                ({hotel.reviews.toLocaleString()} reviews)
              </span>
            </div>

            <div className="mt-3 flex flex-wrap gap-2">
              {hotel.amenities.slice(0, 4).map((a) => {
                const Icon = AMENITY_ICONS[a];
                return (
                  <span key={a} className="inline-flex items-center gap-1 px-2 py-1 rounded-lg bg-gray-100 text-xs text-gray-600 font-medium">
                    {Icon && <Icon className="h-3 w-3" />}
                    {a}
                  </span>
                );
              })}
            </div>
          </div>

          <div className="mt-4 pt-4 border-t border-gray-100 flex items-end justify-between flex-wrap gap-3">
            <div>
              <div className="text-xs text-gray-500">Starting from</div>
              <div className="text-2xl font-bold text-brand-orange-500">
                {formatPrice(hotel.pricePerNight)}
              </div>
              <div className="text-xs text-gray-500">per night</div>
            </div>
            <Link
              href={`/hotels/${hotel.id}`}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange-500 text-white font-bold text-sm hover:bg-brand-orange-600 active:scale-95 transition-all"
            >
              View Hotel <ArrowRight className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </div>
    </article>
  );
}