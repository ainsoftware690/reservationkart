'use client';
import { useState, useRef, useEffect } from 'react';
import { Users, Minus, Plus } from 'lucide-react';

const CLASSES = ['Economy', 'Premium Economy', 'Business', 'First'];

export default function PassengerSelector({ value, onChange }) {
  const [isOpen, setIsOpen] = useState(false);
  const ref = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (ref.current && !ref.current.contains(e.target)) setIsOpen(false);
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const total = value.adults + value.children + value.infants;

  const updateCount = (key, delta) => {
    const next = { ...value, [key]: Math.max(0, value[key] + delta) };
    if (key === 'adults' && next.adults < 1) next.adults = 1;
    if (next.infants > next.adults) next.infants = next.adults;
    if (total + delta > 9) return;
    onChange(next);
  };

  const counters = [
    { key: 'adults',   label: 'Adults',   sub: '12+ years',  min: 1 },
    { key: 'children', label: 'Children', sub: '2–11 years', min: 0 },
    { key: 'infants',  label: 'Infants',  sub: 'Under 2',    min: 0 },
  ];

  return (
    <div ref={ref} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full text-left p-3 sm:p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-brand-orange-300 focus:border-brand-orange-500 focus:outline-none transition-all"
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
          Travellers & Class
        </span>
        <div className="mt-1 flex items-center gap-2">
          <Users className="h-5 w-5 text-brand-orange-500 flex-shrink-0" />
          <div className="flex-1 min-w-0">
            <div className="text-base sm:text-lg font-bold text-brand-dark">
              {total} {total === 1 ? 'Traveller' : 'Travellers'}
            </div>
            <div className="text-xs text-gray-500 truncate">{value.class}</div>
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full right-0 mt-2 w-80 max-w-[calc(100vw-2rem)] bg-white rounded-xl shadow-2xl border border-gray-200 z-50 p-4">
          {counters.map((c) => (
            <div key={c.key} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
              <div>
                <div className="text-sm font-semibold text-brand-dark">{c.label}</div>
                <div className="text-xs text-gray-500">{c.sub}</div>
              </div>
              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => updateCount(c.key, -1)}
                  disabled={value[c.key] <= c.min}
                  aria-label={`Decrease ${c.label}`}
                  className="w-8 h-8 rounded-full border-2 border-brand-orange-500 text-brand-orange-500 flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed hover:bg-brand-orange-500 hover:text-white transition-colors"
                >
                  <Minus className="h-4 w-4" />
                </button>
                <span className="w-6 text-center font-bold text-brand-dark">{value[c.key]}</span>
                <button
                  type="button"
                  onClick={() => updateCount(c.key, 1)}
                  aria-label={`Increase ${c.label}`}
                  className="w-8 h-8 rounded-full border-2 border-brand-orange-500 text-brand-orange-500 flex items-center justify-center hover:bg-brand-orange-500 hover:text-white transition-colors"
                >
                  <Plus className="h-4 w-4" />
                </button>
              </div>
            </div>
          ))}

          <div className="mt-4 pt-4 border-t border-gray-100">
            <div className="text-xs font-semibold uppercase tracking-wide text-gray-500 mb-2">
              Travel Class
            </div>
            <div className="grid grid-cols-2 gap-2">
              {CLASSES.map((cls) => (
                <button
                  key={cls}
                  type="button"
                  onClick={() => onChange({ ...value, class: cls })}
                  className={`px-3 py-2 rounded-lg text-xs font-semibold transition-all ${
                    value.class === cls
                      ? 'bg-brand-orange-500 text-white'
                      : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                  }`}
                >
                  {cls}
                </button>
              ))}
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="mt-4 w-full py-2 rounded-lg bg-brand-dark text-white font-semibold text-sm hover:bg-brand-dark-900 transition-colors"
          >
            Done
          </button>
        </div>
      )}
    </div>
  );
}