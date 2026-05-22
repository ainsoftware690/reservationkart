'use client';

import { useState, useRef, useEffect } from 'react';
import { ChevronDown, Check, Globe } from 'lucide-react';
import { CURRENCIES } from '../../../lib/currency';
import { useCurrency } from '../../../contexts/CurrencyContext';

export default function CurrencySwitcher({ compact = false }) {
  const { currency, currencyData, changeCurrency } = useCurrency();
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  // Outside click closes dropdown
  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const handleSelect = (code) => {
    changeCurrency(code);
    setIsOpen(false);
  };

  return (
    <div ref={ref} className="relative">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-label={`Change currency. Current: ${currencyData.name}`}
        className={`inline-flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white font-semibold text-brand-dark hover:border-brand-orange-500 hover:text-brand-orange-500 transition-colors ${
          compact ? 'px-2.5 py-1.5 text-xs' : 'px-3 py-2 text-sm'
        }`}
      >
        <Globe className={compact ? 'h-3.5 w-3.5' : 'h-4 w-4'} />
        <span>{currency}</span>
        <ChevronDown
          className={`${compact ? 'h-3 w-3' : 'h-3.5 w-3.5'} transition-transform ${
            isOpen ? 'rotate-180' : ''
          }`}
        />
      </button>

      {isOpen && (
        <div
          role="listbox"
          aria-label="Select currency"
          className="absolute right-0 top-full mt-2 w-56 bg-white rounded-xl shadow-2xl border border-gray-100 overflow-hidden z-50"
        >
          <div className="px-3 py-2 border-b border-gray-100">
            <div className="text-xs font-bold uppercase tracking-wider text-gray-500">
              Select Currency
            </div>
          </div>

          <ul className="max-h-80 overflow-y-auto py-1">
            {Object.values(CURRENCIES).map((c) => {
              const isActive = c.code === currency;
              return (
                <li key={c.code} role="option" aria-selected={isActive}>
                  <button
                    type="button"
                    onClick={() => handleSelect(c.code)}
                    className={`w-full px-3 py-2.5 flex items-center gap-3 text-left transition-colors ${
                      isActive
                        ? 'bg-brand-orange-50 text-brand-orange-700'
                        : 'hover:bg-gray-50 text-brand-dark'
                    }`}
                  >
                    <span className="w-7 text-base font-bold">{c.symbol}</span>
                    <div className="flex-1 min-w-0">
                      <div className="text-sm font-semibold truncate">{c.code}</div>
                      <div className="text-xs text-gray-500 truncate">{c.name}</div>
                    </div>
                    {isActive && (
                      <Check className="h-4 w-4 text-brand-orange-500 flex-shrink-0" />
                    )}
                  </button>
                </li>
              );
            })}
          </ul>
        </div>
      )}
    </div>
  );
}