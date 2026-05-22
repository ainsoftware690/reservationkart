'use client';

const TRIP_TYPES = [
  { id: 'oneway',    label: 'One Way'    },
  { id: 'roundtrip', label: 'Round Trip' },
  { id: 'multicity', label: 'Multi City' },
];

export default function TripTypeTabs({ value, onChange }) {
  return (
    <div role="radiogroup" aria-label="Trip type" className="flex flex-wrap gap-2">
      {TRIP_TYPES.map((type) => {
        const isActive = value === type.id;
        return (
          <button
            key={type.id}
            type="button"
            role="radio"
            aria-checked={isActive}
            onClick={() => onChange(type.id)}
            className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
              isActive
                ? 'bg-brand-orange-500 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {type.label}
          </button>
        );
      })}
    </div>
  );
}