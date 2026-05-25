import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { CurrencyProvider } from '../contexts/CurrencyContext';
import OrganizationSchema from './components/SEO/OrganizationSchema';
import ChatWidget from "./components/chat/ChatWidget";
import CookieConsent from "./components/common/CookieConsent";
import ScrollProgress from "./components/common/ScrollProgress";
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

// ============================================================
// GLOBAL METADATA — All pages inherit this, page-level overrides
// ============================================================
export const metadata = {
  // Default title — page-level will override via template
  title: {
    default: 'ReservationKart — Book Cheap Flights, Hotels & Holidays',
    template: '%s | ReservationKart',
  },
  description:
    'Book domestic and international flights, hotels, and holiday packages at lowest prices. 500+ airlines, 24/7 expert support, instant e-ticket.',
  keywords: [
    'cheap flights', 'book flights online', 'flight booking',
    'international flights', 'domestic flights', 'airline tickets',
    'hotel booking', 'holiday packages', 'travel deals',
    'ReservationKart', 'best flight prices', 'online travel agency',
  ],

  // Canonical base URL — prevents duplicate content
  metadataBase: new URL('https://reservationkart.com'),

  // OpenGraph — WhatsApp, Facebook, LinkedIn previews
  openGraph: {
    type:        'website',
    locale:      'en_US',
    url:         'https://reservationkart.com',
    siteName:    'ReservationKart',
    title:       'ReservationKart — Book Cheap Flights & Hotels',
    description: 'Compare 500+ airlines. Book flights, hotels & holidays at lowest prices. 24/7 expert support.',
    images: [
      {
        url:    '/og-image.jpg',     // Add this image to /public/
        width:  1200,
        height: 630,
        alt:    'ReservationKart — Your Dream Travel',
      },
    ],
  },

  // Twitter/X card
  twitter: {
    card:        'summary_large_image',
    title:       'ReservationKart — Book Cheap Flights',
    description: 'Compare 500+ airlines. Book at lowest prices with 24/7 support.',
    images:      ['/og-image.jpg'],
    creator:     '@reservationkart',
  },

  // Robots — allow all crawlers by default
  robots: {
    index:               true,
    follow:              true,
    googleBot: {
      index:             true,
      follow:            true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet':       -1,
    },
  },

  // Icons
  icons: {
    icon:        '/images/icon.webp',
    shortcut:    '/favicon.ico',
    apple:       '/apple-touch-icon.png',
  },

  // Verification — add these from Google/Bing Search Console
  verification: {
    // google: 'your-google-verification-code',
    // bing:   'your-bing-verification-code',
  },

  // App manifest
  manifest: '/manifest.json',

  // Alternate languages (future)
  alternates: {
    canonical: 'https://reservationkart.com',
  },
};

export const viewport = {
  themeColor:    '#F26522',
  width:         'device-width',
  initialScale:  1,
  maximumScale:  5,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-brand-dark">
        <ChatWidget />
        <OrganizationSchema />
        <CurrencyProvider>
        <ScrollProgress />  
          <Navbar />
          <main id="main-content">{children}</main>
          <Footer />
        </CurrencyProvider>
        <CookieConsent />                 
      </body>
    </html>
  );
}