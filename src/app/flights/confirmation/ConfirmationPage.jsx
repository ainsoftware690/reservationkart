'use client';

import { useSearchParams } from 'next/navigation';
import { useEffect, useState } from 'react';
import Link from 'next/link';
import {
  CheckCircle, Plane, Download, Mail,
  Home, Briefcase, Clock, Phone, Share2,
} from 'lucide-react';
import { getBooking } from '../../../lib/booking-utils';
import { useCurrency } from '../../../contexts/CurrencyContext';
import { SITE_CONFIG } from '../../../lib/constants';

export default function ConfirmationPage() {
  const params              = useSearchParams();
  const pnr                 = params.get('pnr');
  const { formatPrice }     = useCurrency();
  const [booking, setBooking] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (pnr) setBooking(getBooking(pnr));
    setLoading(false);
  }, [pnr]);

  if (loading) return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-brand-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );

  if (!booking) return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
      <div className="text-center max-w-md">
        <div className="w-20 h-20 mx-auto rounded-full bg-red-100 flex items-center justify-center">
          <Plane className="h-10 w-10 text-red-500" />
        </div>
        <h1 className="mt-4 text-2xl font-bold text-brand-dark">Booking not found</h1>
        <p className="mt-2 text-gray-600">
          This booking may have expired. Please contact our support team.
        </p>
        <div className="mt-6 flex flex-col sm:flex-row gap-3 justify-center">
          <Link href="/" className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-orange-500 text-white font-bold hover:bg-brand-orange-600">
            <Home className="h-4 w-4" /> Back to Home
          </Link>
          <a href={`tel:${SITE_CONFIG.phone}`} className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-brand-dark font-bold hover:border-brand-orange-500">
            <Phone className="h-4 w-4" /> Call Support
          </a>
        </div>
      </div>
    </div>
  );

  const { flight, passengers, contact, fare } = booking;

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 via-white to-gray-50 py-8 sm:py-12">
      <div className="container-custom max-w-4xl">

        {/* Success Header */}
        <div className="text-center mb-8">
          <div className="relative inline-flex">
            <div className="absolute inset-0 bg-green-500 rounded-full blur-2xl opacity-25 animate-pulse" />
            <div className="relative w-20 h-20 sm:w-24 sm:h-24 rounded-full bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center shadow-2xl shadow-green-500/40">
              <CheckCircle className="h-10 w-10 sm:h-12 sm:w-12 text-white" />
            </div>
          </div>
          <h1 className="mt-6 text-3xl sm:text-4xl font-bold text-brand-dark">
            🎉 Booking Confirmed!
          </h1>
          <p className="mt-2 text-gray-600 text-sm sm:text-base">
            Your e-ticket has been sent to <strong>{contact.email}</strong>
          </p>
        </div>

        {/* PNR Card */}
        <div className="relative bg-gradient-to-br from-brand-dark to-brand-dark-900 rounded-3xl p-6 sm:p-8 text-white shadow-2xl mb-6 overflow-hidden">
          <div className="absolute -top-10 -right-10 w-40 h-40 bg-brand-orange-500/20 rounded-full blur-3xl" />
          <div className="absolute -bottom-10 -left-10 w-40 h-40 bg-blue-500/20 rounded-full blur-3xl" />

          <div className="relative">
            <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
              <div>
                <div className="text-xs font-bold uppercase tracking-widest text-white/60">
                  Booking Reference (PNR)
                </div>
                <div className="mt-1 text-4xl sm:text-5xl font-bold tracking-widest text-brand-orange-400 font-mono">
                  {booking.pnr}
                </div>
                <div className="mt-2 text-sm text-white/60">
                  Booking ID: {booking.bookingId}
                </div>
              </div>
              <div className="flex gap-2 flex-wrap">
                <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-colors">
                  <Download className="h-4 w-4" /> E-Ticket
                </button>
                <button className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white/10 hover:bg-white/20 text-white text-sm font-bold transition-colors">
                  <Share2 className="h-4 w-4" /> Share
                </button>
              </div>
            </div>

            {/* Dashed divider — ticket style */}
            <div className="my-5 flex items-center gap-2">
              <div className="flex-1 border-t border-dashed border-white/20" />
              <Plane className="h-4 w-4 text-white/40" />
              <div className="flex-1 border-t border-dashed border-white/20" />
            </div>

            <div className="grid grid-cols-3 gap-4">
              <div>
                <div className="text-xs text-white/50 uppercase tracking-wide">From</div>
                <div className="text-lg sm:text-2xl font-bold">{flight.from.code}</div>
                <div className="text-xs text-white/70">{flight.from.city}</div>
              </div>
              <div className="text-center">
                <div className="text-xs text-white/50 uppercase tracking-wide">Duration</div>
                <div className="text-sm sm:text-base font-bold mt-1">{flight.duration}</div>
                <div className="text-xs text-white/70">
                  {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop`}
                </div>
              </div>
              <div className="text-right">
                <div className="text-xs text-white/50 uppercase tracking-wide">To</div>
                <div className="text-lg sm:text-2xl font-bold">{flight.to.code}</div>
                <div className="text-xs text-white/70">{flight.to.city}</div>
              </div>
            </div>
          </div>
        </div>

        {/* Flight Details */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 mb-4">
          <h2 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
            <Plane className="h-5 w-5 text-brand-orange-500" />
            Flight Details
          </h2>
          <div className="flex items-center gap-3 mb-4 pb-4 border-b border-gray-100">
            <div
              className="w-12 h-12 rounded-xl flex items-center justify-center text-white font-bold flex-shrink-0"
              style={{ backgroundColor: flight.airline.color }}
            >
              {flight.airline.code}
            </div>
            <div>
              <div className="font-bold text-brand-dark">{flight.airline.name}</div>
              <div className="text-sm text-gray-500">{flight.flightNumber} • {flight.class}</div>
            </div>
          </div>
          <div className="grid grid-cols-3 gap-3 items-center">
            <div>
              <div className="text-2xl font-bold text-brand-dark">{flight.departureTime}</div>
              <div className="text-sm font-semibold text-gray-700 mt-1">{flight.from.code}</div>
              <div className="text-xs text-gray-500">{flight.from.city}</div>
            </div>
            <div className="text-center">
              <div className="text-xs text-gray-500 flex items-center justify-center gap-1">
                <Clock className="h-3 w-3" />{flight.duration}
              </div>
              <div className="relative my-2">
                <div className="h-px bg-gray-200" />
                <Plane className="absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 h-4 w-4 text-brand-orange-500 bg-white" />
              </div>
              <div className="text-xs text-gray-500">
                {flight.stops === 0 ? 'Non-stop' : `${flight.stops} stop`}
              </div>
            </div>
            <div className="text-right">
              <div className="text-2xl font-bold text-brand-dark">{flight.arrivalTime}</div>
              <div className="text-sm font-semibold text-gray-700 mt-1">{flight.to.code}</div>
              <div className="text-xs text-gray-500">{flight.to.city}</div>
            </div>
          </div>
          <div className="mt-4 pt-4 border-t border-gray-100 flex items-center gap-3 text-xs text-gray-600">
            <Briefcase className="h-3 w-3" />
            {flight.baggage.checkin} check-in + {flight.baggage.cabin} cabin
            {flight.refundable && <span className="text-green-600 font-semibold ml-2">• Refundable</span>}
          </div>
        </div>

        {/* Passengers */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 mb-4">
          <h2 className="font-bold text-brand-dark mb-4">
            Passengers ({passengers.length})
          </h2>
          <ul className="space-y-3">
            {passengers.map((p, i) => (
              <li key={i} className="flex items-center justify-between py-2 border-b border-gray-100 last:border-0">
                <div>
                  <div className="font-semibold text-brand-dark">
                    {p.title}. {p.firstName} {p.lastName}
                  </div>
                  <div className="text-xs text-gray-500">
                    {p.type} • {p.nationality} • DOB: {p.dob}
                  </div>
                </div>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-green-100 text-green-700">
                  ✓ Confirmed
                </span>
              </li>
            ))}
          </ul>
        </div>

        {/* Fare Summary */}
        <div className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100 mb-4">
          <h2 className="font-bold text-brand-dark mb-4">Payment Summary</h2>
          <div className="space-y-2">
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Base Fare</span>
              <span className="font-semibold">{formatPrice(fare.baseFare)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Taxes & Fees</span>
              <span className="font-semibold">{formatPrice(fare.taxes)}</span>
            </div>
            <div className="flex justify-between text-sm">
              <span className="text-gray-600">Service Fee</span>
              <span className="font-semibold">{formatPrice(fare.serviceFee)}</span>
            </div>
            {fare.insurance > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Travel Insurance</span>
                <span className="font-semibold">{formatPrice(fare.insurance)}</span>
              </div>
            )}
            {fare.seatFee > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">Seat Selection</span>
                <span className="font-semibold">{formatPrice(fare.seatFee)}</span>
              </div>
            )}
            {fare.mealFee > 0 && (
              <div className="flex justify-between text-sm">
                <span className="text-gray-600">In-flight Meals</span>
                <span className="font-semibold">{formatPrice(fare.mealFee)}</span>
              </div>
            )}
          </div>
          <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-200 flex justify-between items-center">
            <span className="text-lg font-bold text-brand-dark">Total Paid</span>
            <span className="text-2xl font-bold text-green-600">{formatPrice(fare.total)}</span>
          </div>
        </div>

        {/* Contact */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-6">
          <div className="flex items-start gap-3">
            <Mail className="h-5 w-5 text-blue-600 flex-shrink-0 mt-0.5" />
            <div>
              <div className="font-bold text-blue-800">Confirmation sent!</div>
              <div className="text-sm text-blue-700 mt-1">
                E-ticket and itinerary sent to <strong>{contact.email}</strong> and <strong>{contact.phone}</strong>
              </div>
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border-2 border-gray-200 text-brand-dark font-bold hover:border-brand-orange-400 transition-colors"
          >
            <Home className="h-4 w-4" /> Home
          </Link>
          <Link
            href="/"
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-brand-orange-500 text-white font-bold shadow-lg hover:bg-brand-orange-600 transition-colors"
          >
            <Plane className="h-4 w-4" /> Book Another
          </Link>
          
           <a href={`tel:${SITE_CONFIG.phone}`}
            className="inline-flex items-center justify-center gap-2 px-5 py-3 rounded-xl bg-white border-2 border-gray-200 text-brand-dark font-bold hover:border-brand-orange-400 transition-colors"
          >
            <Phone className="h-4 w-4" /> Get Help
          </a>
        </div>
      </div>
    </div>
  );
}