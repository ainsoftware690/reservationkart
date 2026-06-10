'use client';

import { useState } from 'react';
import { Mail, Phone, Shield, Utensils, Armchair, ChevronRight, ChevronLeft } from 'lucide-react';
import { useCurrency } from '../../../contexts/CurrencyContext';

const ADDON_OPTIONS = [
  {
    id: 'insurance',
    icon: Shield,
    title: 'Travel Insurance',
    description: 'Coverage for flight cancellation, medical emergencies, lost baggage',
    price: 8,
    perPerson: true,
    color: 'green',
  },
  {
    id: 'seatSelection',
    icon: Armchair,
    title: 'Premium Seat Selection',
    description: 'Choose your preferred window, aisle or extra legroom seat',
    price: 15,
    perPerson: true,
    color: 'blue',
  },
  {
    id: 'meal',
    icon: Utensils,
    title: 'In-flight Meal',
    description: 'Pre-book your meal preference (Veg / Non-Veg / Special diet)',
    price: 12,
    perPerson: true,
    color: 'orange',
  },
];

export default function ContactAddons({ onSubmit, onBack,  initialAddons = {} }) {
  const { formatPrice } = useCurrency();

  const [email, setEmail]       = useState('');
  const [phone, setPhone]       = useState('');
  const [countryCode, setCountryCode] = useState('+1');
  const [addons, setAddons]     = useState(initialAddons);
  const [errors, setErrors]     = useState({});

  const toggleAddon = (id) => {
    setAddons((prev) => ({ ...prev, [id]: !prev[id] }));
  };

  const validate = () => {
    const newErrors = {};
    if (!email.trim())                          newErrors.email = 'Email is required';
    else if (!/^\S+@\S+\.\S+$/.test(email))     newErrors.email = 'Enter a valid email';
    if (!phone.trim())                          newErrors.phone = 'Phone number is required';
    else if (!/^\d{7,15}$/.test(phone))         newErrors.phone = 'Enter a valid phone number';
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit({ email, phone: `${countryCode} ${phone}`, addons });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 border border-gray-100">
        <h2 className="text-xl sm:text-2xl font-bold text-brand-dark mb-1">
          Contact Information
        </h2>
        <p className="text-sm text-gray-600 mb-5">
          Booking confirmation and updates will be sent here
        </p>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
              Email Address <span className="text-red-500">*</span>
            </span>
            <div className="mt-1 relative">
              <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
              <input
                type="email"
                value={email}
                onChange={(e) => { setEmail(e.target.value); setErrors((p) => ({ ...p, email: undefined })); }}
                placeholder="you@example.com"
                className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white focus:outline-none transition-all text-base ${
                  errors.email ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-brand-orange-500'
                }`}
              />
            </div>
            {errors.email && <span className="mt-1 text-xs text-red-600">{errors.email}</span>}
          </label>

          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
              Phone Number <span className="text-red-500">*</span>
            </span>
            <div className="mt-1 flex gap-2">
              <select
                value={countryCode}
                onChange={(e) => setCountryCode(e.target.value)}
                className="px-3 py-3 rounded-xl border-2 border-gray-200 bg-white focus:border-brand-orange-500 focus:outline-none text-sm font-semibold"
              >
                <option value="+1">+1</option>
                <option value="+91">+91</option>
                <option value="+44">+44</option>
                <option value="+971">+971</option>
                <option value="+65">+65</option>
                <option value="+61">+61</option>
              </select>
              <div className="flex-1 relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => { setPhone(e.target.value.replace(/\D/g, '')); setErrors((p) => ({ ...p, phone: undefined })); }}
                  placeholder="1234567890"
                  className={`w-full pl-10 pr-4 py-3 rounded-xl border-2 bg-white focus:outline-none transition-all text-base ${
                    errors.phone ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-brand-orange-500'
                  }`}
                />
              </div>
            </div>
            {errors.phone && <span className="mt-1 text-xs text-red-600">{errors.phone}</span>}
          </label>
        </div>
      </div>

      {/* Add-ons */}
      <div className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 border border-gray-100">
        <h2 className="text-xl sm:text-2xl font-bold text-brand-dark mb-1">
          Enhance Your Travel
        </h2>
        <p className="text-sm text-gray-600 mb-5">
          Optional add-ons for a smoother journey
        </p>

        <div className="space-y-3">
          {ADDON_OPTIONS.map((addon) => {
            const Icon       = addon.icon;
            const isSelected = !!addons[addon.id];

            return (
              <label
                key={addon.id}
                className={`relative block cursor-pointer rounded-xl border-2 p-4 transition-all ${
                  isSelected
                    ? 'border-brand-orange-500 bg-brand-orange-50'
                    : 'border-gray-200 bg-white hover:border-brand-orange-300'
                }`}
              >
                <input
                  type="checkbox"
                  checked={isSelected}
                  onChange={() => toggleAddon(addon.id)}
                  className="sr-only"
                />
                <div className="flex items-start gap-4">
                  <div
                    className={`w-11 h-11 rounded-xl flex items-center justify-center flex-shrink-0 ${
                      isSelected ? 'bg-brand-orange-500 text-white' : 'bg-gray-100 text-gray-600'
                    }`}
                  >
                    <Icon className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex flex-wrap items-baseline gap-x-3 gap-y-1">
                      <h3 className="font-bold text-brand-dark">{addon.title}</h3>
                      <span className="text-sm font-bold text-brand-orange-600">
                        +{formatPrice(addon.price)}{addon.perPerson && ' / person'}
                      </span>
                    </div>
                    <p className="mt-1 text-sm text-gray-600">{addon.description}</p>
                  </div>
                  <div
                    className={`flex-shrink-0 w-6 h-6 rounded-full border-2 flex items-center justify-center transition-all ${
                      isSelected ? 'border-brand-orange-500 bg-brand-orange-500' : 'border-gray-300'
                    }`}
                  >
                    {isSelected && (
                      <svg className="h-3 w-3 text-white" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                      </svg>
                    )}
                  </div>
                </div>
              </label>
            );
          })}
        </div>
      </div>

      {/* Navigation */}
      <div className="flex flex-col sm:flex-row gap-3 sm:justify-between">
        <button
          type="button"
          onClick={onBack}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white border-2 border-gray-200 text-brand-dark font-bold hover:border-gray-300 transition-colors"
        >
          <ChevronLeft className="h-5 w-5" />
          Back
        </button>
        <button
          type="submit"
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 text-white font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all"
        >
          Continue to Review
          <ChevronRight className="h-5 w-5" />
        </button>
      </div>
    </form>
  );
}