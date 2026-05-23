export const SITE_CONFIG = {
  name: 'ReservationKart',
  domain: 'reservationkart.com',
  tagline: 'Your dream travel just a phone call away!',
  location: ' 30 Summer St Hagerstown , Maryland 21740',
  description: 'Book flights, hotels and holidays at lowest prices with 24/7 expert support.',
  phone: '+1 8002345245 / 8007558156',       
  email: ' Info@reservationdeskllc.com',
  social: {
    facebook: 'https://facebook.com/reservationkart',
    twitter: 'https://twitter.com/reservationkart',
    instagram: 'https://instagram.com/reservationkart',
    linkedin: 'https://linkedin.com/company/reservationkart',
  },
};

export const NAV_LINKS = [
  { label: 'Flights', href: '/flights' },
  { label: 'Hotels', href: '/hotels' },
  { label: 'Holidays', href: '/holidays' },
  { label: 'Offers', href: '/offers' },
  { label: 'About', href: '/about' },
];

export const FOOTER_LINKS = {
  company:  [
    { label: 'About Us', href: '/about' },
    { label: 'Contact', href: '/contact' },
    { label: 'Careers', href: '/careers' },
    { label: 'Blog', href: '/blog' },
  ],
  support:  [
    { label: 'Help Center', href: '/contact' },
    { label: 'FAQs', href: '#faqs' },
    { label: 'Booking Status', href: '/booking-status' },
    { label: 'Cancellation', href: '/cancellation' },
  ],
  services: [
    { label: 'Flight Booking', href: '/flights' },
    { label: 'Hotel Booking', href: '/hotels' },
    { label: 'Holiday Packages', href: '/holidays' },
    { label: 'Visa Assistance', href: '/visa' },
  ],
  legal:    [
    { label: 'Privacy Policy', href: '/privacy' },
    { label: 'Terms of Service', href: '/terms' },
    { label: 'Refund Policy', href: '/refund' },
    { label: 'Cookie Policy', href: '/cookies' },
  ],
};

// Destination data for "Top Destination section "
export const DESTINATIONS = [
  {
    city: "Albany",
    code: "ALB",
    country: "United States",
    img: "https://images.unsplash.com/photo-1496442226666-8d4d0e62e6e9?w=600&q=80",
  },
  {
    city: "Houston",
    code: "IAH",
    country: "United States",
    img: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=600&q=80",
  },
  {
    city: "Las Vegas",
    code: "LAS",
    country: "United States",
    img: "https://images.unsplash.com/photo-1581351721010-8cf859cb14a4?w=600&q=80",
  },
  {
    city: "El Paso",
    code: "ELP",
    country: "United States",
    img: "https://images.unsplash.com/photo-1469854523086-cc02fe5d8800?w=600&q=80",
  },
  {
    city: "Aurora",
    code: "AUR",
    country: "United States",
    img: "https://images.unsplash.com/photo-1531366936337-7c912a4589a7?w=600&q=80",
  },
];

// Trending routes data for "Trending routes section"
export const TRENDING_ROUTES = [
  {
    id: 1,
    from: "Denver",
    to: "Las Vegas",
    country: "United States",
    badge: "Top Rated",
    badgeClass: "from-amber-500 to-orange-500",
    price: "$149",
    duration: "2h 15m",
    img: "https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=800&q=80",
  },
  {
    id: 2,
    from: "Los Angeles",
    to: "San Francisco",
    country: "United States",
    badge: "Best Sale",
    badgeClass: "from-emerald-500 to-teal-600",
    price: "$89",
    duration: "1h 20m",
    img: "https://images.unsplash.com/photo-1501594907352-04cda38ebc29?w=800&q=80",
  },
  {
    id: 3,
    from: "Miami",
    to: "Orlando",
    country: "United States",
    badge: "25% Off",
    badgeClass: "from-rose-500 to-pink-600",
    price: "$67",
    duration: "1h 05m",
    img: "https://images.unsplash.com/photo-1533106497176-45ae19e68ba2?w=800&q=80",
  },
];