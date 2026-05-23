import Link from 'next/link';

export const metadata = {
  title: 'Privacy Policy | ReservationKart',
  description: 'Learn how ReservationKart collects, uses, and protects your personal information.',
};

const SECTIONS = [
  {
    title: 'Information We Collect',
    points: [
      { heading: 'Personal Information', text: 'When you book flights or interact with our services, we may collect your name, email address, phone number, passport details, date of birth, payment information, and other details necessary for travel reservations.' },
      { heading: 'Travel Preferences', text: 'Information about your travel preferences, such as seat selection, meal preferences, or frequent flyer details.' },
      { heading: 'Usage Data', text: 'Information about how you interact with our website, including IP addresses, browser type, device information, pages visited, and time spent on the site.' },
      { heading: 'Cookies and Tracking Technologies', text: 'We use cookies and similar technologies to enhance your experience, analyze website performance, and deliver personalized content. You can manage cookie preferences through your browser settings.' },
    ],
  },
  {
    title: 'How We Use Your Information',
    points: [
      { text: 'Process and manage your flight bookings and related services.' },
      { text: 'Communicate with you about your reservations, updates, or customer support inquiries.' },
      { text: 'Improve our website and services through analytics and user feedback.' },
      { text: 'Send promotional offers, newsletters, or travel-related updates (you may opt out at any time).' },
      { text: 'Comply with legal obligations, such as sharing information with airlines or regulatory authorities for travel purposes.' },
    ],
  },
  {
    title: 'How We Share Your Information',
    points: [
      { heading: 'Airlines and Travel Partners', text: 'To facilitate your bookings, we share necessary details with airlines, airports, or other travel service providers.' },
      { heading: 'Payment Processors', text: 'To securely process your payments, we work with trusted third-party payment providers.' },
      { heading: 'Service Providers', text: 'We may engage third-party vendors for website hosting, analytics, or customer support, who are bound by confidentiality agreements.' },
      { heading: 'Legal Authorities', text: 'When required by law, we may disclose your information to comply with legal processes or protect our rights.' },
    ],
  },
  {
    title: 'Data Security',
    text: 'We implement industry-standard security measures, such as encryption and secure servers, to protect your personal information. However, no online platform can guarantee complete security, and you share information at your own risk.',
  },
  {
    title: 'Your Rights and Choices',
    points: [
      { heading: 'Access and Update', text: 'You can request access to or correction of your personal information by contacting us.' },
      { heading: 'Opt-Out', text: 'You may unsubscribe from marketing emails or adjust cookie settings in your browser.' },
      { heading: 'Deletion', text: 'You can request the deletion of your data, subject to legal or contractual obligations (e.g., travel records required by airlines).' },
    ],
  },
  {
    title: 'International Data Transfers',
    text: 'As an airline services provider, your information may be transferred to and processed in countries other than your own to facilitate travel. We ensure such transfers comply with applicable data protection laws.',
  },
  {
    title: "Children's Privacy",
    text: 'Our services are not intended for individuals under 18. We do not knowingly collect personal information from children without parental consent. If you believe we have collected such information, please contact us immediately.',
  },
  {
    title: 'Third-Party Links',
    text: 'Our website may contain links to third-party sites, such as airline booking portals. We are not responsible for the privacy practices of these sites and encourage you to review their policies.',
  },
  {
    title: 'Changes to This Privacy Policy',
    text: 'We may update this Privacy Policy from time to time. Changes will be posted on this page with an updated "Last Updated" date. We encourage you to review this policy periodically.',
  },
];

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-brand-dark py-12 sm:py-16 text-white text-center">
        <div className="container-custom">
          <h1 className="text-3xl sm:text-4xl font-bold">Privacy Policy</h1>
          <p className="mt-2 text-white/70">Last Updated: January 1, 2025</p>
          <p className="mt-3 text-white/80 max-w-2xl mx-auto text-sm sm:text-base">
            At ReservationKart, we are committed to protecting your privacy. This Privacy Policy
            explains how we collect, use, disclose, and safeguard your personal information when
            you use our website and airline reservation services.
          </p>
        </div>
      </div>

      <div className="container-custom max-w-4xl py-12">
        {/* TL;DR */}
        <div className="bg-blue-50 border border-blue-200 rounded-2xl p-5 mb-8">
          <p className="text-sm text-blue-800">
            <strong>Summary:</strong> We collect your data only to provide travel services,
            protect it with bank-level security, never sell it to third parties, and give you
            full control over it. Questions? Email{' '}
            <a href="mailto:info@reservationkart.com" className="underline font-semibold">
              info@reservationkart.com
            </a>
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

              {/* Simple text */}
              {section.text && (
                <p className="text-gray-600 leading-relaxed">{section.text}</p>
              )}

              {/* Bullet points */}
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
            </div>
          ))}
        </div>

        <div className="mt-8 bg-white rounded-2xl p-6 border border-gray-100 text-center">
          <p className="text-sm text-gray-600">
            Questions about this policy?{' '}
            <Link
              href="/contact"
              className="text-brand-orange-600 font-semibold hover:underline"
            >
              Contact our Privacy Team
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
}