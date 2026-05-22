'use client';
import { useState, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import { Search } from 'lucide-react';

import TripTypeTabs      from './TripTypeTabs';
import AirportInput      from './AirportInput';
import SwapButton        from './SwapButton';
import DatePicker        from './DatePicker';
import PassengerSelector from './PassengerSelector';

const todayISO = () => new Date().toISOString().split('T')[0];
const tomorrowISO = () => {
  const d = new Date();
  d.setDate(d.getDate() + 1);
  return d.toISOString().split('T')[0];
};

export default function FlightSearch() {
  const router = useRouter();

  const [tripType,    setTripType]    = useState('oneway');
  const [from,        setFrom]        = useState(null);
  const [to,          setTo]          = useState(null);
  const [departDate,  setDepartDate]  = useState(todayISO());
  const [returnDate,  setReturnDate]  = useState(tomorrowISO());
  const [passengers,  setPassengers]  = useState({
    adults: 1, children: 0, infants: 0, class: 'Economy',
  });
  const [error, setError] = useState('');

  const handleSwap = useCallback(() => {
    setFrom(to);
    setTo(from);
  }, [from, to]);

  const handleSearch = (e) => {
    e.preventDefault();
    setError('');

    if (!from) return setError('Please select departure city');
    if (!to)   return setError('Please select destination city');
    if (from.code === to.code) return setError('Departure and destination cannot be same');
    if (!departDate) return setError('Please select departure date');
    if (tripType === 'roundtrip' && !returnDate) return setError('Please select return date');

    const params = new URLSearchParams({
      tripType,
      from:     from.code,
      to:       to.code,
      depart:   departDate,
      ...(tripType === 'roundtrip' && { return: returnDate }),
      adults:   passengers.adults,
      children: passengers.children,
      infants:  passengers.infants,
      class:    passengers.class,
    });

    router.push(`/flights/search?${params.toString()}`);
  };

  return (
    <section
      className="relative -mt-20 sm:-mt-24 lg:-mt-32 z-20 pb-12 sm:pb-16"
      aria-label="Flight search"
    >
      <div className="container-custom">
        <form
          onSubmit={handleSearch}
          className="bg-white rounded-2xl shadow-2xl p-4 sm:p-6 lg:p-8"
        >
          <TripTypeTabs value={tripType} onChange={setTripType} />

          <div className="mt-5 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 lg:gap-2 items-stretch">

            {/* From + Swap + To */}
            <div className="lg:col-span-5 relative flex flex-col md:flex-row items-stretch gap-3 md:gap-0">
              <div className="flex-1 md:pr-6">
                <AirportInput
                  label="From"
                  value={from}
                  onChange={setFrom}
                  placeholder="Departure city"
                  excludeCode={to?.code}
                />
              </div>

              <div className="hidden md:flex absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2">
                <SwapButton onSwap={handleSwap} />
              </div>
              <div className="md:hidden flex justify-center">
                <SwapButton onSwap={handleSwap} />
              </div>

              <div className="flex-1 md:pl-6">
                <AirportInput
                  label="To"
                  value={to}
                  onChange={setTo}
                  placeholder="Destination city"
                  excludeCode={from?.code}
                />
              </div>
            </div>

            {/* Departure */}
            <div className="lg:col-span-2">
              <DatePicker
                label="Departure"
                value={departDate}
                onChange={setDepartDate}
              />
            </div>

            {/* Return — conditional */}
            <div className={`lg:col-span-2 ${tripType !== 'roundtrip' ? 'opacity-60' : ''}`}>
              {tripType === 'roundtrip' ? (
                <DatePicker
                  label="Return"
                  value={returnDate}
                  onChange={setReturnDate}
                  minDate={departDate}
                />
              ) : (
                <button
                  type="button"
                  onClick={() => setTripType('roundtrip')}
                  className="w-full h-full p-3 sm:p-4 rounded-xl border-2 border-dashed border-gray-200 bg-gray-50 hover:border-brand-orange-300 hover:bg-brand-orange-50 transition-all text-left"
                >
                  <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">Return</span>
                  <div className="mt-1 text-sm text-gray-400">+ Add return date</div>
                </button>
              )}
            </div>

            {/* Passengers */}
            <div className="lg:col-span-3">
              <PassengerSelector value={passengers} onChange={setPassengers} />
            </div>
          </div>

          {error && (
            <div role="alert" className="mt-4 px-4 py-3 rounded-lg bg-red-50 border border-red-200 text-sm text-red-700">
              {error}
            </div>
          )}

          {tripType === 'multicity' && (
            <div className="mt-4 px-4 py-3 rounded-lg bg-blue-50 border border-blue-200 text-sm text-blue-700">
              Multi-city booking coming soon. Please call us for assistance.
            </div>
          )}

          <div className="mt-6 flex justify-center">
            <button
              type="submit"
              className="group inline-flex items-center justify-center gap-2 px-12 py-4 rounded-full bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 text-white font-bold text-base sm:text-lg shadow-xl hover:shadow-2xl hover:scale-105 active:scale-95 transition-all"
            >
              <Search className="h-5 w-5" />
              Search Flights
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}