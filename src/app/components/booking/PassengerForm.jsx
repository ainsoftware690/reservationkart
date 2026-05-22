'use client';

import { useState } from 'react';
import { User, Calendar, Globe, ChevronRight } from 'lucide-react';

const NATIONALITIES = [
  'Indian', 'American', 'British', 'Canadian', 'Australian',
  'UAE', 'Saudi Arabian', 'Singaporean', 'French', 'German',
  'Japanese', 'Chinese', 'Other',
];

// Reusable input component
function Input({ label, error, required, ...props }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <input
        {...props}
        className={`mt-1 w-full px-4 py-3 rounded-xl border-2 bg-white focus:outline-none transition-all text-base ${
          error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-brand-orange-500'
        }`}
      />
      {error && <span className="mt-1 text-xs text-red-600">{error}</span>}
    </label>
  );
}

function Select({ label, error, required, options, ...props }) {
  return (
    <label className="block">
      <span className="text-xs font-semibold uppercase tracking-wide text-gray-600">
        {label} {required && <span className="text-red-500">*</span>}
      </span>
      <select
        {...props}
        className={`mt-1 w-full px-4 py-3 rounded-xl border-2 bg-white focus:outline-none transition-all text-base ${
          error ? 'border-red-300 focus:border-red-500' : 'border-gray-200 focus:border-brand-orange-500'
        }`}
      >
        <option value="">Select...</option>
        {options.map((opt) => (
          <option key={opt} value={opt}>{opt}</option>
        ))}
      </select>
      {error && <span className="mt-1 text-xs text-red-600">{error}</span>}
    </label>
  );
}

export default function PassengerForm({ passengerCount, onSubmit }) {
  // Initialize empty passenger array
  const total = passengerCount.adults + passengerCount.children + passengerCount.infants;

  const buildInitialPassengers = () => {
    const list = [];
    for (let i = 0; i < passengerCount.adults; i++) {
      list.push({ type: 'Adult', title: '', firstName: '', lastName: '', dob: '', nationality: '' });
    }
    for (let i = 0; i < passengerCount.children; i++) {
      list.push({ type: 'Child', title: '', firstName: '', lastName: '', dob: '', nationality: '' });
    }
    for (let i = 0; i < passengerCount.infants; i++) {
      list.push({ type: 'Infant', title: '', firstName: '', lastName: '', dob: '', nationality: '' });
    }
    return list;
  };

  const [passengers, setPassengers] = useState(buildInitialPassengers);
  const [errors, setErrors]         = useState({});

  const updateField = (idx, field, value) => {
    setPassengers((prev) => {
      const next = [...prev];
      next[idx] = { ...next[idx], [field]: value };
      return next;
    });
    // Clear error
    setErrors((prev) => ({ ...prev, [`${idx}-${field}`]: undefined }));
  };

  const validate = () => {
    const newErrors = {};
    passengers.forEach((p, idx) => {
      if (!p.title)       newErrors[`${idx}-title`]       = 'Required';
      if (!p.firstName)   newErrors[`${idx}-firstName`]   = 'Required';
      if (!p.lastName)    newErrors[`${idx}-lastName`]    = 'Required';
      if (!p.dob)         newErrors[`${idx}-dob`]         = 'Required';
      if (!p.nationality) newErrors[`${idx}-nationality`] = 'Required';
    });
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) onSubmit(passengers);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <h2 className="text-xl sm:text-2xl font-bold text-brand-dark">
          Passenger Details
        </h2>
        <p className="mt-1 text-sm text-gray-600">
          Enter name exactly as it appears on government-issued ID
        </p>
      </div>

      {passengers.map((passenger, idx) => (
        <div key={idx} className="bg-white rounded-2xl shadow-sm p-5 sm:p-6 border border-gray-100">
          <div className="flex items-center gap-3 mb-5 pb-4 border-b border-gray-100">
            <div className="w-10 h-10 rounded-full bg-brand-orange-100 flex items-center justify-center text-brand-orange-600 font-bold">
              {idx + 1}
            </div>
            <div>
              <h3 className="font-bold text-brand-dark">
                {passenger.type} {idx + 1}
              </h3>
              <p className="text-xs text-gray-500">
                {passenger.type === 'Adult' ? '12+ years' : passenger.type === 'Child' ? '2–11 years' : 'Under 2'}
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-6 gap-4">
            <div className="sm:col-span-2">
              <Select
                label="Title"
                required
                options={passenger.type === 'Adult' ? ['Mr', 'Ms', 'Mrs', 'Dr'] : ['Mstr', 'Miss']}
                value={passenger.title}
                onChange={(e) => updateField(idx, 'title', e.target.value)}
                error={errors[`${idx}-title`]}
              />
            </div>
            <div className="sm:col-span-2">
              <Input
                label="First Name"
                required
                value={passenger.firstName}
                onChange={(e) => updateField(idx, 'firstName', e.target.value)}
                error={errors[`${idx}-firstName`]}
                placeholder="John"
              />
            </div>
            <div className="sm:col-span-2">
              <Input
                label="Last Name"
                required
                value={passenger.lastName}
                onChange={(e) => updateField(idx, 'lastName', e.target.value)}
                error={errors[`${idx}-lastName`]}
                placeholder="Doe"
              />
            </div>
            <div className="sm:col-span-3">
              <Input
                label="Date of Birth"
                type="date"
                required
                value={passenger.dob}
                onChange={(e) => updateField(idx, 'dob', e.target.value)}
                error={errors[`${idx}-dob`]}
                max={new Date().toISOString().split('T')[0]}
              />
            </div>
            <div className="sm:col-span-3">
              <Select
                label="Nationality"
                required
                options={NATIONALITIES}
                value={passenger.nationality}
                onChange={(e) => updateField(idx, 'nationality', e.target.value)}
                error={errors[`${idx}-nationality`]}
              />
            </div>
          </div>
        </div>
      ))}

      <button
        type="submit"
        className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-xl bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 text-white font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all"
      >
        Continue to Contact Details
        <ChevronRight className="h-5 w-5" />
      </button>
    </form>
  );
}