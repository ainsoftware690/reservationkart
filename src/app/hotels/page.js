import { Suspense } from 'react';
import HotelsPage from './HotelsPage';

export const metadata = {
  title: 'Book Hotels | ReservationKart',
  description: 'Find and book the best hotels worldwide at lowest prices.',
};

export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <HotelsPage />
    </Suspense>
  );
}