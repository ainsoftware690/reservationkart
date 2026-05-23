import Image from 'next/image';
import Link from 'next/link';
import {
  Globe2, Users, Award, HeartHandshake,
  Plane, Phone, Shield, Clock,
} from 'lucide-react';

export const metadata = {
  title: 'About Us | ReservationKart',
  description: 'Learn about ReservationKart — your trusted global travel partner.',
};

const MILESTONES = [
  { year: '2018', title: 'Founded', desc: 'Started in New York with a vision to make global travel accessible to everyone.' },
  { year: '2019', title: '1M Bookings', desc: 'Crossed our first million bookings milestone with customers across 50+ countries.' },
  { year: '2021', title: 'Global Expansion', desc: 'Expanded operations to Middle East, Europe, and Asia Pacific markets.' },
  { year: '2023', title: '500+ Airlines', desc: 'Partnered with 500+ airlines and 100,000+ hotels worldwide.' },
  { year: '2024', title: '10M Travelers', desc: 'Proudly served 10 million+ happy travelers across the globe.' },
  { year: '2025', title: 'Award Winning', desc: 'Recognized as Best Online Travel Agency by Global Travel Awards.' },
];

const VALUES = [
  { icon: Shield,       title: 'Trust First',      desc: 'Transparent pricing, no hidden fees. Your trust is our most valuable asset.' },
  { icon: HeartHandshake,title: 'Customer Obsessed',desc: '24/7 real human support — not bots. Because travel emergencies happen at 3 AM.' },
  { icon: Globe2,       title: 'Global Mindset',   desc: 'We serve travelers from 150+ countries with local knowledge and global reach.' },
  { icon: Clock,        title: 'Always Available', desc: 'Our support team never sleeps. Flight delayed at midnight? We are there.' },
];

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      {/* Hero */}
      <section className="relative bg-gradient-to-br from-brand-dark via-blue-900 to-brand-dark overflow-hidden py-20 sm:py-32">
        <div className="absolute inset-0 opacity-10"
          style={{ backgroundImage: 'url(https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=1600&q=80)', backgroundSize: 'cover' }} />
        <div className="relative container-custom text-center text-white">
          <span className="inline-block px-4 py-1.5 rounded-full bg-brand-orange-500/20 text-brand-orange-400 text-sm font-bold uppercase tracking-wider mb-4">
            Our Story
          </span>
          <h1 className="text-4xl sm:text-6xl font-bold leading-tight">
            Making the World
            <span className="block text-brand-orange-400">Smaller for You</span>
          </h1>
          <p className="mt-6 text-lg sm:text-xl text-white/80 max-w-2xl mx-auto leading-relaxed">
            ReservationKart was founded with one mission — to make booking the perfect trip as easy as a phone call. We believe great travel experiences should be accessible to everyone.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-8">
            {[
              { value: '10M+', label: 'Happy Travelers' },
              { value: '150+', label: 'Countries' },
              { value: '500+', label: 'Airlines' },
              { value: '24/7', label: 'Support' },
            ].map((stat) => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl sm:text-4xl font-bold text-brand-orange-400">{stat.value}</div>
                <div className="text-sm text-white/70 mt-1">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="py-16 sm:py-20">
        <div className="container-custom">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-sm font-bold uppercase tracking-wider text-brand-orange-500">Our Mission</span>
              <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-brand-dark">
                Travel Should Be Joyful, Not Stressful
              </h2>
              <p className="mt-4 text-gray-600 leading-relaxed">
                We started ReservationKart because we experienced firsthand how complicated travel booking could be — confusing pricing, hidden fees, unreachable support. We decided to change that.
              </p>
              <p className="mt-4 text-gray-600 leading-relaxed">
                Today, we serve travelers from 150+ countries with a platform that combines cutting-edge technology with genuine human expertise. Our travel specialists are available 24/7 to make your journey seamless.
              </p>
              <div className="mt-8 flex flex-col sm:flex-row gap-3">
                <Link href="/flights"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl bg-brand-orange-500 text-white font-bold hover:bg-brand-orange-600">
                  <Plane className="h-5 w-5" /> Book a Flight
                </Link>
                <Link href="/contact"
                  className="inline-flex items-center gap-2 px-6 py-3 rounded-xl border-2 border-gray-200 text-brand-dark font-bold hover:border-brand-orange-500">
                  <Phone className="h-5 w-5" /> Talk to Us
                </Link>
              </div>
            </div>
            <div className="relative h-80 sm:h-96 rounded-3xl overflow-hidden shadow-2xl">
              <Image
                src="https://images.unsplash.com/photo-1436491865332-7a61a109cc05?w=800&q=80"
                alt="Airplane wing view"
                fill
                className="object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Values */}
      <section className="py-16 sm:py-20 bg-gray-50">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-wider text-brand-orange-500">What We Stand For</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-brand-dark">Our Core Values</h2>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {VALUES.map(({ icon: Icon, title, desc }) => (
              <div key={title} className="bg-white rounded-2xl p-6 shadow-sm hover:shadow-lg transition-all group">
                <div className="w-12 h-12 rounded-xl bg-brand-orange-100 flex items-center justify-center text-brand-orange-500 group-hover:bg-brand-orange-500 group-hover:text-white transition-all">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="mt-4 text-lg font-bold text-brand-dark">{title}</h3>
                <p className="mt-2 text-sm text-gray-600 leading-relaxed">{desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-16 sm:py-20">
        <div className="container-custom">
          <div className="text-center mb-12">
            <span className="text-sm font-bold uppercase tracking-wider text-brand-orange-500">Our Journey</span>
            <h2 className="mt-2 text-3xl sm:text-4xl font-bold text-brand-dark">Milestones That Define Us</h2>
          </div>
          <div className="relative max-w-4xl mx-auto">
            <div className="absolute left-4 sm:left-1/2 top-0 bottom-0 w-0.5 bg-gray-200" />
            <div className="space-y-8">
              {MILESTONES.map((m, idx) => (
                <div key={m.year} className={`relative flex flex-col sm:flex-row gap-6 ${idx % 2 === 0 ? 'sm:flex-row-reverse' : ''}`}>
                  <div className="sm:w-1/2" />
                  <div className="absolute left-4 sm:left-1/2 top-5 -translate-x-1/2 w-4 h-4 rounded-full bg-brand-orange-500 border-4 border-white shadow-lg z-10" />
                  <div className={`sm:w-1/2 ml-12 sm:ml-0 ${idx % 2 === 0 ? 'sm:pr-12' : 'sm:pl-12'}`}>
                    <div className="bg-white rounded-2xl p-5 shadow-sm border border-gray-100">
                      <div className="text-brand-orange-500 font-bold text-sm">{m.year}</div>
                      <div className="text-lg font-bold text-brand-dark mt-1">{m.title}</div>
                      <div className="text-sm text-gray-600 mt-2">{m.desc}</div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-16 bg-gradient-to-r from-brand-orange-500 to-brand-orange-600">
        <div className="container-custom text-center text-white">
          <h2 className="text-3xl sm:text-4xl font-bold">Ready to Start Your Journey?</h2>
          <p className="mt-3 text-white/90 text-lg">Join 10 million+ travelers who trust ReservationKart</p>
          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <Link href="/flights"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white text-brand-orange-600 font-bold hover:bg-gray-50 shadow-lg">
              <Plane className="h-5 w-5" /> Search Flights
            </Link>
            <a href="tel:+18000000000"
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-xl bg-white/20 backdrop-blur-sm text-white font-bold hover:bg-white/30">
              <Phone className="h-5 w-5" /> Call Us Now
            </a>
          </div>
        </div>
      </section>
    </div>
  );
}