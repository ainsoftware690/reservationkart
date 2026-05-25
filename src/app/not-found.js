import Link from 'next/link';
import { Plane, Home, Search, Phone } from 'lucide-react';

export const metadata = {
  title:  '404 — Page Not Found',
  robots: { index: false },          // Don't index 404 pages
};

export default function NotFound() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-brand-dark via-blue-900 to-brand-dark flex items-center justify-center p-4">
      {/* Stars background */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="absolute w-1 h-1 bg-white rounded-full opacity-60"
            style={{
              left:              `${(i * 17 + 5) % 100}%`,
              top:               `${(i * 23 + 10) % 60}%`,
              animationDelay:    `${i * 0.3}s`,
              animation:         'pulse 3s ease-in-out infinite',
            }}
          />
        ))}
      </div>

      <div className="relative text-center text-white max-w-lg mx-auto">
        {/* Animated plane */}
        <div className="mb-8 relative">
          <div className="text-8xl sm:text-9xl font-bold text-white/10 select-none">
            404
          </div>
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="animate-bounce">
              <Plane className="h-16 w-16 sm:h-20 sm:w-20 text-brand-orange-500 drop-shadow-2xl" />
            </div>
          </div>
        </div>

        <h1 className="text-2xl sm:text-3xl font-bold mb-3">
          This flight got lost!
        </h1>
        <p className="text-white/70 text-base sm:text-lg mb-8">
          The page you're looking for has taken off to an unknown destination. Let's get you back on track.
        </p>

        {/* Quick links */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 mb-8">
          <Link
            href="/"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-brand-orange-500 text-white font-bold hover:bg-brand-orange-600 transition-colors"
          >
            <Home className="h-5 w-5" />
            Back to Home
          </Link>
          <Link
            href="/flights"
            className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-white/10 backdrop-blur-sm text-white font-bold hover:bg-white/20 transition-colors"
          >
            <Search className="h-5 w-5" />
            Search Flights
          </Link>
        </div>

        
        <a  href="tel:+1 8002345245"
          className="inline-flex items-center gap-2 text-brand-orange-400 hover:text-brand-orange-300 font-semibold"
        >
          <Phone className="h-4 w-4" />
          Need help? Call us 24/7
        </a>
      </div>
    </div>
  );
}