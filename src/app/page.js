import Hero from './components/sections/Hero';
import TrendingRoutes from './components/sections/TrendingRoutes';
import TopDestinations from './components/sections/TopDestinations';
import FlightSearch from "./components/sections/FlightSearch"
import Offers from './components/sections/Offers';
import WhyChooseUs from './components/sections/WhyChooseUs';
import Testimonials from './components/sections/Testimonials';

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
    
    </>
  );
}