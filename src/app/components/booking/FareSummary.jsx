'use client';

import { useCurrency } from '../../../contexts/CurrencyContext';
import { Shield, Tag, Info } from 'lucide-react';

export default function FareSummary({ fare, passengers, onContinue, ctaLabel = 'Continue', isLoading = false }) {
  const { formatPrice } = useCurrency();

  return (
    <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 border border-gray-100 lg:sticky lg:top-32">
      <h3 className="text-lg font-bold text-brand-dark mb-4">Fare Summary</h3>

      <div className="space-y-2.5">
        {/* Adults */}
        {fare.breakdown.adults.count > 0 && (
          <Row
            label={`Adults × ${fare.breakdown.adults.count}`}
            value={formatPrice(fare.breakdown.adults.fare)}
          />
        )}
        {/* Children */}
        {fare.breakdown.children.count > 0 && (
          <Row
            label={`Children × ${fare.breakdown.children.count}`}
            value={formatPrice(fare.breakdown.children.fare)}
          />
        )}
        {/* Infants */}
        {fare.breakdown.infants.count > 0 && (
          <Row
            label={`Infants × ${fare.breakdown.infants.count}`}
            value={formatPrice(fare.breakdown.infants.fare)}
          />
        )}

        <div className="pt-2 border-t border-gray-100">
          <Row label="Base Fare" value={formatPrice(fare.baseFare)} bold />
        </div>
        <Row label="Taxes & Fees" value={formatPrice(fare.taxes)} muted />
        <Row label="Service Fee" value={formatPrice(fare.serviceFee)} muted />

        {fare.insurance > 0 && (
          <Row
            label={<><Shield className="inline h-3 w-3 mr-1" />Travel Insurance</>}
            value={formatPrice(fare.insurance)}
            muted
          />
        )}
        {fare.seatFee > 0 && (
          <Row label="Seat Selection" value={formatPrice(fare.seatFee)} muted />
        )}
        {fare.mealFee > 0 && (
          <Row label="In-flight Meals" value={formatPrice(fare.mealFee)} muted />
        )}
      </div>

      {/* Total */}
      <div className="mt-4 pt-4 border-t-2 border-dashed border-gray-200 flex justify-between items-center">
        <span className="text-lg font-bold text-brand-dark">Total</span>
        <span className="text-2xl font-bold text-brand-orange-500">
          {formatPrice(fare.total)}
        </span>
      </div>

      {/* Promo code teaser */}
      <button
        type="button"
        className="mt-4 w-full flex items-center justify-center gap-2 py-2.5 rounded-lg border-2 border-dashed border-brand-orange-300 bg-brand-orange-50 text-sm font-semibold text-brand-orange-700 hover:bg-brand-orange-100 transition-colors"
      >
        <Tag className="h-4 w-4" />
        Apply Promo Code
      </button>

      {/* Trust badge */}
      <div className="mt-4 px-3 py-2 rounded-lg bg-green-50 flex items-start gap-2">
        <Shield className="h-4 w-4 text-green-600 flex-shrink-0 mt-0.5" />
        <p className="text-xs text-green-700 leading-relaxed">
          <span className="font-semibold">Secured booking</span> with 256-bit SSL encryption
        </p>
      </div>

      {/* CTA */}
      {onContinue && (
        <button
          type="button"
          onClick={onContinue}
          disabled={isLoading}
          className="mt-5 w-full py-3.5 rounded-xl bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 text-white font-bold shadow-lg hover:shadow-xl active:scale-95 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
        >
          {isLoading ? 'Processing...' : ctaLabel}
        </button>
      )}
    </div>
  );
}

function Row({ label, value, bold, muted }) {
  return (
    <div className="flex justify-between items-center">
      <span className={`text-sm ${bold ? 'font-bold text-brand-dark' : muted ? 'text-gray-500' : 'text-gray-700'}`}>
        {label}
      </span>
      <span className={`text-sm ${bold ? 'font-bold text-brand-dark' : muted ? 'text-gray-500' : 'text-gray-700'}`}>
        {value}
      </span>
    </div>
  );
}