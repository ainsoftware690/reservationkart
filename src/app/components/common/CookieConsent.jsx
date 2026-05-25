'use client';

import { useState, useEffect } from 'react';
import { Cookie, Settings, X, Check } from 'lucide-react';
import Link from 'next/link';

const STORAGE_KEY = 'reservationkart_cookie_consent';

// Default preferences — essential is always required
const DEFAULT_PREFS = {
  essential:  true,   // Always on (functionality)
  analytics:  false,  // Google Analytics
  marketing:  false,  // Ads, retargeting
  preferences:false,  // Language, currency
};

const COOKIE_TYPES = [
  {
    id:          'essential',
    title:       'Essential Cookies',
    description: 'Required for basic site functionality like login, cart, currency switcher. Cannot be disabled.',
    required:    true,
  },
  {
    id:          'analytics',
    title:       'Analytics Cookies',
    description: 'Help us understand how you use our site through Google Analytics. No personal data collected.',
  },
  {
    id:          'marketing',
    title:       'Marketing Cookies',
    description: 'Used to show you relevant ads on other websites and measure ad campaign effectiveness.',
  },
  {
    id:          'preferences',
    title:       'Preference Cookies',
    description: 'Remember your language, currency, and theme preferences across sessions.',
  },
];

export default function CookieConsent() {
  const [isVisible,       setIsVisible]       = useState(false);
  const [showDetails,     setShowDetails]     = useState(false);
  const [prefs,           setPrefs]           = useState(DEFAULT_PREFS);
  const [hasInteracted,   setHasInteracted]   = useState(false);

  // Check if user has already consented (after hydration)
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        // Show banner after 1.5s delay (better UX — don't block initial load)
        setTimeout(() => setIsVisible(true), 1500);
      } else {
        setPrefs(JSON.parse(stored));
      }
    } catch (err) {}
    setHasInteracted(true);
  }, []);

  const savePreferences = (preferences) => {
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify({
        ...preferences,
        timestamp: new Date().toISOString(),
        version:   '1.0',
      }));
    } catch (err) {}

    setPrefs(preferences);
    setIsVisible(false);
    setShowDetails(false);

    // Trigger analytics scripts if accepted
    if (preferences.analytics && typeof window !== 'undefined') {
      // Future: load Google Analytics here
      // window.gtag('consent', 'update', { analytics_storage: 'granted' });
    }
  };

  const handleAcceptAll = () => {
    savePreferences({
      essential:  true,
      analytics:  true,
      marketing:  true,
      preferences:true,
    });
  };

  const handleAcceptEssential = () => {
    savePreferences(DEFAULT_PREFS);
  };

  const handleSaveCustom = () => {
    savePreferences(prefs);
  };

  const togglePref = (id) => {
    setPrefs((p) => ({ ...p, [id]: !p[id] }));
  };

  // Don't render until hydration completes
  if (!hasInteracted || !isVisible) return null;

  return (
    <div
      role="dialog"
      aria-label="Cookie consent"
      aria-modal="true"
      className="fixed inset-x-0 bottom-0 z-50 p-4 sm:p-6 animate-in"
    >
      <div className="max-w-5xl mx-auto bg-white rounded-2xl shadow-2xl border border-gray-200 overflow-hidden">

        {/* Compact view */}
        {!showDetails && (
          <div className="p-5 sm:p-6">
            <div className="flex flex-col lg:flex-row lg:items-center gap-4">
              <div className="flex items-start gap-3 flex-1">
                <div className="w-10 h-10 rounded-xl bg-brand-orange-100 flex items-center justify-center flex-shrink-0">
                  <Cookie className="h-5 w-5 text-brand-orange-600" />
                </div>
                <div>
                  <h3 className="font-bold text-brand-dark mb-1">
                    We value your privacy 🍪
                  </h3>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    We use cookies to enhance your browsing experience, personalize content, and analyze traffic.
                    Read our{' '}
                    <Link href="/privacy" className="text-brand-orange-600 font-semibold hover:underline">
                      Privacy Policy
                    </Link>
                    {' '}for details.
                  </p>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-2 lg:flex-shrink-0">
                <button
                  type="button"
                  onClick={() => setShowDetails(true)}
                  className="inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-sm font-semibold text-brand-dark hover:bg-gray-100 transition-colors"
                >
                  <Settings className="h-4 w-4" />
                  Customize
                </button>
                <button
                  type="button"
                  onClick={handleAcceptEssential}
                  className="px-4 py-2.5 rounded-lg text-sm font-semibold text-brand-dark border-2 border-gray-200 hover:border-gray-300 transition-colors"
                >
                  Essential Only
                </button>
                <button
                  type="button"
                  onClick={handleAcceptAll}
                  className="px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 hover:shadow-lg transition-all"
                >
                  Accept All
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Detailed view */}
        {showDetails && (
          <div>
            <div className="flex items-center justify-between p-5 border-b border-gray-100">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-xl bg-brand-orange-100 flex items-center justify-center">
                  <Settings className="h-5 w-5 text-brand-orange-600" />
                </div>
                <h3 className="font-bold text-brand-dark text-lg">
                  Cookie Preferences
                </h3>
              </div>
              <button
                type="button"
                onClick={() => setShowDetails(false)}
                aria-label="Close"
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <div className="p-5 max-h-96 overflow-y-auto space-y-3">
              {COOKIE_TYPES.map((type) => (
                <div
                  key={type.id}
                  className="p-4 rounded-xl border border-gray-200 hover:border-gray-300"
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <h4 className="font-bold text-brand-dark">{type.title}</h4>
                      {type.required && (
                        <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                          Always On
                        </span>
                      )}
                    </div>

                    {/* Toggle switch */}
                    <button
                      type="button"
                      onClick={() => !type.required && togglePref(type.id)}
                      disabled={type.required}
                      aria-label={`Toggle ${type.title}`}
                      className={`relative w-11 h-6 rounded-full transition-colors flex-shrink-0 ${
                        prefs[type.id]
                          ? 'bg-brand-orange-500'
                          : 'bg-gray-300'
                      } ${type.required ? 'opacity-60 cursor-not-allowed' : 'cursor-pointer'}`}
                    >
                      <span
                        className={`absolute top-0.5 left-0.5 w-5 h-5 rounded-full bg-white shadow-md transition-transform ${
                          prefs[type.id] ? 'translate-x-5' : ''
                        }`}
                      />
                    </button>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    {type.description}
                  </p>
                </div>
              ))}
            </div>

            <div className="p-5 border-t border-gray-100 flex flex-wrap gap-2 justify-end bg-gray-50">
              <button
                type="button"
                onClick={handleAcceptEssential}
                className="px-4 py-2.5 rounded-lg text-sm font-semibold text-brand-dark border-2 border-gray-200 hover:border-gray-300 transition-colors"
              >
                Reject All
              </button>
              <button
                type="button"
                onClick={handleSaveCustom}
                className="inline-flex items-center gap-2 px-5 py-2.5 rounded-lg text-sm font-bold text-white bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 hover:shadow-lg transition-all"
              >
                <Check className="h-4 w-4" />
                Save Preferences
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}