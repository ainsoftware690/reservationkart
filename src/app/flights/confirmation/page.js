import { Suspense } from 'react';
import ConfirmationPage from './ConfirmationPage';

export const metadata = { title: 'Booking Confirmed' };

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <ConfirmationPage />
    </Suspense>
  );
}