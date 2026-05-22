'use client';

import { useState } from 'react';
import { CheckCircle, Lock, CreditCard, ChevronLeft, AlertCircle } from 'lucide-react';

export default function ReviewPayment({ passengers, contact, onPayment, onBack, isProcessing }) {
  const [acceptedTerms, setAcceptedTerms] = useState(false);
  const [error, setError]                 = useState('');

  const handlePay = () => {
    if (!acceptedTerms) {
      setError('Please accept the terms and conditions to continue');
      return;
    }
    setError('');
    onPayment();
  };

  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-brand-dark">Review Your Booking</h2>
        <p className="mt-1 text-sm text-gray-600">
          Please verify all details before payment. Bookings are non-modifiable after confirmation.
        </p>
      </div>

      {/* Passengers review */}
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 border border-gray-100">
        <h3 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          Passengers ({passengers.length})
        </h3>
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
            </li>
          ))}
        </ul>
      </div>

      {/* Contact review */}
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 border border-gray-100">
        <h3 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
          <CheckCircle className="h-5 w-5 text-green-500" />
          Contact Information
        </h3>
        <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
          <div>
            <div className="text-xs text-gray-500">Email</div>
            <div className="font-semibold text-brand-dark">{contact.email}</div>
          </div>
          <div>
            <div className="text-xs text-gray-500">Phone</div>
            <div className="font-semibold text-brand-dark">{contact.phone}</div>
          </div>
        </div>
      </div>

      {/* Payment placeholder */}
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 border border-gray-100">
        <h3 className="font-bold text-brand-dark mb-4 flex items-center gap-2">
          <CreditCard className="h-5 w-5 text-brand-orange-500" />
          Payment Method
        </h3>

        <div className="rounded-xl bg-gradient-to-br from-gray-50 to-gray-100 p-6 text-center border-2 border-dashed border-gray-300">
          <Lock className="h-10 w-10 text-gray-400 mx-auto" />
          <h4 className="mt-3 font-bold text-brand-dark">Demo Mode</h4>
          <p className="mt-1 text-sm text-gray-600">
            Payment gateway integration coming soon. Click "Confirm Booking" below to simulate a successful booking.
          </p>
        </div>
      </div>

      {/* Terms */}
      <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl bg-white border border-gray-200">
        <input
          type="checkbox"
          checked={acceptedTerms}
          onChange={(e) => { setAcceptedTerms(e.target.checked); setError(''); }}
          className="mt-0.5 h-4 w-4 accent-brand-orange-500"
        />
        <span className="text-sm text-gray-700">
          I have reviewed all details and agree to ReservationKart's{' '}
          <a href="/terms" className="text-brand-orange-600 font-semibold hover:underline">Terms of Service</a>,{' '}
          <a href="/privacy" className="text-brand-orange-600 font-semibold hover:underline">Privacy Policy</a>, and the airline's fare rules.
        </span>
      </label>

      {error && (
        <div className="px-4 py-3 rounded-xl bg-red-50 border border-red-200 flex items-start gap-2">
          <AlertCircle className="h-4 w-4 text-red-600 flex-shrink-0 mt-0.5" />
          <span className="text-sm text-red-700">{error}</span>
        </div>
      )}

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          disabled={isProcessing}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-gray-200 text-brand-dark font-bold hover:border-gray-300 disabled:opacity-50 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          Back
        </button>
        <button
          type="button"
          onClick={handlePay}
          disabled={isProcessing}
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-green-500 to-green-600 text-white font-bold shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isProcessing ? (
            <>
              <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
              Processing...
            </>
          ) : (
            <>
              <Lock className="h-5 w-5" />
              Confirm Booking
            </>
          )}
        </button>
      </div>
    </div>
  );
}