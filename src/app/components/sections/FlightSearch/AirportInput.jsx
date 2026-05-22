'use client';
import { useState, useRef, useEffect, useCallback } from 'react';
import { MapPin } from 'lucide-react';
import { searchAirports } from '../../../../lib/airports';

export default function AirportInput({ label, value, onChange, placeholder, excludeCode }) {
  const [isOpen, setIsOpen]             = useState(false);
  const [query, setQuery]               = useState('');
  const [highlightIdx, setHighlightIdx] = useState(0);
  const wrapperRef = useRef(null);

  useEffect(() => {
    const handler = (e) => {
      if (wrapperRef.current && !wrapperRef.current.contains(e.target)) {
        setIsOpen(false);
        setQuery('');
      }
    };
    document.addEventListener('mousedown', handler);
    return () => document.removeEventListener('mousedown', handler);
  }, []);

  const results = searchAirports(query).filter((a) => a.code !== excludeCode);

  const handleSelect = useCallback((airport) => {
    onChange(airport);
    setIsOpen(false);
    setQuery('');
    setHighlightIdx(0);
  }, [onChange]);

  const handleKeyDown = (e) => {
    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setHighlightIdx((i) => Math.min(i + 1, results.length - 1));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setHighlightIdx((i) => Math.max(i - 1, 0));
    } else if (e.key === 'Enter' && results[highlightIdx]) {
      e.preventDefault();
      handleSelect(results[highlightIdx]);
    } else if (e.key === 'Escape') {
      setIsOpen(false);
    }
  };

  return (
    <div ref={wrapperRef} className="relative w-full">
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        className="w-full text-left p-3 sm:p-4 rounded-xl border-2 border-gray-200 bg-white hover:border-brand-orange-300 focus:border-brand-orange-500 focus:outline-none transition-all"
      >
        <span className="text-xs font-semibold uppercase tracking-wide text-gray-500">{label}</span>
        <div className="mt-1 flex items-center gap-2">
          <MapPin className="h-5 w-5 text-brand-orange-500 flex-shrink-0" />
          <div className="min-w-0 flex-1">
            {value ? (
              <>
                <div className="text-base sm:text-lg font-bold text-brand-dark truncate">
                  {value.city} <span className="text-brand-orange-500">({value.code})</span>
                </div>
                <div className="text-xs text-gray-500 truncate">{value.name}</div>
              </>
            ) : (
              <div className="text-base text-gray-400">{placeholder}</div>
            )}
          </div>
        </div>
      </button>

      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-white rounded-xl shadow-2xl border border-gray-200 z-50 overflow-hidden">
          <div className="p-3 border-b border-gray-100">
            <input
              type="text"
              autoFocus
              value={query}
              onChange={(e) => { setQuery(e.target.value); setHighlightIdx(0); }}
              onKeyDown={handleKeyDown}
              placeholder="Search city, airport or code..."
              className="w-full px-3 py-2 text-sm border border-gray-200 rounded-lg focus:border-brand-orange-500 focus:outline-none"
            />
          </div>

          <ul className="max-h-72 overflow-y-auto" role="listbox">
            {results.length > 0 ? results.map((airport, idx) => (
              <li
                key={airport.code}
                role="option"
                aria-selected={idx === highlightIdx}
                onClick={() => handleSelect(airport)}
                onMouseEnter={() => setHighlightIdx(idx)}
                className={`px-4 py-3 cursor-pointer flex items-center gap-3 ${
                  idx === highlightIdx ? 'bg-brand-orange-50' : ''
                }`}
              >
                <MapPin className="h-4 w-4 text-gray-400 flex-shrink-0" />
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-semibold text-brand-dark truncate">
                    {airport.city}, {airport.country}
                  </div>
                  <div className="text-xs text-gray-500 truncate">{airport.name}</div>
                </div>
                <span className="text-xs font-bold text-brand-orange-500 bg-brand-orange-50 px-2 py-1 rounded">
                  {airport.code}
                </span>
              </li>
            )) : (
              <li className="px-4 py-6 text-center text-sm text-gray-500">No airports found</li>
            )}
          </ul>
        </div>
      )}
    </div>
  );
}