'use client';
import { useState } from 'react';
import { Copy, Check, Clock, Tag } from 'lucide-react';
import {OFFERS} from '../../../lib/offers';

export default function Offers() {
  const [copiedCode, setCopiedCode] = useState(null);

  const handleCopy = async (code) => {
    try {
      await navigator.clipboard.writeText(code);
      setCopiedCode(code);
      setTimeout(() => setCopiedCode(null), 2000);
    } catch (err) {
      // Clipboard API not supported / blocked
    }
  };

  return (
    <section
      className="py-16 sm:py-20 bg-gradient-to-br from-gray-50 to-brand-orange-50"
      aria-labelledby="offers-heading"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-orange-500">
            Exclusive Deals
          </span>
          <h2
            id="offers-heading"
            className="mt-2 text-3xl sm:text-4xl font-bold text-brand-dark"
          >
            Special Offers & Discounts
          </h2>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            Save more on every booking with our exclusive promo codes
          </p>
        </div>

        {/* Cards grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
          {OFFERS.map((offer) => (
            <article
              key={offer.id}
              className="group relative bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-2xl transition-all duration-300 hover:-translate-y-1"
            >
              {/* Gradient header */}
              <div
                className={`relative p-5 bg-gradient-to-br ${offer.color} text-white`}
              >
                <div className="text-3xl mb-1">{offer.icon}</div>
                <div className="text-xs font-semibold opacity-90 uppercase tracking-wide">
                  {offer.title}
                </div>
                <div className="text-2xl sm:text-3xl font-bold mt-1">
                  {offer.discount}
                </div>

                {/* Decorative circles (ticket effect) */}
                <div className="absolute -bottom-3 left-0 w-6 h-6 bg-white rounded-full" />
                <div className="absolute -bottom-3 right-0 w-6 h-6 bg-white rounded-full" />
              </div>

              {/* Body */}
              <div className="p-5">
                <p className="text-sm text-gray-600 leading-relaxed min-h-[3rem]">
                  {offer.description}
                </p>

                {/* Copy code button */}
                <button
                  type="button"
                  onClick={() => handleCopy(offer.code)}
                  aria-label={`Copy promo code ${offer.code}`}
                  className="mt-4 w-full flex items-center justify-between gap-2 px-3 py-2.5 rounded-lg border-2 border-dashed border-brand-orange-300 bg-brand-orange-50 hover:bg-brand-orange-100 transition-colors"
                >
                  <div className="flex items-center gap-2 min-w-0">
                    <Tag className="h-4 w-4 text-brand-orange-500 flex-shrink-0" />
                    <span className="text-sm font-bold text-brand-orange-700 truncate">
                      {offer.code}
                    </span>
                  </div>
                  {copiedCode === offer.code ? (
                    <span className="flex items-center gap-1 text-xs font-bold text-green-600">
                      <Check className="h-3.5 w-3.5" />
                      Copied
                    </span>
                  ) : (
                    <Copy className="h-3.5 w-3.5 text-brand-orange-500 flex-shrink-0" />
                  )}
                </button>

                <div className="mt-3 flex items-center gap-1.5 text-xs text-gray-500">
                  <Clock className="h-3 w-3" />
                  Valid for {offer.expiresIn}
                </div>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}