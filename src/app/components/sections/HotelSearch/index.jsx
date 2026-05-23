'use client';

import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Building2, MapPin, Calendar, Users, Search } from 'lucide-react';

const todayISO     = () => new Date().toISOString().split('T')[0];
const tomorrowISO  = () => {
  const d = new Date(); d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

const POPULAR_CITIES = [
  'Dubai', 'Singapore', 'London', 'New York', 'Paris', 'Tokyo', 'Mumbai',
];

export default function HotelSearch() {
  const router = useRouter();
  const [city,      setCity]      = useState('');
  const [checkIn,   setCheckIn]   = useState(todayISO());
  const [checkOut,  setCheckOut]  = useState(tomorrowISO());
  const [rooms,     setRooms]     = useState(1);
  const [guests,    setGuests]    = useState(2);
  const [error,     setError]     = useState('');
  const [showSugg,  setShowSugg]  = useState(false);

  const suggestions = POPULAR_CITIES.filter((c) =>
    c.toLowerCase().includes(city.toLowerCase()) && city.length > 0
  );

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');
    if (!city.trim()) return setError('Please enter a city or hotel name');
    const params = new URLSearchParams({ city, checkIn, checkOut, rooms, guests });
    router.push(`/hotels/search?${params.toString()}`);
  };

  return (
    <section className="relative -mt-20 sm:-mt-24 lg:-mt-32 z-20 pb-12 sm:pb-16" aria-label="Hotel search">
      <div className="container-custom">
        <form onSubmit={handleSearch} className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8">
          {/* Header */}
          <div className="flex items-center gap-2 mb-5">
            <Building2 className="h-5 w-5 text-brand-orange-500" />
            <h2 className="text-lg font-bold text-brand-dark">Find Your Perfect Hotel</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3">

            {/* City input */}
            <div className="lg:col-span-4 relative">
              <label className="block p-3 sm:p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-brand-orange-300 focus-within:border-brand-orange-500 transition-all cursor-text">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
                  City or Hotel Name
                </span>
                <div className="mt-1 flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-brand-orange-500 flex-shrink-0" />
                  <input
                    type="text"
                    value={city}
                    onChange={(e) => { setCity(e.target.value); setShowSugg(true); }}
                    onFocus={() => setShowSugg(true)}
                    onBlur={() => setTimeout(() => setShowSugg(false), 150)}
                    placeholder="Dubai, London, New York..."
                    className="flex-1 bg-transparent text-base text-brand-dark placeholder-gray-400 focus:outline-none font-medium"
                  />
                </div>
              </label>

              {/* Suggestions dropdown */}
              {showSugg && (suggestions.length > 0 || city.length === 0) && (
                <div className="absolute top-full left-0 right-0 mt-1 bg-white rounded-xl shadow-xl border border-gray-200 z-50 overflow-hidden">
                  {(city.length === 0 ? POPULAR_CITIES : suggestions).map((c) => (
                    <button
                      key={c}
                      type="button"
                      onMouseDown={() => { setCity(c); setShowSugg(false); }}
                      className="w-full flex items-center gap-3 px-4 py-3 hover:bg-brand-orange-50 text-left"
                    >
                      <MapPin className="h-4 w-4 text-gray-400" />
                      <span className="text-sm font-semibold text-brand-dark">{c}</span>
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Check-in */}
            <div className="lg:col-span-2 relative">
              <label className="block p-3 sm:p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-brand-orange-300 focus-within:border-brand-orange-500 transition-all cursor-pointer">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Check-in</span>
                <div className="mt-1 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-brand-orange-500 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-base font-bold text-brand-dark">
                      {checkIn ? new Date(checkIn).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) : 'Select'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {checkIn ? new Date(checkIn).toLocaleDateString('en-US', { weekday: 'long' }) : ''}
                    </div>
                  </div>
                </div>
                <input type="date" value={checkIn} min={todayISO()}
                  onChange={(e) => setCheckIn(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer" />
              </label>
            </div>

            {/* Check-out */}
            <div className="lg:col-span-2 relative">
              <label className="block p-3 sm:p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-brand-orange-300 focus-within:border-brand-orange-500 transition-all cursor-pointer">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Check-out</span>
                <div className="mt-1 flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-brand-orange-500 flex-shrink-0" />
                  <div className="flex-1">
                    <div className="text-base font-bold text-brand-dark">
                      {checkOut ? new Date(checkOut).toLocaleDateString('en-US', { day: '2-digit', month: 'short' }) : 'Select'}
                    </div>
                    <div className="text-xs text-gray-500">
                      {checkOut ? new Date(checkOut).toLocaleDateString('en-US', { weekday: 'long' }) : ''}
                    </div>
                  </div>
                </div>
                <input type="date" value={checkOut} min={checkIn || todayISO()}
                  onChange={(e) => setCheckOut(e.target.value)}
                  className="absolute inset-0 opacity-0 cursor-pointer" />
              </label>
            </div>

            {/* Rooms + Guests */}
            <div className="lg:col-span-4">
              <div className="p-3 sm:p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-brand-orange-300 transition-all">
                <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Rooms & Guests</span>
                <div className="mt-2 flex items-center gap-4">
                  {/* Rooms */}
                  <div className="flex items-center gap-2">
                    <Building2 className="h-4 w-4 text-brand-orange-500" />
                    <span className="text-xs text-gray-500">Rooms</span>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => setRooms(Math.max(1, rooms - 1))}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm font-bold hover:border-brand-orange-500 hover:text-brand-orange-500">
                        −
                      </button>
                      <span className="w-6 text-center font-bold text-sm">{rooms}</span>
                      <button type="button" onClick={() => setRooms(Math.min(10, rooms + 1))}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm font-bold hover:border-brand-orange-500 hover:text-brand-orange-500">
                        +
                      </button>
                    </div>
                  </div>
                  <div className="w-px h-8 bg-gray-200" />
                  {/* Guests */}
                  <div className="flex items-center gap-2">
                    <Users className="h-4 w-4 text-brand-orange-500" />
                    <span className="text-xs text-gray-500">Guests</span>
                    <div className="flex items-center gap-1">
                      <button type="button" onClick={() => setGuests(Math.max(1, guests - 1))}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm font-bold hover:border-brand-orange-500 hover:text-brand-orange-500">
                        −
                      </button>
                      <span className="w-6 text-center font-bold text-sm">{guests}</span>
                      <button type="button" onClick={() => setGuests(Math.min(20, guests + 1))}
                        className="w-6 h-6 rounded-full border border-gray-300 flex items-center justify-center text-sm font-bold hover:border-brand-orange-500 hover:text-brand-orange-500">
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {error && (
            <div className="mt-3 px-4 py-2 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          <div className="mt-5 flex justify-center">
            <button type="submit"
              className="inline-flex items-center gap-2 px-12 py-4 rounded-full bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 text-white font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all">
              <Search className="h-5 w-5" />
              Search Hotels
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}