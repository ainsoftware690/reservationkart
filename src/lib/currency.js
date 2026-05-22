/**
 * Currency Configuration
 *
 * IMPORTANT: All product prices in the codebase are stored in USD (base currency).
 * Conversion happens at render time via formatPrice() helper.
 *
 * Exchange rates: Static for now. Future me API se fetch karenge:
 *   - https://openexchangerates.org (free tier: 1000 req/month)
 *   - https://exchangerate-api.com
 * Cache 1 hour in localStorage to minimize API calls.
 */

export const CURRENCIES = {
  USD: { code: 'USD', symbol: '$',  name: 'US Dollar',     locale: 'en-US', rate: 1     },
  INR: { code: 'INR', symbol: '₹',  name: 'Indian Rupee',  locale: 'en-IN', rate: 83.20 },
  EUR: { code: 'EUR', symbol: '€',  name: 'Euro',          locale: 'de-DE', rate: 0.92  },
  GBP: { code: 'GBP', symbol: '£',  name: 'British Pound', locale: 'en-GB', rate: 0.79  },
  AED: { code: 'AED', symbol: 'د.إ',name: 'UAE Dirham',    locale: 'en-AE', rate: 3.67  },
  CAD: { code: 'CAD', symbol: 'C$', name: 'Canadian Dollar',locale: 'en-CA', rate: 1.37  },
};

export const DEFAULT_CURRENCY = 'USD';

/**
 * Convert + format any USD price to active currency
 *
 * @example
 *   formatPrice(100, 'USD') → "$100"
 *   formatPrice(100, 'INR') → "₹8,320"
 *   formatPrice(100, 'EUR') → "€92"
 */
export const formatPrice = (amountInUSD, currencyCode = DEFAULT_CURRENCY, options = {}) => {
  const currency = CURRENCIES[currencyCode] || CURRENCIES[DEFAULT_CURRENCY];
  const { showDecimals = false } = options;

  const converted = amountInUSD * currency.rate;

  const formatted = converted.toLocaleString(currency.locale, {
    minimumFractionDigits: showDecimals ? 2 : 0,
    maximumFractionDigits: showDecimals ? 2 : 0,
  });

  return `${currency.symbol}${formatted}`;
};

/**
 * Get currency object by code
 */
export const getCurrency = (code) => CURRENCIES[code] || CURRENCIES[DEFAULT_CURRENCY];