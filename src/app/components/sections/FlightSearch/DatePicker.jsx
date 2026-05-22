'use client';
import { useRef } from 'react';
import { Calendar } from 'lucide-react';

const formatDate = (dateStr) => {
  if (!dateStr) return null;
  const d = new Date(dateStr);
  return {
    day:     String(d.getDate()).padStart(2, '0'),
    month:   d.toLocaleString('en-US', { month: 'short' }),
    year:    d.getFullYear(),
    weekday: d.toLocaleString('en-US', { weekday: 'long' }),
  };
};

const todayISO = () => new Date().toISOString().split('T')[0];

export default function DatePicker({ label, value, onChange, minDate }) {
  const inputRef  = useRef(null);
  const formatted = formatDate(value);
  const min       = minDate || todayISO();

  // Trigger native calendar — works on click anywhere on the card
  const openPicker = () => {
    if (!inputRef.current) return;
    try {
      // Modern browsers (Chrome 99+, Edge, Safari 16+, Firefox 101+)
      if (typeof inputRef.current.showPicker === 'function') {
        inputRef.current.showPicker();
      } else {
        // Fallback for older browsers
        inputRef.current.focus();
        inputRef.current.click();
      }
    } catch (err) {
      inputRef.current.focus();
    }
  };

  return (
    <div
      onClick={openPicker}
      className="relative w-full cursor-pointer p-3 sm:p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-brand-orange-300 focus-within:border-brand-orange-500 transition-all"
    >
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">
        {label}
      </span>
      <div className="mt-1 flex items-center gap-2">
        <Calendar className="h-5 w-5 text-brand-orange-500 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          {formatted ? (
            <>
              <div className="text-base sm:text-lg font-bold text-brand-dark">
                {formatted.day} {formatted.month}'{String(formatted.year).slice(-2)}
              </div>
              <div className="text-xs text-gray-500 truncate">{formatted.weekday}</div>
            </>
          ) : (
            <div className="text-base text-gray-400">Select date</div>
          )}
        </div>
      </div>

      {/* Hidden input — sirf calendar trigger ke liye */}
      <input
        ref={inputRef}
        type="date"
        value={value || ''}
        min={min}
        onChange={(e) => onChange(e.target.value)}
        onClick={(e) => e.stopPropagation()}
        aria-label={label}
        className="absolute opacity-0 pointer-events-none"
        style={{ left: 0, bottom: 0, width: 1, height: 1 }}
      />
    </div>
  );
}