'use client';

import { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { CURRENCIES, DEFAULT_CURRENCY, formatPrice as formatPriceHelper } from '../lib/currency';

const STORAGE_KEY = 'reservationkart_currency';

const CurrencyContext = createContext(null);

export function CurrencyProvider({ children }) {
  // Default USD — hydrate from localStorage on client
  const [currency, setCurrency]     = useState(DEFAULT_CURRENCY);
  const [isHydrated, setIsHydrated] = useState(false);

  // Load persisted preference (after mount → no SSR/CSR mismatch)
  useEffect(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved && CURRENCIES[saved]) setCurrency(saved);
    } catch (err) {
      // localStorage blocked (Safari private mode etc.) — fail silently
    }
    setIsHydrated(true);
  }, []);

  // Persist on change
  const changeCurrency = useCallback((newCode) => {
    if (!CURRENCIES[newCode]) return;
    setCurrency(newCode);
    try {
      localStorage.setItem(STORAGE_KEY, newCode);
    } catch (err) {
      // Storage blocked — still update in-memory
    }
  }, []);

  // Memoized formatter — components call this with just (amount)
  const formatPrice = useCallback(
    (amount, options) => formatPriceHelper(amount, currency, options),
    [currency]
  );

  const value = {
    currency,
    currencyData: CURRENCIES[currency],
    changeCurrency,
    formatPrice,
    isHydrated,
  };

  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
}

// Custom hook — components yeh use karenge
export function useCurrency() {
  const ctx = useContext(CurrencyContext);
  if (!ctx) throw new Error('useCurrency must be used within CurrencyProvider');
  return ctx;
}