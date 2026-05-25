import { Suspense } from 'react';
import HotelsPage from './HotelsPage';

export const metadata = {
  title:       'Book Hotels Worldwide — Best Rates Guaranteed',
  description: 'Find and book hotels worldwide at best prices. 500,000+ properties, instant confirmation, free cancellation options. Book your stay now!',
  alternates:  { canonical: 'https://reservationkart.com/hotels' },
  openGraph: {
    title:       'Book Hotels | ReservationKart',
    description: '500,000+ hotels worldwide. Best rates guaranteed.',
    url:         'https://reservationkart.com/hotels',
  },
};
export default function Page() {
  return (
    <Suspense fallback={<div className="min-h-screen" />}>
      <HotelsPage />
    </Suspense>
  );
}