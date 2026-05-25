'use client';

import { useState } from 'react';
import { Mail, Send, CheckCircle, Sparkles, Plane, Tag, Gift } from 'lucide-react';

const BENEFITS = [
  { icon: Tag,      text: 'Exclusive discount codes' },
  { icon: Plane,    text: 'Flash flight deals'       },
  { icon: Gift,     text: 'Birthday surprises'       },
  { icon: Sparkles, text: 'Trip planning tips'       },
];

export default function Newsletter() {
  const [email,     setEmail]     = useState('');
  const [error,     setError]     = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading,   setLoading]   = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!email.trim())                          return setError('Please enter your email');
    if (!/^\S+@\S+\.\S+$/.test(email))         return setError('Enter a valid email address');

    setLoading(true);

    // Simulate API call (future: connect to Mailchimp/ConvertKit/Resend)
    await new Promise((resolve) => setTimeout(resolve, 1200));

    setLoading(false);
    setSubmitted(true);

    // Save to localStorage (future: send to backend)
    try {
      localStorage.setItem('newsletter_subscribed', JSON.stringify({
        email,
        subscribedAt: new Date().toISOString(),
      }));
    } catch (err) {}
  };

  return (
    <section
      className="py-16 sm:py-20 relative overflow-hidden bg-gradient-to-br from-brand-dark via-blue-900 to-brand-dark"
      aria-labelledby="newsletter-heading"
    >
      {/* Decorative blur orbs */}
      <div className="absolute inset-0 opacity-30" aria-hidden="true">
        <div className="absolute top-10 left-1/4 w-96 h-96 rounded-full bg-brand-orange-500 blur-3xl" />
        <div className="absolute bottom-10 right-1/4 w-96 h-96 rounded-full bg-blue-500 blur-3xl" />
      </div>

      {/* Floating decorative icons */}
      <div className="absolute top-10 left-10 text-6xl opacity-10 animate-pulse" aria-hidden="true">✈️</div>
      <div className="absolute bottom-10 right-10 text-6xl opacity-10 animate-bounce" aria-hidden="true">🌍</div>

      <div className="relative container-custom">
        <div className="max-w-3xl mx-auto text-center text-white">

          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-brand-orange-500/20 backdrop-blur-sm border border-brand-orange-500/30">
            <Mail className="h-3.5 w-3.5 text-brand-orange-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-brand-orange-400">
              Travel Newsletter
            </span>
          </div>

          {/* Heading */}
          <h2
            id="newsletter-heading"
            className="mt-4 text-3xl sm:text-4xl md:text-5xl font-bold leading-tight"
          >
            Get Travel Deals
            <span className="block text-brand-orange-400">Before Anyone Else</span>
          </h2>

          <p className="mt-4 text-white/80 text-base sm:text-lg max-w-xl mx-auto">
            Join 250,000+ travelers receiving exclusive flight deals, discount codes, and travel inspiration straight to their inbox.
          </p>

          {/* Form or Success State */}
          <div className="mt-8 max-w-md mx-auto">
            {submitted ? (
              <div className="bg-white/10 backdrop-blur-sm border border-white/20 rounded-2xl p-6 animate-in">
                <CheckCircle className="h-12 w-12 mx-auto text-green-400" />
                <h3 className="mt-3 text-xl font-bold">You're In! 🎉</h3>
                <p className="mt-2 text-sm text-white/80">
                  Welcome to the ReservationKart family! Check your inbox for a welcome gift — a special discount code for your first booking.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit}>
                <div className="flex flex-col sm:flex-row gap-2 p-2 bg-white/10 backdrop-blur-sm rounded-2xl border border-white/20">
                  <div className="relative flex-1">
                    <Mail className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-white/50 pointer-events-none" />
                    <input
                      type="email"
                      value={email}
                      onChange={(e) => { setEmail(e.target.value); setError(''); }}
                      placeholder="your@email.com"
                      disabled={loading}
                      aria-label="Email address"
                      className="w-full pl-12 pr-4 py-3 bg-transparent text-white placeholder-white/50 focus:outline-none disabled:opacity-50"
                    />
                  </div>
                  <button
                    type="submit"
                    disabled={loading}
                    className="inline-flex items-center justify-center gap-2 px-6 py-3 rounded-xl bg-gradient-to-r from-brand-orange-500 to-brand-orange-600 text-white font-bold shadow-xl hover:shadow-2xl active:scale-95 disabled:opacity-60 transition-all"
                  >
                    {loading ? (
                      <>
                        <span className="inline-block w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Subscribing...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" />
                        Subscribe
                      </>
                    )}
                  </button>
                </div>

                {error && (
                  <div className="mt-2 text-sm text-red-300 text-left px-2">
                    {error}
                  </div>
                )}

                <p className="mt-3 text-xs text-white/60">
                  No spam, ever. Unsubscribe with one click. By subscribing you agree to our{' '}
                  <a href="/privacy" className="underline hover:text-white">Privacy Policy</a>.
                </p>
              </form>
            )}
          </div>

          {/* Benefits */}
          <div className="mt-10 grid grid-cols-2 md:grid-cols-4 gap-4">
            {BENEFITS.map(({ icon: Icon, text }) => (
              <div
                key={text}
                className="flex items-center gap-2 p-3 rounded-xl bg-white/5 backdrop-blur-sm border border-white/10"
              >
                <div className="w-8 h-8 rounded-lg bg-brand-orange-500/20 flex items-center justify-center flex-shrink-0">
                  <Icon className="h-4 w-4 text-brand-orange-400" />
                </div>
                <span className="text-xs sm:text-sm font-semibold text-white text-left">
                  {text}
                </span>
              </div>
            ))}
          </div>

          {/* Trust line */}
          <div className="mt-8 flex items-center justify-center gap-2 text-xs text-white/60">
            <span className="flex h-2 w-2">
              <span className="absolute inline-flex h-2 w-2 rounded-full bg-green-400 animate-ping opacity-75" />
              <span className="relative inline-flex h-2 w-2 rounded-full bg-green-400" />
            </span>
            <span>250,000+ subscribers • Weekly emails • Premium content</span>
          </div>
        </div>
      </div>
    </section>
  );
}