import Link from 'next/link';
import { Lock, ArrowLeft, Phone } from 'lucide-react';

export const metadata = {
  title:  'Login — Coming Soon',
  robots: { index: false },
};

export default function LoginPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-brand-orange-50 via-white to-blue-50 flex items-center justify-center p-4">
      <div className="max-w-md w-full text-center">
        <div className="w-20 h-20 mx-auto rounded-full bg-gradient-to-br from-brand-orange-500 to-brand-orange-600 flex items-center justify-center shadow-2xl shadow-brand-orange-500/30">
          <Lock className="h-10 w-10 text-white" />
        </div>

        <h1 className="mt-6 text-3xl font-bold text-brand-dark">
          Account Coming Soon!
        </h1>
        <p className="mt-3 text-gray-600 leading-relaxed">
          We're working hard to bring you a seamless account experience.
          For now, you can book without creating an account — just enter your details at checkout.
        </p>

        <div className="mt-8 space-y-3">
          <Link
            href="/flights"
            className="block w-full px-6 py-3 rounded-xl bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 text-white font-bold shadow-lg hover:shadow-xl active:scale-95 transition-all"
          >
            Search Flights as Guest
          </Link>
          
           <a href="tel:+18002228888"
            className="flex items-center justify-center gap-2 w-full px-6 py-3 rounded-xl bg-white border-2 border-gray-200 text-brand-dark font-bold hover:border-brand-orange-500 transition-colors"
          >
            <Phone className="h-4 w-4" />
            Book via Phone
          </a>
          <Link
            href="/"
            className="inline-flex items-center gap-1 text-sm text-gray-500 hover:text-brand-orange-500 mt-4"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}