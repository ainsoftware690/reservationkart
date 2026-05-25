// Server Component — renders JSON-LD for Google Knowledge Panel
export default function OrganizationSchema() {
  const schema = {
    '@context': 'https://schema.org',
    '@type':    'TravelAgency',
    name:       'ReservationKart',
    url:        'https://reservationkart.com',
    logo:       'https://reservationkart.com/logo.webp',
    description:'Book flights, hotels, and holiday packages at lowest prices with 24/7 expert support.',
    telephone:  '+1-800-222-8888',
    email:      'support@reservationkart.com',
    address: {
      '@type':           'PostalAddress',
      streetAddress:     '350 Fifth Avenue',
      addressLocality:   'New York',
      addressRegion:     'NY',
      postalCode:        '10118',
      addressCountry:    'US',
    },
    sameAs: [
      'https://facebook.com/reservationkart',
      'https://twitter.com/reservationkart',
      'https://instagram.com/reservationkart',
      'https://linkedin.com/company/reservationkart',
    ],
    openingHoursSpecification: {
      '@type':     'OpeningHoursSpecification',
      dayOfWeek:   ['Monday','Tuesday','Wednesday','Thursday','Friday','Saturday','Sunday'],
      opens:       '00:00',
      closes:      '23:59',
    },
    priceRange:  '$$',
    areaServed:  'Worldwide',
    currenciesAccepted: 'USD, INR, EUR, GBP, AED, CAD',
    paymentAccepted:    'Credit Card, Debit Card, PayPal, Apple Pay, Google Pay',
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}