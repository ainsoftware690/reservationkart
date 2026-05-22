import { Suspense } from 'react';
import BookingFlow from './BookingFlow';

export const metadata = {
  title: 'Complete Your Booking',
};

export default function BookingPage() {
  return (
    <Suspense fallback={<Loading />}>
      <BookingFlow />
    </Suspense>
  );
}

function Loading() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-12 h-12 border-4 border-brand-orange-500 border-t-transparent rounded-full animate-spin" />
    </div>
  );
}