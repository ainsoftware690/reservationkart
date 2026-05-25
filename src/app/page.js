import Hero from './components/sections/Hero';
import TrendingRoutes from './components/sections/TrendingRoutes';
import TopDestinations from './components/sections/TopDestinations';
import FlightSearch from "./components/sections/FlightSearch"
import Offers from './components/sections/Offers';
import WhyChooseUs from './components/sections/WhyChooseUs';
import Testimonials from './components/sections/Testimonials';
import FAQ from "./components/sections/FAQ"



export const metadata = {
  title:       'Book Cheap Flights, Hotels & Holidays — Best Prices',
  description: 'ReservationKart: Book flights, hotels, holidays at lowest prices. 500+ airlines, instant e-tickets, 24/7 support. Your dream travel, just a phone call away!',
  alternates:  { canonical: 'https://reservationkart.com' },
  openGraph: {
    title:       'ReservationKart — Book Cheap Flights & Hotels',
    description: 'Compare 500+ airlines. Instant e-tickets. 24/7 human support.',
    url:         'https://reservationkart.com',
  },
};


export default function HomePage() {
  return (
    <>

      <Hero />
       <FlightSearch />
      <TrendingRoutes />
      <TopDestinations />
      <Offers />
      <WhyChooseUs />
      <Testimonials />
       <FAQ />
    
    </>
  );
}