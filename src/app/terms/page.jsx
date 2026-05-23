import Link from 'next/link';

export const metadata = {
  title: 'Terms and Conditions | ReservationKart',
  description: 'Read the Terms and Conditions governing the use of ReservationKart services.',
};

const SECTIONS = [
  {
    title: 'Use of Our Services',
    intro: 'ReservationKart provides a platform for booking airline tickets and related travel services. You agree to:',
    points: [
      { text: 'Use our services only for lawful purposes and in accordance with these Terms.' },
      { text: 'Provide accurate and complete information when making bookings.' },
      { text: 'Be responsible for maintaining the confidentiality of your account credentials.' },
    ],
  },
  {
    title: 'Booking and Payment',
    intro: 'When you book through ReservationKart:',
    points: [
      { text: 'All bookings are subject to availability and confirmation by the respective airline.' },
      { text: 'Prices displayed are subject to change until the booking is confirmed.' },
      { text: 'Payments must be made using a valid payment method accepted by ReservationKart. You authorize us to charge the total amount, including taxes, fees, and surcharges.' },
      { text: "Bookings are governed by the fare rules and policies of the operating airline, which you should review at the time of booking." },
    ],
  },
  {
    title: 'Cancellations and Refunds',
    text: "Cancellations and refunds are subject to the airline's policies. ReservationKart is not responsible for changes or cancellations initiated by airlines, though we will assist in coordinating solutions.",
  },
  {
    title: 'Travel Documentation',
    intro: 'You are responsible for:',
    points: [
      { text: 'Ensuring you have valid travel documents (e.g., passports, visas, or health certificates) required for your travel.' },
      { text: 'Complying with all airline, airport, and destination country regulations.' },
      { text: 'Verifying flight details, including dates, times, and destinations, prior to travel.' },
    ],
    footer: 'ReservationKart is not liable for any issues arising from incomplete or invalid travel documentation.',
  },
  {
    title: 'Limitation of Liability',
    intro: 'To the fullest extent permitted by law:',
    points: [
      { text: 'ReservationKart is not liable for any indirect, incidental, or consequential damages arising from your use of our services.' },
      { text: 'We are not responsible for disruptions, delays, or cancellations caused by airlines, weather, or other factors beyond our control.' },
      { text: 'Our liability is limited to the amount paid for the services in question.' },
    ],
  },
  {
    title: 'Intellectual Property',
    text: 'All content on our website, including text, images, logos, and software, is the property of ReservationKart or its licensors and is protected by intellectual property laws. You may not reproduce, distribute, or modify any content without prior written consent.',
  },
  {
    title: 'Third-Party Services',
    text: 'Our website may integrate with third-party services, such as airline booking systems or payment processors. ReservationKart is not responsible for the content, policies, or performance of these third parties.',
  },
  {
    title: 'Prohibited Conduct',
    intro: 'You agree not to:',
    points: [
      { text: 'Use our services for fraudulent or illegal activities.' },
      { text: 'Attempt to gain unauthorized access to our systems or data.' },
      { text: 'Interfere with the functionality or security of our website.' },
    ],
  },
  {
    title: 'Governing Law',
    text: 'These Terms and Conditions are governed by the laws of the State of New York, USA, without regard to its conflict of law principles. Any disputes arising from these terms will be resolved in the state or federal courts located in New York, NY.',
  },
];

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-dark py-12 sm:py-16 text-white text-center">
        <div className="container-custom">
          <h1 className="text-3xl sm:text-4xl font-bold">Terms and Conditions</h1>
          <p className="mt-2 text-white/70">Last Updated: January 1, 2025</p>
          <p className="mt-3 text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
            Welcome to ReservationKart. These Terms and Conditions govern your use of our website
            and airline reservation services. By accessing or using our services, you agree to be
            bound by these terms.
          </p>
        </div>
      </div>

      <div className="container-custom max-w-4xl py-12">
        {/* Warning banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5 mb-8">
          <p className="text-sm text-amber-800">
            <strong>Important:</strong> Please read these terms carefully before booking. By
            completing a booking, you agree to be bound by these terms and conditions. If you
            do not agree, please do not use our website or services.
          </p>
        </div>

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
                <p className="mt-4 text-sm text-gray-500 italic border-t border-gray-100 pt-3">
                  {section.footer}
                </p>
              )}
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Questions about these terms?{' '}
            <Link
              href="/contact"
              className="text-brand-orange-600 font-semibold hover:underline"
            >
              Contact our Legal Team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}