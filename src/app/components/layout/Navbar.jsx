'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Image from 'next/image';
import { Menu, X, Phone, User } from 'lucide-react';
import { NAV_LINKS, SITE_CONFIG } from '../../../lib/constants';
import CurrencySwitcher from './CurrencySwitcher';

export default function Navbar() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isScrolled,       setIsScrolled]       = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 10);
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = isMobileMenuOpen ? 'hidden' : '';
    return () => { document.body.style.overflow = ''; };
  }, [isMobileMenuOpen]);

  const closeMenu = useCallback(() => setIsMobileMenuOpen(false), []);

  return (
    <header
      className={`sticky top-0 z-50 w-full transition-all duration-300 ${
        isScrolled ? 'bg-white/95 backdrop-blur-md shadow-sm' : 'bg-white'
      }`}
    >
      <nav
        className="container-custom flex h-16 items-center justify-between md:h-20"
        aria-label="Main navigation"
      >
        {/* Logo */}
        <Link href="/" className="flex items-center" aria-label={`${SITE_CONFIG.name} Home`}>
          <Image
            src="/images/logo.webp"
            alt={SITE_CONFIG.name}
            width={200}
            height={50}
            priority
            className="h-10 w-auto md:h-12"
          />
        </Link>

        {/* Desktop Nav */}
        <ul className="hidden lg:flex items-center gap-8">
          {NAV_LINKS.map((link) => (
            <li key={link.href}>
              <Link
                href={link.href}
                className="text-sm font-medium text-brand-dark hover:text-brand-orange-500 transition-colors"
              >
                {link.label}
              </Link>
            </li>
          ))}
        </ul>

        {/* Right actions */}
        <div className="flex items-center gap-2 sm:gap-3">

          {/* ✅ CURRENCY SWITCHER — Desktop */}
          <div className="hidden md:block">
            <CurrencySwitcher />
          </div>

          {/* Phone */}
          <a
            href={`tel:${SITE_CONFIG.phone}`}
            className="hidden lg:flex items-center gap-2 text-sm font-semibold text-brand-orange-500 hover:text-brand-orange-600 transition-colors"
          >
            <Phone className="h-4 w-4" />
            <span>{SITE_CONFIG.phone}</span>
          </a>

          {/* Login */}
          <Link
            href="/login"
            className="hidden md:inline-flex items-center gap-2 rounded-lg border border-gray-200 px-4 py-2 text-sm font-semibold text-brand-dark hover:border-brand-orange-500 hover:text-brand-orange-500 transition-colors"
          >
            <User className="h-4 w-4" />
            Login
          </Link>

          {/* ✅ CURRENCY SWITCHER — Mobile (compact) */}
          <div className="md:hidden">
            <CurrencySwitcher compact />
          </div>

          {/* Mobile menu toggle */}
          <button
            type="button"
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            className="lg:hidden inline-flex items-center justify-center rounded-md p-2 text-brand-dark"
            aria-label="Toggle menu"
            aria-expanded={isMobileMenuOpen}
          >
            {isMobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
          </button>
        </div>
      </nav>

      {/* Mobile Menu */}
      {isMobileMenuOpen && (
        <div className="lg:hidden border-t border-gray-100 bg-white">
          <ul className="container-custom py-4 space-y-1">
            {NAV_LINKS.map((link) => (
              <li key={link.href}>
                <Link
                  href={link.href}
                  onClick={closeMenu}
                  className="block rounded-lg px-3 py-3 text-base font-medium text-brand-dark hover:bg-brand-orange-50 hover:text-brand-orange-500"
                >
                  {link.label}
                </Link>
              </li>
            ))}

            <li className="pt-4 mt-2 border-t border-gray-100">
              
              <a  href={`tel:${SITE_CONFIG.phone}`}
                className="flex items-center gap-2 px-3 py-3 font-semibold text-brand-orange-500"
              >
                <Phone className="h-5 w-5" />
                {SITE_CONFIG.phone}
              </a>
              <Link
                href="/login"
                onClick={closeMenu}
                className="flex items-center gap-2 px-3 py-3 font-semibold text-brand-dark"
              >
                <User className="h-5 w-5" />
                Login / Signup
              </Link>
            </li>
          </ul>
        </div>
      )}
    </header>
  );
}