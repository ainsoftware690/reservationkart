'use client';
import { ArrowLeftRight } from 'lucide-react';

export default function SwapButton({ onSwap }) {
  return (
    <button
      type="button"
      onClick={onSwap}
      aria-label="Swap origin and destination"
      className="z-10 w-10 h-10 sm:w-12 sm:h-12 rounded-full bg-white border-2 border-brand-orange-500 shadow-lg flex items-center justify-center text-brand-orange-500 hover:bg-brand-orange-500 hover:text-white hover:rotate-180 transition-all duration-300"
    >
      <ArrowLeftRight className="h-4 w-4 sm:h-5 sm:w-5" />
    </button>
  );
}