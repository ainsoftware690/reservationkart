'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import { CheckCircle, Plane, Download, Mail, Home, Briefcase, Clock } from 'lucide-react';

import { getBooking } from '../../../lib/booking-utils';
import { useCurrency } from '../../../contexts/CurrencyContext';

export default function ConfirmationPage() {
  const params = useSearchParams();
  const pnr    = params.get('pnr');
  const { formatPrice } = useCurrency();

  const [booking, setBooking]     = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    if (pnr) setBooking(getBooking(pnr));
    setIsLoading(false);
  }, [pnr]);

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  if (!booking) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-brand-dark">Booking not found</h1>
          <p className="mt-2 text-gray-600">This booking may have expired. Please contact support.</p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-orange-500 text-white font-bold"
          >
            <Home className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const { flight, passengers, contact, fare } = booking;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-50 py-8 sm:py-12">
      <div className="container-custom max-w-4xl">

        {/* Success Animation */}
        <div className="text-center mb-8">
          <div className="relative inline-flex items-center justify-center">
            <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-30 animate-pulse" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl shadow-green-500/40">
              <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
            </div>
          </div>
          <h1 className="mt-6 text-3xl sm:text-4xl font-bold text-brand-dark">
            Booking Confirmed!
          </h1>
          <p className="mt-2 text-gray-600">
            Your e-ticket has been sent to <strong>{contact.email}</strong>
          </p>
        </div>

        {/* PNR Card — visually prominent */}
        <div className="bg-gradient-to-br from-brand-dark to-brand-dark-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl mb-6 relative overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />

          <div className="relative flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <div className="text-xs font-bold uppercase tracking-widest text-white/60">
                Booking Reference (PNR)
              </div>
              <div className="mt-1 text-3xl sm:text-5xl font-bold tracking-wider text-brand-orange-400 font-mono">
                {booking.pnr}
              </div>
              <div className="mt-2 text-sm text-white/70">
                Booking ID: {booking.bookingId}
              </div>
            </div>
            <div className="flex gap-2">
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-sm font-bold transition-colors">
                <Download className="h-4 w-4" />
                E-Ticket
              </button>
              <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white text-sm font-bold transition-colors">
                <Mail className="h-4 w-4" />
                Email
              </button>
            </div>
          </div>
        </div>

        {/* Flight Details */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100 mb-6">
          <h2 className="font-bold text-brand-dark mb-5 flex items-center gap-2">
            <Plane className="h-5 w-5 text-brand-orange-500" />
            Flight Details
          </h2>

          <div className="flex items-center gap-3 mb-5 pb-5 border-b border-gray-100">
            <div
              className="w-14 h-14 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0"
              style={{ backgroundColor: flight.airline.color }}
            >
              {flight.airline.code}
            </div>
            <div>
              <div className="font-bold text-brand-dark">{flight.airline.name}</div>
              <div className="text-sm text-gray-500">
                {flight.flightNumber} • {flight.class}
              </div>
            </div>
          </div>

          <div className="grid grid-cols-3 gap-3 items-center">
            <div>
              <div className="text-2xl sm:text-3xl font-bold text-brand-dark">{flight.departureTime}</div>
              <div className="mt-1 text-sm font-semibold text-gray-700">{flight.from.code}</div>
              <div className="text-xs text-gray-500">{flight.from.city}</div>
            </div>
            <div className="text-center">
              <div className="text-xs font-semibold text-gray-500 flex items-center justify-center gap-1">
                <Clock className="h-3 w-3" />
                {flight.duration}
              </div>
              <div className="relative my-2">
                <div className="h-px bg-gray-300" />
                <Plane className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-brand-orange-500 bg-white" />
              </div>
              <div className="text-xs text-gray-500">
                {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop`}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl sm:text-3xl font-bold text-brand-dark">{flight.arrivalTime}</div>
              <div className="mt-1 text-sm font-semibold text-gray-700">{flight.to.code}</div>
              <div className="text-xs text-gray-500">{flight.to.city}</div>
            </div>
          </div>

          <div className="mt-5 pt-5 border-t border-gray-100 flex items-center gap-3 text-xs text-gray-600">
            <Briefcase className="h-3 w-3" />
            {flight.baggage.checkin} check-in + {flight.baggage.cabin} cabin
          </div>
        </div>

        {/* Passengers */}
        <div className="bg-white rounded-2xl shadow-sm p-6 sm:p-8 border border-gray-100 mb-6">
          <h2 className="font-bold text-brand-dark mb-4">Passengers</h2>
          <ul className="space-y-3">
            {passengers.map((p, i) => (
              <li key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <div className="font-semibold text-brand-dark">
                    {p.title}. {p.firstName} {p.lastName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {p.type} • {p.nationality}
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-700">
                  Confirmed
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Total Paid */}
        <div className="bg-gradient-to-br from-green-500 to-green-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl mb-6">
          <div className="flex items-center justify-between">
            <div>
              <div className="text-sm font-bold uppercase tracking-wider opacity-90">
                Total Paid
              </div>
              <div className="mt-1 text-3xl sm:text-4xl font-bold">
                {formatPrice(fare.total)}
              </div>
            </div>
            <CheckCircle className="h-12 w-12 opacity-80" />
          </div>
        </div>

        {/* Actions */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-gray-200 text-brand-dark font-bold hover:border-gray-300"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
          <Link
            href="/"
            className="flex-1 inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 text-white font-bold shadow-lg hover:shadow-xl"
          >
            <Plane className="h-5 w-5" />
            Book Another Flight
          </Link>
        </div>
      </div>
    </div>
  );
}