import Link from 'next/link';
import { Phone, Mail } from 'lucide-react';

export const metadata = {
  title: 'Refund & Cancellation Policy | ReservationKart',
  description: 'Understand ReservationKart\'s refund and cancellation policy for flight bookings.',
};

const SECTIONS = [
  {
    title: 'Cancellation of Bookings',
    intro: "Cancellations for flight bookings are subject to the fare rules and policies of the airline operating the flight. Please review the specific terms at the time of booking.",
    points: [
      { heading: 'Airline Policies', text: "Each airline has its own cancellation policy, which may include fees or restrictions. ReservationKart will process cancellations in accordance with the airline's rules." },
      { heading: 'Timeframes', text: 'Cancellations must be requested within the timeframes specified by the airline. Some tickets may be non-refundable or subject to penalties.' },
      { heading: 'Service Fees', text: 'ReservationKart may charge a non-refundable service fee for processing cancellations, as outlined during the booking process.' },
    ],
  },
  {
    title: 'Refund Eligibility',
    intro: "Refunds are processed based on the airline's fare rules and the type of ticket purchased. Common scenarios include:",
    points: [
      { heading: 'Refundable Tickets', text: 'If your ticket is refundable, you may receive a full or partial refund, minus any applicable airline penalties or ReservationKart service fees.' },
      { heading: 'Non-Refundable Tickets', text: 'Non-refundable tickets may not qualify for a cash refund but could be eligible for a travel credit, subject to airline policies.' },
      { heading: 'Airline-Initiated Changes', text: 'If an airline cancels or significantly changes your flight (e.g., schedule changes), you may be eligible for a full refund or alternative travel options.' },
    ],
  },
  {
    title: 'How to Request a Cancellation or Refund',
    intro: 'To request a cancellation or refund, please follow these steps:',
    points: [
      { text: 'Contact our customer support team via email at info@reservationkart.com or by phone at +1-800-222-8888.' },
      { text: 'Provide your booking reference number and details of your request.' },
      { text: "Our team will review your request and inform you of the airline's policy, applicable fees, and refund eligibility." },
    ],
    footer: 'Refund processing times vary depending on the airline and payment method, typically taking 7–21 business days after approval.',
  },
  {
    title: 'ReservationKart Service Fees',
    text: 'ReservationKart may charge service fees for processing cancellations or refunds, which are non-refundable. These fees are disclosed during the booking process and depend on the complexity of the request.',
  },
  {
    title: 'No-Show Policy',
    text: 'If you fail to check in or board your flight without cancelling in advance (a "no-show"), your ticket may become non-refundable, and no travel credits may be issued, per the airline\'s policy.',
  },
  {
    title: 'Special Circumstances',
    text: 'In certain cases, such as medical emergencies or bereavement, airlines may offer exceptions to their standard policies. Please contact our support team with relevant documentation, and we will assist in coordinating with the airline.',
  },
  {
    title: 'Changes to This Policy',
    text: 'We may update this Refund and Cancellation Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically.',
  },
];

const QUICK_STATS = [
  { value: '7–21',   label: 'Business days for refund',    color: 'bg-blue-100 text-blue-700'   },
  { value: '$10',    label: 'Flat cancellation service fee',color: 'bg-orange-100 text-orange-700'},
  { value: '24/7',   label: 'Support available',           color: 'bg-green-100 text-green-700'  },
  { value: '100%',   label: 'Airline policy transparency', color: 'bg-purple-100 text-purple-700'},
];

export default function RefundPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-dark py-12 sm:py-16 text-white text-center">
        <div className="container-custom">
          <h1 className="text-3xl sm:text-4xl font-bold">Refund & Cancellation Policy</h1>
          <p className="mt-2 text-white/70">Last Updated: January 1, 2025</p>
          <p className="mt-3 text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
            At ReservationKart, we strive to provide a seamless experience for booking airline
            services. This policy outlines the terms for cancelling bookings and requesting
            refunds for services booked through{' '}
            <span className="text-brand-orange-400 font-semibold">reservationkart.com</span>.
          </p>
        </div>
      </div>

      <div className="container-custom max-w-4xl py-12">

        {/* Quick Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-8">
          {QUICK_STATS.map((stat) => (
            <div
              key={stat.label}
              className={`rounded-2xl p-4 text-center ${stat.color}`}
            >
              <div className="text-2xl font-bold">{stat.value}</div>
              <div className="text-xs font-semibold mt-1 opacity-90 leading-tight">
                {stat.label}
              </div>
            </div>
          ))}
        </div>

        {/* Info banner */}
        <div className="bg-green-50 border border-green-200 rounded-2xl p-5 mb-8">
          <p className="text-sm text-green-800">
            <strong>By using our services, you agree to the terms of this policy.</strong>{' '}
            We always work on your behalf to get the best possible outcome from airlines
            during cancellations and refund requests.
          </p>
        </div>

        {/* Sections */}
        <div className="space-y-6">
          {SECTIONS.map((section, idx) => (
            <div
              key={section.title}
              className="bg-white rounded-2xl shadow-sm p-6 border border-gray-100"
            >
              <h2 className="text-xl font-bold text-brand-dark mb-4 flex items-center gap-3">
                <span className="w-8 h-8 rounded-full bg-brand-orange-100 text-brand-orange-600 flex items-center justify-center text-sm font-bold flex-shrink-0">
                  {idx + 1}
                </span>
                {section.title}
              </h2>

              {section.intro && (
                <p className="text-gray-700 font-medium mb-3">{section.intro}</p>
              )}

              {section.text && (
                <p className="text-gray-600 leading-relaxed">{section.text}</p>
              )}

              {section.points && (
                <ul className="space-y-3">
                  {section.points.map((point, pIdx) => (
                    <li key={pIdx} className="flex items-start gap-3">
                      <span className="mt-1.5 w-2 h-2 rounded-full bg-brand-orange-500 flex-shrink-0" />
                      <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
                        {point.heading && (
                          <strong className="text-brand-dark">{point.heading}: </strong>
                        )}
                        {point.text}
                      </p>
                    </li>
                  ))}
                </ul>
              )}

              {section.footer && (
                <div className="mt-4 pt-3 border-t border-gray-100">
                  <p className="text-sm text-brand-orange-700 font-semibold bg-brand-orange-50 px-4 py-2 rounded-lg">
                    ⏱ {section.footer}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>

        {/* Contact CTA */}
        <div className="mt-8 bg-gradient-to-br from-brand-dark to-blue-900 rounded-2xl p-6 sm:p-8 text-white">
          <h3 className="text-xl sm:text-2xl font-bold">Need Help with a Cancellation?</h3>
          <p className="mt-2 text-white/80">
            Our support team is available 24/7 to assist you with cancellations,
            refunds, and any booking-related queries.
          </p>
          <div className="mt-5 flex flex-wrap gap-3">
            <a
              href="tel:+1 8002345245"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-brand-orange-500 text-white font-bold hover:bg-brand-orange-600 transition-colors"
            >
              <Phone className="h-4 w-4" />
               +1 8002345245
            </a>
            
             <a href="mailto:info@reservationkart.com"
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-white/10 backdrop-blur-sm text-white font-bold hover:bg-white/20 transition-colors"
            >
              <Mail className="h-4 w-4" />
              info@reservationkart.com
            </a>
          </div>
        </div>

        {/* Related links */}
        <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm">
          <Link href="/terms"   className="text-brand-orange-600 font-semibold hover:underline">
            Terms & Conditions
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/privacy" className="text-brand-orange-600 font-semibold hover:underline">
            Privacy Policy
          </Link>
          <span className="text-gray-300">|</span>
          <Link href="/contact" className="text-brand-orange-600 font-semibold hover:underline">
            Contact Support
          </Link>
        </div>
      </div>
    </div>
  );
}