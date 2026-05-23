import Link from 'next/link';
import Image from 'next/image';
import {
  Plane, Shield, Clock, Award, Globe2,
  ArrowRight, Phone,
} from 'lucide-react';
import FlightSearch from '../components/sections/FlightSearch';
import FAQ from '../components/sections/FAQ';
import { POPULAR_DESTINATIONS } from '../../lib/destinations';

export const metadata = {
  title: 'Book Cheap Flights | ReservationKart',
  description: 'Search and book domestic & international flights at lowest prices. 500+ airlines, 24/7 support.',
};

const FEATURES = [
  { icon: Globe2, title: '500+ Airlines',    desc: 'Compare every major carrier worldwide' },
  { icon: Shield, title: 'Secure Booking',   desc: 'Bank-level encryption on all payments' },
  { icon: Clock,  title: '24/7 Support',     desc: 'Real human help, anytime you need it'  },
  { icon: Award,  title: 'Best Price Match', desc: 'Found lower elsewhere? We match it'    },
];

const ROUTES = [
  { from: 'New York',    to: 'London',    fromCode: 'JFK', toCode: 'LHR', price: 449, duration: '7h 30m'  },
  { from: 'New York',    to: 'Dubai',     fromCode: 'JFK', toCode: 'DXB', price: 589, duration: '12h 15m' },
  { from: 'Los Angeles', to: 'Tokyo',     fromCode: 'LAX', toCode: 'NRT', price: 679, duration: '11h 45m' },
  { from: 'New York',    to: 'Mumbai',    fromCode: 'JFK', toCode: 'BOM', price: 729, duration: '15h 20m' },
  { from: 'London',      to: 'Singapore', fromCode: 'LHR', toCode: 'SIN', price: 549, duration: '13h 15m' },
  { from: 'Dubai',       to: 'Bangkok',   fromCode: 'DXB', toCode: 'BKK', price: 289, duration: '6h 30m'  },
];

export default function FlightsPage() {
  return (
    <div className="min-h-screen">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-dark via-blue-900 to-brand-dark py-20 sm:py-28 pb-40 sm:pb-48 overflow-hidden">
        <div
          className="absolute inset-0 opacity-20"
          style={{
            backgroundImage: 'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
          }}
        />
        <div className="absolute top-10 left-10 w-72 h-72 bg-brand-orange-500/20 rounded-full blur-3xl" />
        <div className="absolute bottom-10 right-10 w-96 h-96 bg-blue-500/20 rounded-full blur-3xl" />

        <div className="relative container-custom text-center text-white">
          <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange-500/20 text-brand-orange-400 text-sm font-bold uppercase tracking-wider mb-4">
            <Plane className="h-3.5 w-3.5" />
            Flight Booking
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
            Fly Anywhere,
            <span className="block text-brand-orange-400">Pay Less</span>
          </h1>
          <p className="mt-4 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto">
            Compare 500+ airlines instantly. Book domestic & international flights at the lowest prices.
          </p>
        </div>
      </section>

      {/* Search */}
      <FlightSearch />

      {/* Features */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="container-custom">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {FEATURES.map(({ icon: Icon, title, desc }) => (
              <div
                key={title}
                className="p-5 rounded-2xl bg-gradient-to-br from-brand-orange-50 to-white border border-orange-100"
              >
                <div className="w-12 h-12 rounded-xl bg-brand-orange-500 flex items-center justify-center text-white">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-base font-bold text-brand-dark">{title}</h3>
                <p className="mt-1 text-sm text-gray-600">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Popular Routes */}
      <section className="py-16 bg-gray-50">
        <div className="container-custom">
          <div className="flex flex-col sm:flex-row sm:items-end sm:justify-between gap-4 mb-8">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-brand-orange-500">
                Most Booked
              </span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-brand-dark">
                Popular Flight Routes
              </h2>
              <p className="mt-2 text-gray-600">
                Hottest routes booked by our travelers this week
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {ROUTES.map((route, idx) => (
              <Link
                key={idx}
                href={`/flights/search?from=${route.fromCode}&to=${route.toCode}`}
                className="group bg-white rounded-2xl p-5 shadow-sm hover:shadow-lg transition-all border border-gray-100"
              >
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center gap-2 text-xs text-gray-500">
                    <Clock className="h-3 w-3" />
                    {route.duration}
                  </div>
                  <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-green-100 text-green-700">
                    From
                  </span>
                </div>

                <div className="flex items-center justify-between gap-3">
                  <div>
                    <div className="text-xs text-gray-500">{route.fromCode}</div>
                    <div className="font-bold text-brand-dark">{route.from}</div>
                  </div>
                  <Plane className="h-5 w-5 text-brand-orange-500 group-hover:translate-x-1 transition-transform" />
                  <div className="text-right">
                    <div className="text-xs text-gray-500">{route.toCode}</div>
                    <div className="font-bold text-brand-dark">{route.to}</div>
                  </div>
                </div>

                <div className="mt-4 pt-4 border-t border-gray-100 flex items-center justify-between">
                  <div>
                    <div className="text-xs text-gray-500">Starting from</div>
                    <div className="text-xl font-bold text-brand-orange-500">${route.price}</div>
                  </div>
                  <ArrowRight className="h-5 w-5 text-gray-400 group-hover:text-brand-orange-500 transition-colors" />
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Top Destinations */}
      <section className="py-16 bg-white">
        <div className="container-custom">
          <div className="text-center mb-10">
            <span className="text-sm font-bold uppercase tracking-wider text-brand-orange-500">
              Worldwide Destinations
            </span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-brand-dark">
              Where Will You Fly Next?
            </h2>
          </div>

          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {POPULAR_DESTINATIONS.slice(0, 8).map((dest) => (
              <Link
                key={dest.id}
                href={`/flights/search?to=${dest.code}`}
                className="group relative aspect-square rounded-2xl overflow-hidden"
              >
                <Image
                  src={dest.image}
                  alt={dest.city}
                  fill
                  sizes="(max-width: 768px) 50vw, 25vw"
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent" />
                <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
                  <div className="text-lg font-bold">{dest.city}</div>
                  <div className="text-xs text-white/80 mt-1">From ${dest.price}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="py-16 bg-gradient-to-r from-brand-orange-500 to-brand-orange-600">
        <div className="container-custom text-white">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold">Need help booking?</h2>
              <p className="mt-3 text-white/90 text-lg">
                Our travel experts are available 24/7 to find you the best deals and assist with complex bookings.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                
                 <a href="tel:+18000000000"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white text-brand-orange-600 font-bold hover:bg-gray-50"
                >
                  <Phone className="h-5 w-5" /> Call Now
                </a>
                <Link
                  href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-white/20 backdrop-blur-sm text-white font-bold hover:bg-white/30"
                >
                  Email Us
                </Link>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              {[
                { value: '500+', label: 'Airlines'   },
                { value: '50K+', label: 'Cities'     },
                { value: '24/7', label: 'Support'    },
                { value: '10M+', label: 'Travelers'  },
              ].map((s) => (
                <div
                  key={s.label}
                  className="bg-white/10 backdrop-blur-sm rounded-2xl p-4 text-center"
                >
                  <div className="text-2xl sm:text-3xl font-bold">{s.value}</div>
                  <div className="text-sm text-white/80 mt-1">{s.label}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      <FAQ />
    </div>
  );
}