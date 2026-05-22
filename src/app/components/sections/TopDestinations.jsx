// Server Component — zero JS to client, fastest possible
'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowRight, MapPin } from 'lucide-react';
import { POPULAR_DESTINATIONS } from '../../../lib/destinations';
import { useCurrency } from '../../../contexts/CurrencyContext';

const TAG_COLORS = {
  'Trending':  'bg-pink-500',
  'Popular':   'bg-blue-500',
  'Best Deal': 'bg-green-500',
};



export default function TopDestinations() {
   const { formatPrice } = useCurrency();
  return (
    <section
      className="py-16 sm:py-20 bg-white"
      aria-labelledby="destinations-heading"
    >
      <div className="container-custom">
        {/* Section header */}
        <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-10">
          <div>
            <span className="text-sm font-bold uppercase tracking-wider text-brand-orange-500">
              Popular Destinations
            </span>
            <h2
              id="destinations-heading"
              className="mt-2 text-3xl sm:text-4xl font-bold text-brand-dark"
            >
              Popular Destinations
            </h2>
            <p className="mt-2 text-gray-600 max-w-xl">
              Explore the world's most loved cities with unbeatable flight deals
            </p>
          </div>
          <Link
            href="/destinations"
            className="hidden sm:inline-flex items-center gap-2 text-sm font-bold text-brand-orange-500 hover:gap-3 transition-all"
          >
            View All Destinations
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        {/* Grid — masonry-style on desktop, 2-col on mobile */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {POPULAR_DESTINATIONS.map((dest, idx) => (
            <Link
              key={dest.id}
              href={`/flights?to=${dest.code}`}
              className="group relative rounded-2xl overflow-hidden bg-gray-200 aspect-[3/4] focus:outline-none focus:ring-2 focus:ring-brand-orange-500"
            >
              {/* Image */}
              <Image
                src={dest.image}
                alt={`Flights to ${dest.city}, ${dest.country}`}
                fill
                sizes="(max-width: 640px) 50vw, (max-width: 1024px) 33vw, 25vw"
                className="object-cover transition-transform duration-700 group-hover:scale-110"
                priority={idx < 4}
              />

              {/* Dark gradient overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />

              {/* Tag badge */}
              {dest.tag && (
                <span
                  className={`absolute top-3 left-3 px-2.5 py-1 rounded-full text-xs font-bold text-white ${TAG_COLORS[dest.tag]}`}
                >
                  {dest.tag}
                </span>
              )}

              {/* Content */}
              <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                <div className="flex items-center gap-1 text-xs text-white/80">
                  <MapPin className="h-3 w-3" />
                  {dest.country}
                </div>
                <h3 className="mt-1 text-xl sm:text-2xl font-bold">
                  {dest.city}
                </h3>
                <div className="mt-2 flex items-end justify-between">
                  <div>
                   <div>
  <div className="text-xs text-white/70">Starting from</div>
  <div className="text-lg font-bold text-brand-orange-400">
    {formatPrice(dest.price)}
  </div>
</div>


                  </div>
                  <div className="w-9 h-9 rounded-full bg-white/20 backdrop-blur-sm flex items-center justify-center group-hover:bg-brand-orange-500 transition-colors">
                    <ArrowRight className="h-4 w-4" />
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {/* Mobile "View all" */}
        <div className="mt-8 text-center sm:hidden">
          <Link
            href="/destinations"
            className="inline-flex items-center gap-2 text-sm font-bold text-brand-orange-500"
          >
            View All Destinations
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}