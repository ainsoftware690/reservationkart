'use client';

import { Check, User, Mail, CreditCard } from 'lucide-react';

const STEPS = [
  { id: 1, label: 'Passenger Details', icon: User },
  { id: 2, label: 'Contact & Add-ons', icon: Mail },
  { id: 3, label: 'Review & Pay',      icon: CreditCard },
];

export default function BookingStepper({ currentStep }) {
  return (
    <div className="bg-white border-b border-gray-200 sticky top-16 md:top-20 z-30 shadow-sm">
      <div className="container-custom py-4 sm:py-5">
        <ol className="flex items-center justify-between max-w-3xl mx-auto" role="list">
          {STEPS.map((step, idx) => {
            const isActive    = currentStep === step.id;
            const isCompleted = currentStep > step.id;
            const Icon        = step.icon;

            return (
              <li
                key={step.id}
                className="flex items-center flex-1 last:flex-none"
                aria-current={isActive ? 'step' : undefined}
              >
                <div className="flex flex-col items-center gap-2 relative">
                  <div
                    className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full flex items-center justify-center font-bold transition-all ${
                      isCompleted
                        ? 'bg-green-500 text-white'
                        : isActive
                        ? 'bg-brand-orange-500 text-white shadow-lg shadow-brand-orange-500/40 scale-110'
                        : 'bg-gray-100 text-gray-400'
                    }`}
                  >
                    {isCompleted ? (
                      <Check className="h-5 w-5" />
                    ) : (
                      <Icon className="h-4 w-4 sm:h-5 sm:w-5" />
                    )}
                  </div>
                  <span
                    className={`text-xs sm:text-sm font-semibold whitespace-nowrap ${
                      isActive
                        ? 'text-brand-orange-600'
                        : isCompleted
                        ? 'text-green-600'
                        : 'text-gray-400'
                    }`}
                  >
                    <span className="hidden sm:inline">{step.label}</span>
                    <span className="sm:hidden">Step {step.id}</span>
                  </span>
                </div>

                {idx < STEPS.length - 1 && (
                  <div className="flex-1 h-0.5 mx-2 sm:mx-4 -mt-7 sm:-mt-8 bg-gray-200 relative overflow-hidden">
                    <div
                      className={`h-full transition-all duration-500 ${
                        isCompleted ? 'w-full bg-green-500' : 'w-0'
                      }`}
                    />
                  </div>
                )}
              </li>
            );
          })}
        </ol>
      </div>
    </div>
  );
}