export const metadata = {
  title:       'Holiday Packages — Flights + Hotels + Tours Bundled',
  description: 'Book curated holiday packages at best prices. Includes flights, hotels, tours, and transfers. Honeymoon, family, adventure, luxury packages available.',
  alternates:  { canonical: 'https://reservationkart.com/holidays' },
  openGraph: {
    title:       'Holiday Packages | ReservationKart',
    description: 'Curated holiday packages with flights, hotels & tours.',
    url:         'https://reservationkart.com/holidays',
  },
};

export default function HolidaysLayout({ children }) {
  return children;
}