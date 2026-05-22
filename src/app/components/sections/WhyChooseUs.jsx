// Server Component — pure presentation, no interactivity
import {
  Shield, Clock, CreditCard, Headphones,
  Award, Zap, Heart, Globe2,
} from 'lucide-react';

const FEATURES = [
  {
    icon:  Shield,
    title: 'Secure Booking',
    desc:  'Bank-level encryption protects every transaction',
    color: 'text-green-600 bg-green-100',
  },
  {
    icon:  Clock,
    title: '24/7 Support',
    desc:  'Real humans available anytime via phone or chat',
    color: 'text-blue-600 bg-blue-100',
  },
  {
    icon:  CreditCard,
    title: 'Best Price Guarantee',
    desc:  'Find a lower price? We match it instantly',
    color: 'text-purple-600 bg-purple-100',
  },
  {
    icon:  Zap,
    title: 'Instant Confirmation',
    desc:  'Get your tickets within seconds of booking',
    color: 'text-yellow-600 bg-yellow-100',
  },
  {
    icon:  Globe2,
    title: '500+ Airlines',
    desc:  'Compare flights from every major carrier worldwide',
    color: 'text-pink-600 bg-pink-100',
  },
  {
    icon:  Award,
    title: 'Trusted by Millions',
    desc:  'Award-winning service rated 4.8/5 by travelers',
    color: 'text-orange-600 bg-orange-100',
  },
  {
    icon:  Headphones,
    title: 'Expert Travel Help',
    desc:  'Personalized guidance from travel specialists',
    color: 'text-cyan-600 bg-cyan-100',
  },
  {
    icon:  Heart,
    title: 'No Hidden Fees',
    desc:  'Transparent pricing — what you see is what you pay',
    color: 'text-red-600 bg-red-100',
  },
];

const STATS = [
  { value: '10M+', label: 'Happy Travelers' },
  { value: '500+', label: 'Airlines'         },
  { value: '50K+', label: 'Cities Covered'   },
  { value: '4.8',  label: 'Rating'           },
];

export default function WhyChooseUs() {
  return (
    <section
      className="py-16 sm:py-20 bg-white"
      aria-labelledby="features-heading"
    >
      <div className="container-custom">
        {/* Header */}
        <div className="text-center mb-12">
          <span className="text-sm font-bold uppercase tracking-wider text-brand-orange-500">
            Why ReservationKart
          </span>
          <h2
            id="features-heading"
            className="mt-2 text-3xl sm:text-4xl font-bold text-brand-dark"
          >
            Booking Made Simple & Trusted
          </h2>
          <p className="mt-2 text-gray-600 max-w-xl mx-auto">
            Everything you need for stress-free travel, all in one place
          </p>
        </div>

        {/* Features grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
          {FEATURES.map(({ icon: Icon, title, desc, color }) => (
            <div
              key={title}
              className="group p-5 rounded-2xl bg-gray-50 hover:bg-white hover:shadow-lg border border-transparent hover:border-gray-100 transition-all"
            >
              <div
                className={`w-12 h-12 rounded-xl flex items-center justify-center ${color} group-hover:scale-110 transition-transform`}
              >
                <Icon className="h-6 w-6" />
              </div>
              <h3 className="mt-4 text-base font-bold text-brand-dark">
                {title}
              </h3>
              <p className="mt-1 text-sm text-gray-600 leading-relaxed">
                {desc}
              </p>
            </div>
          ))}
        </div>

        {/* Stats banner */}
        <div className="mt-12 sm:mt-16 rounded-3xl bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 p-8 sm:p-10">
          <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 text-center">
            {STATS.map((stat) => (
              <div key={stat.label}>
                <div className="text-3xl sm:text-4xl font-bold text-white">
                  {stat.value}
                </div>
                <div className="mt-1 text-sm font-medium text-white/80">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}