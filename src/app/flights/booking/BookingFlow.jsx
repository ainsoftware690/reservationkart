'use client';

import { useSearchParams, useRouter } from 'next/navigation';
import { useState, useMemo, useEffect } from 'react';
import Link from 'next/link';
import { ArrowLeft, Phone } from 'lucide-react';

import BookingStepper     from '../../components/booking/BookingStepper';
import FlightSummaryCard  from '../../components/booking/FlightSummaryCard';
import FareSummary        from '../../components/booking/FareSummary';
import PassengerForm      from '../../components/booking/PassengerForm';
import ContactAddons      from '../../components/booking/ContactAddons';
import ReviewPayment      from '../../components/booking/ReviewPayment';

import { DUMMY_FLIGHTS }  from '../../../lib/flights-mock';
import { SITE_CONFIG }    from '../../../lib/constants';
import { calculateFare, generatePNR, generateBookingId, saveBooking } from '@/lib/booking-utils';

export default function BookingFlow() {
  const params     = useSearchParams();
  const router     = useRouter();
  const flightId   = params.get('id');

  // Passenger count from URL (or default to 1 adult)
  const passengerCount = useMemo(() => ({
    adults:   Number(params.get('adults'))   || 1,
    children: Number(params.get('children')) || 0,
    infants:  Number(params.get('infants'))  || 0,
  }), [params]);

  const flight = useMemo(
    () => DUMMY_FLIGHTS.find((f) => f.id === flightId),
    [flightId]
  );

  const [step, setStep]               = useState(1);
  const [passengers, setPassengers]   = useState([]);
  const [contact, setContact]         = useState(null);
  const [addons, setAddons]           = useState({});
  const [isProcessing, setIsProcessing] = useState(false);

  // Calculate fare in real-time
  const fare = useMemo(() => {
    if (!flight) return null;
    return calculateFare(flight.price, passengerCount, addons);
  }, [flight, passengerCount, addons]);

  // Smooth scroll to top on step change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, [step]);

  if (!flight) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="text-center max-w-md">
          <h1 className="text-2xl font-bold text-brand-dark">Flight not found</h1>
          <p className="mt-2 text-gray-600">This flight may no longer be available. Please search again.</p>
          <Link
            href="/"
            className="mt-6 inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-orange-500 text-white font-bold hover:bg-brand-orange-600"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    );
  }

  const handlePassengerSubmit = (data) => {
    setPassengers(data);
    setStep(2);
  };

  const handleContactSubmit = (data) => {
    setContact({ email: data.email, phone: data.phone });
    setAddons(data.addons);
    setStep(3);
  };

  const handlePayment = () => {
    setIsProcessing(true);

    // Simulate payment processing
    setTimeout(() => {
      const pnr       = generatePNR();
      const bookingId = generateBookingId();

      const booking = {
        pnr,
        bookingId,
        flight,
        passengers,
        contact,
        addons,
        fare,
        bookedAt: new Date().toISOString(),
        status:   'CONFIRMED',
      };

      saveBooking(booking);
      router.push(`/flights/confirmation?pnr=${pnr}`);
    }, 1800);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Top bar */}
      <div className="bg-white border-b border-gray-200">
        <div className="container-custom py-3 flex items-center justify-between">
          <Link
            href="/flights/search"
            className="inline-flex items-center gap-2 text-sm font-semibold text-gray-600 hover:text-brand-orange-500"
          >
            <ArrowLeft className="h-4 w-4" />
            Modify Search
          </Link>
          
            <a href={`tel:${SITE_CONFIG.phone}`}
            className="inline-flex items-center gap-2 text-sm font-semibold text-brand-orange-500"
          >
            <Phone className="h-4 w-4" />
            <span className="hidden sm:inline">Need help? </span>{SITE_CONFIG.phone}
          </a>
        </div>
      </div>

      <BookingStepper currentStep={step} />

      <div className="container-custom py-6 sm:py-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">

          {/* Main content */}
          <div className="lg:col-span-8 space-y-6">
            {/* Flight info — always visible */}
            <FlightSummaryCard flight={flight} />

            {/* Step content */}
            {step === 1 && (
              <PassengerForm
                passengerCount={passengerCount}
                onSubmit={handlePassengerSubmit}
              />
            )}

            {step === 2 && (
              <ContactAddons
                initialAddons={addons}
                onSubmit={handleContactSubmit}
                onBack={() => setStep(1)}
              />
            )}

            {step === 3 && (
              <ReviewPayment
                passengers={passengers}
                contact={contact}
                onPayment={handlePayment}
                onBack={() => setStep(2)}
                isProcessing={isProcessing}
              />
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4">
            <FareSummary
              fare={fare}
              passengers={passengerCount}
            />
          </div>
        </div>
      </div>
    </div>
  );
}