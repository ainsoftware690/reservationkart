import { Inter } from 'next/font/google';
import './globals.css';
import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import { CurrencyProvider } from '../contexts/CurrencyContext';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
});

export const metadata = {
  title: {
    default: 'ReservationKart — Book Cheap Flights, Hotels & Holidays',
    template: '%s | ReservationKart',

  },
  description: 'Book domestic and international flights at lowest prices.',
  metadataBase: new URL('https://reservationkart.com'),
  icons: {
    icon: "/images/icon.webp",
  },
};

export const viewport = {
  themeColor: '#F26522',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={inter.variable}>
      <body className="font-sans antialiased bg-white text-brand-dark">
        <CurrencyProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
        </CurrencyProvider>
      </body>
    </html>
  );
}