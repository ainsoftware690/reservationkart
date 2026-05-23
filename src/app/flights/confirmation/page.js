import { Suspense } from 'react';
import ConfirmationPage from './ConfirmationPage';

export const metadata = { title: 'Booking Confirmed | ReservationKart' };

export default function Page() {
  return (
    <Suspense fallback={
      <div className="min-h-screen flex items-center justify-center">
        <div className="w-12 h-12 border-4 border-brand-orange-500 border-t-transparent rounded-full animate-spin" />
      </div>
    }>
      <ConfirmationPage />
    </Suspense>
  );
}