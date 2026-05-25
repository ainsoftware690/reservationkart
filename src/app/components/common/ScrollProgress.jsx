'use client';

import { useState, useEffect, useCallback } from 'react';
import { ArrowUp } from 'lucide-react';

export default function ScrollProgress() {
  const [scrollProgress, setScrollProgress] = useState(0);
  const [showButton,     setShowButton]     = useState(false);

  // Throttled scroll handler — runs at most once per frame
  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          const winScroll  = document.documentElement.scrollTop || document.body.scrollTop;
          const height     = document.documentElement.scrollHeight - document.documentElement.clientHeight;
          const scrolled   = height > 0 ? (winScroll / height) * 100 : 0;

          setScrollProgress(scrolled);
          setShowButton(winScroll > 400);
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial calculation

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToTop = useCallback(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  }, []);

  return (
    <>
      {/* Scroll progress bar — fixed at top */}
      <div
        className="fixed top-0 left-0 right-0 h-1 z-[60] pointer-events-none"
        aria-hidden="true"
      >
        <div
          className="h-full bg-gradient-to-r from-brand-orange-500 via-brand-orange-400 to-brand-orange-600 transition-[width] duration-150 ease-out shadow-lg shadow-brand-orange-500/30"
          style={{ width: `${scrollProgress}%` }}
        />
      </div>

      {/* Back to top button */}
      <button
        type="button"
        onClick={scrollToTop}
        aria-label="Scroll to top"
        className={`fixed bottom-24 left-6 z-30 w-12 h-12 rounded-full bg-white border-2 border-brand-orange-500 text-brand-orange-500 shadow-xl flex items-center justify-center transition-all duration-300 hover:bg-brand-orange-500 hover:text-white hover:scale-110 active:scale-95 ${
          showButton
            ? 'opacity-100 translate-y-0'
            : 'opacity-0 translate-y-10 pointer-events-none'
        }`}
      >
        {/* Circular progress ring */}
        <svg
          className="absolute inset-0 w-full h-full -rotate-90 pointer-events-none"
          viewBox="0 0 48 48"
        >
          <circle
            cx="24" cy="24" r="22"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            opacity="0.2"
          />
          <circle
            cx="24" cy="24" r="22"
            stroke="currentColor"
            strokeWidth="2"
            fill="none"
            strokeDasharray={`${(scrollProgress / 100) * 138.23} 138.23`}
            strokeLinecap="round"
          />
        </svg>
        <ArrowUp className="h-5 w-5 relative" />
      </button>
    </>
  );
}