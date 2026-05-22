'use client';

import { useSearchParams } from 'next/navigation';
import { useState, useMemo } from 'react';
import Link from 'next/link';
import {
  Plane, Clock, ArrowRight, Filter, X, SlidersHorizontal,
  TrendingUp, Briefcase, Check,
} from 'lucide-react';
import { DUMMY_FLIGHTS } from '@/lib/flights-mock';
import { useCurrency } from '@/contexts/CurrencyContext';

const SORT_OPTIONS = [
  { id: 'price-asc',    label: 'Cheapest First',    icon: TrendingUp },
  { id: 'duration-asc', label: 'Shortest Duration', icon: Clock      },
  { id: 'price-desc',   label: 'Highest Price',     icon: TrendingUp },
];

// Price range constants (USD — base currency)
const MIN_PRICE     = 25;
const MAX_PRICE     = 1000;
const DEFAULT_PRICE = 1000;

export default function SearchResults() {
  const params = useSearchParams();
  const { formatPrice } = useCurrency();

  const from     = params.get('from');
  const to       = params.get('to');
  const depart   = params.get('depart');
  const tripType = params.get('tripType') || 'oneway';

  // Filter state
  const [sortBy,           setSortBy]           = useState('price-asc');
  const [stopFilter,       setStopFilter]       = useState('all');
  const [airlineFilter,    setAirlineFilter]    = useState([]);
  const [priceRange,       setPriceRange]       = useState(DEFAULT_PRICE);
  const [mobileFilterOpen, setMobileFilterOpen] = useState(false);

  // Match flights by route — fallback to first 50 if no exact match (demo)
  const allFlights = useMemo(() => {
    const exact = DUMMY_FLIGHTS.filter(
      (f) => (!from || f.from.code === from) && (!to || f.to.code === to)
    );
    return exact.length > 0 ? exact : DUMMY_FLIGHTS.slice(0, 50);
  }, [from, to]);

  // Unique airlines from current results
  const availableAirlines = useMemo(() => {
    const map = new Map();
    allFlights.forEach((f) => map.set(f.airline.code, f.airline));
    return Array.from(map.values());
  }, [allFlights]);

  // Filter + sort pipeline
  const filteredFlights = useMemo(() => {
    let result = [...allFlights];

    if (stopFilter !== 'all') {
      const stops = parseInt(stopFilter, 10);
      result = result.filter((f) => f.stops === stops);
    }

    if (airlineFilter.length > 0) {
      result = result.filter((f) => airlineFilter.includes(f.airline.code));
    }

    result = result.filter((f) => f.price <= priceRange);

    switch (sortBy) {
      case 'price-asc':    result.sort((a, b) => a.price - b.price); break;
      case 'price-desc':   result.sort((a, b) => b.price - a.price); break;
      case 'duration-asc': result.sort((a, b) => a.durationMinutes - b.durationMinutes); break;
      default: break;
    }

    return result;
  }, [allFlights, sortBy, stopFilter, airlineFilter, priceRange]);

  const toggleAirline = (code) => {
    setAirlineFilter((prev) =>
      prev.includes(code) ? prev.filter((c) => c !== code) : [...prev, code]
    );
  };

  const clearFilters = () => {
    setStopFilter('all');
    setAirlineFilter([]);
    setPriceRange(DEFAULT_PRICE);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* ============ SEARCH SUMMARY BAR ============ */}
      <div className="bg-brand-dark text-white py-4 sm:py-6">
        <div className="container-custom flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2 text-base sm:text-lg font-bold">
              <span>{from || 'Any'}</span>
              <ArrowRight className="h-4 w-4 text-brand-orange-400" />
              <span>{to || 'Any'}</span>
            </div>
            <span className="text-xs sm:text-sm text-white/70">
              {depart && new Date(depart).toLocaleDateString('en-US', {
                weekday: 'short', day: 'numeric', month: 'short', year: 'numeric',
              })}
              {' • '}
              {tripType === 'roundtrip' ? 'Round Trip' : 'One Way'}
            </span>
          </div>
          <Link
            href="/"
            className="text-sm font-semibold text-brand-orange-400 hover:text-brand-orange-300"
          >
            Modify Search →
          </Link>
        </div>
      </div>

      <div className="container-custom py-6">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* ============ DESKTOP FILTERS SIDEBAR ============ */}
          <aside className="hidden lg:block lg:col-span-3">
            <FiltersPanel
              stopFilter={stopFilter}
              setStopFilter={setStopFilter}
              airlineFilter={airlineFilter}
              toggleAirline={toggleAirline}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              availableAirlines={availableAirlines}
              onClear={clearFilters}
              formatPrice={formatPrice}
            />
          </aside>

          {/* ============ RESULTS ============ */}
          <main className="lg:col-span-9">
            {/* Top bar — count + sort + mobile filter trigger */}
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 mb-4">
              <div className="text-sm font-semibold text-brand-dark">
                {filteredFlights.length} flights found
              </div>

              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => setMobileFilterOpen(true)}
                  className="lg:hidden inline-flex items-center gap-2 px-3 py-2 rounded-lg border-2 border-gray-200 bg-white text-sm font-semibold text-brand-dark"
                >
                  <Filter className="h-4 w-4" />
                  Filters
                </button>

                <select
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  className="px-3 py-2 rounded-lg border-2 border-gray-200 bg-white text-sm font-semibold text-brand-dark focus:border-brand-orange-500 focus:outline-none"
                  aria-label="Sort by"
                >
                  {SORT_OPTIONS.map((o) => (
                    <option key={o.id} value={o.id}>{o.label}</option>
                  ))}
                </select>
              </div>
            </div>

            {/* Flight cards */}
            {filteredFlights.length === 0 ? (
              <div className="bg-white rounded-2xl p-12 text-center shadow-sm">
                <Plane className="mx-auto h-12 w-12 text-gray-300" />
                <h3 className="mt-4 text-lg font-bold text-brand-dark">
                  No flights match your filters
                </h3>
                <p className="mt-2 text-sm text-gray-600">
                  Try clearing filters or modifying your search
                </p>
                <button
                  onClick={clearFilters}
                  className="mt-4 px-6 py-2 rounded-lg bg-brand-orange-500 text-white font-semibold hover:bg-brand-orange-600"
                >
                  Clear Filters
                </button>
              </div>
            ) : (
              <ul className="space-y-3">
                {filteredFlights.slice(0, 50).map((flight) => (
                  <FlightCard
                    key={flight.id}
                    flight={flight}
                    formatPrice={formatPrice}
                  />
                ))}
              </ul>
            )}
          </main>
        </div>
      </div>

      {/* ============ MOBILE FILTER DRAWER ============ */}
      {mobileFilterOpen && (
        <div className="fixed inset-0 z-50 lg:hidden">
          <div
            className="absolute inset-0 bg-black/50"
            onClick={() => setMobileFilterOpen(false)}
          />
          <div className="absolute bottom-0 left-0 right-0 bg-white rounded-t-2xl max-h-[85vh] overflow-y-auto">
            <div className="sticky top-0 bg-white border-b border-gray-200 px-4 py-3 flex items-center justify-between">
              <h3 className="font-bold text-brand-dark">Filters</h3>
              <button
                onClick={() => setMobileFilterOpen(false)}
                aria-label="Close filters"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
            <div className="p-4">
              <FiltersPanel
                stopFilter={stopFilter}
                setStopFilter={setStopFilter}
                airlineFilter={airlineFilter}
                toggleAirline={toggleAirline}
                priceRange={priceRange}
                setPriceRange={setPriceRange}
                availableAirlines={availableAirlines}
                onClear={clearFilters}
                formatPrice={formatPrice}
              />
              <button
                onClick={() => setMobileFilterOpen(false)}
                className="mt-4 w-full py-3 rounded-lg bg-brand-orange-500 text-white font-bold"
              >
                Show {filteredFlights.length} Flights
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

/* ==========================================================
   FILTERS PANEL — used in both sidebar (desktop) + drawer (mobile)
   ========================================================== */
function FiltersPanel({
  stopFilter,    setStopFilter,
  airlineFilter, toggleAirline,
  priceRange,    setPriceRange,
  availableAirlines, onClear, formatPrice,
}) {
  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h3 className="font-bold text-brand-dark flex items-center gap-2">
          <SlidersHorizontal className="h-4 w-4" />
          Filters
        </h3>
        <button
          onClick={onClear}
          className="text-xs font-semibold text-brand-orange-500 hover:underline"
        >
          Clear all
        </button>
      </div>

      {/* Stops filter */}
      <div>
        <h4 className="text-sm font-bold text-brand-dark mb-3">Stops</h4>
        <div className="space-y-2">
          {[
            { id: 'all', label: 'All Flights' },
            { id: '0',   label: 'Non-stop'    },
            { id: '1',   label: '1 Stop'      },
            { id: '2',   label: '2+ Stops'    },
          ].map((opt) => (
            <label key={opt.id} className="flex items-center gap-2 cursor-pointer">
              <input
                type="radio"
                name="stops"
                value={opt.id}
                checked={stopFilter === opt.id}
                onChange={(e) => setStopFilter(e.target.value)}
                className="accent-brand-orange-500"
              />
              <span className="text-sm text-gray-700">{opt.label}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Price filter — dynamic currency */}
      <div>
        <h4 className="text-sm font-bold text-brand-dark mb-3">
          Max Price: {formatPrice(priceRange)}
        </h4>
        <input
          type="range"
          min={MIN_PRICE}
          max={MAX_PRICE}
          step={10}
          value={priceRange}
          onChange={(e) => setPriceRange(Number(e.target.value))}
          className="w-full accent-brand-orange-500"
        />
        <div className="flex justify-between text-xs text-gray-500 mt-1">
          <span>{formatPrice(MIN_PRICE)}</span>
          <span>{formatPrice(MAX_PRICE)}</span>
        </div>
      </div>

      {/* Airlines filter */}
      <div>
        <h4 className="text-sm font-bold text-brand-dark mb-3">Airlines</h4>
        <div className="space-y-2 max-h-64 overflow-y-auto pr-1">
          {availableAirlines.map((a) => (
            <label key={a.code} className="flex items-center gap-2 cursor-pointer">
              <input
                type="checkbox"
                checked={airlineFilter.includes(a.code)}
                onChange={() => toggleAirline(a.code)}
                className="accent-brand-orange-500"
              />
              <span className="text-sm text-gray-700 flex-1">{a.name}</span>
              <span
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: a.color }}
              />
            </label>
          ))}
        </div>
      </div>
    </div>
  );
}

/* ==========================================================
   FLIGHT CARD
   ========================================================== */
function FlightCard({ flight, formatPrice }) {
  const lowSeats = flight.seatsLeft <= 5;

  return (
    <li className="bg-white rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden">
      <div className="p-4 sm:p-5 grid grid-cols-1 md:grid-cols-12 gap-4 items-center">

        {/* Airline */}
        <div className="md:col-span-3 flex items-center gap-3">
          <div
            className="w-12 h-12 rounded-lg flex items-center justify-center text-white font-bold text-sm flex-shrink-0"
            style={{ backgroundColor: flight.airline.color }}
          >
            {flight.airline.code}
          </div>
          <div className="min-w-0">
            <div className="text-sm font-bold text-brand-dark truncate">
              {flight.airline.name}
            </div>
            <div className="text-xs text-gray-500">{flight.flightNumber}</div>
          </div>
        </div>

        {/* Times + Duration */}
        <div className="md:col-span-6 grid grid-cols-3 gap-2 items-center">
          <div className="text-center md:text-left">
            <div className="text-xl sm:text-2xl font-bold text-brand-dark">
              {flight.departureTime}
            </div>
            <div className="text-xs text-gray-500">{flight.from.code}</div>
          </div>

          <div className="text-center">
            <div className="text-xs font-semibold text-gray-500">
              {flight.duration}
            </div>
            <div className="relative my-1">
              <div className="h-px bg-gray-300" />
              <Plane className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-3 w-3 text-brand-orange-500 bg-white" />
            </div>
            <div className="text-xs text-gray-500">
              {flight.stops === 0
                ? 'Non-stop'
                : `${flight.stops} stop${flight.stops > 1 ? 's' : ''}`}
            </div>
          </div>

          <div className="text-center md:text-right">
            <div className="text-xl sm:text-2xl font-bold text-brand-dark">
              {flight.arrivalTime}
            </div>
            <div className="text-xs text-gray-500">{flight.to.code}</div>
          </div>
        </div>

        {/* Price + CTA — dynamic currency */}
        <div className="md:col-span-3 flex items-center justify-between md:flex-col md:items-end gap-2">
          <div className="text-right">
            <div className="text-xl sm:text-2xl font-bold text-brand-orange-500">
              {formatPrice(flight.price)}
            </div>
            {lowSeats && (
              <div className="text-xs font-semibold text-red-600">
                Only {flight.seatsLeft} seats left!
              </div>
            )}
          </div>
          <button
            type="button"
            className="px-5 py-2 rounded-lg bg-brand-orange-500 text-white text-sm font-bold hover:bg-brand-orange-600 active:scale-95 transition-all whitespace-nowrap"
          >
            Book Now
          </button>
        </div>
      </div>

      {/* Footer info */}
      <div className="px-4 sm:px-5 py-2 bg-gray-50 flex items-center gap-4 text-xs text-gray-600 flex-wrap">
        <span className="flex items-center gap-1">
          <Briefcase className="h-3 w-3" />
          {flight.baggage.checkin} check-in
        </span>
        <span className="flex items-center gap-1">
          <Check className="h-3 w-3" />
          {flight.class}
        </span>
        {flight.refundable && (
          <span className="text-green-600 font-semibold">Refundable</span>
        )}
      </div>
    </li>
  );
}