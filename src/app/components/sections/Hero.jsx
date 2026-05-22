'use client';
import Link from 'next/link';
import { Phone, Plane, Shield, Clock } from 'lucide-react';
import HeroBackground from './HeroBackground';

const TRUST_INDICATORS = [
  { icon: Plane,  label: '500+ Airlines'  },
  { icon: Shield, label: 'Secure Booking' },
  { icon: Clock,  label: '24/7 Support'   },
];

export default function Hero() {
  return (
    <section
      className="relative overflow-hidden min-h-[90vh] flex items-center"
      aria-labelledby="hero-heading"
    >
      {/* Animated sky background */}
      <HeroBackground />

      <div className="container-custom py-16 md:py-24 w-full">
        <div className="mx-auto max-w-4xl text-center">

          {/* Trust pill */}
          <div className="inline-flex items-center gap-2 rounded-full border border-white/20 bg-white/10 backdrop-blur-sm px-4 py-1.5 text-sm font-semibold text-white animate-fade-in">
            <span className="relative flex h-2 w-2">
              <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-brand-orange-400 opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-brand-orange-500" />
            </span>
            Trusted by 100,000+ travelers
          </div>

          {/* Heading — white text on dark bg */}
          <h1
            id="hero-heading"
            className="mt-6 text-4xl font-bold tracking-tight text-white sm:text-5xl md:text-6xl lg:text-7xl animate-slide-up"
          >
            Your dream travel,{' '}
            <span className="text-brand-orange-400">
              just a phone call away
            </span>
          </h1>

          <p className="mt-6 text-lg leading-8 text-white/75 md:text-xl animate-slide-up">
            Book flights, hotels and holidays at the lowest prices.
            Get personalized travel deals with 24/7 expert support.
          </p>

          {/* CTAs */}
          <div className="mt-10 flex flex-col items-center justify-center gap-4 sm:flex-row animate-slide-up">
            <Link href="/flights" className="btn-primary w-full sm:w-auto">
              Search Flights
            </Link>

            {/* Secondary button — white outline for dark bg */}
            <a
              href={`tel:+1 8002345245`}
              className="inline-flex items-center justify-center w-full sm:w-auto rounded-lg border-2 border-white/70 bg-transparent px-6 py-3 text-base font-semibold text-white transition-all hover:bg-white hover:text-brand-dark active:scale-95"
            >
              <Phone className="mr-2 h-5 w-5" />
              Call to Book
            </a>
          </div>

          {/* Trust indicators — white on dark */}
          <ul className="mt-12 flex flex-wrap items-center justify-center gap-6 md:gap-10 animate-fade-in">
            {TRUST_INDICATORS.map(({ icon: Icon, label }) => (
              <li
                key={label}
                className="flex items-center gap-2 text-sm font-medium text-white/80"
              >
                <Icon className="h-5 w-5 text-brand-orange-400" />
                {label}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}