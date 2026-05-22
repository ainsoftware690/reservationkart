'use client';

import { useState, useMemo, useId } from 'react';
import { ChevronDown, Search, HelpCircle, X, Phone, Mail, MessageCircle } from 'lucide-react';
import { FAQS, FAQ_CATEGORIES } from '../../../lib/faq';
import { SITE_CONFIG } from '../../../lib/constants';

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('all');
  const [searchQuery,    setSearchQuery]    = useState('');
  const [openItems,      setOpenItems]      = useState(new Set([1])); 

  // Filter logic — memoized for performance
  const filteredFaqs = useMemo(() => {
    let result = FAQS;

    if (activeCategory !== 'all') {
      result = result.filter((faq) => faq.category === activeCategory);
    }

    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase().trim();
      result = result.filter(
        (faq) =>
          faq.question.toLowerCase().includes(q) ||
          faq.answer.toLowerCase().includes(q)
      );
    }

    return result;
  }, [activeCategory, searchQuery]);

  const toggleItem = (id) => {
    setOpenItems((prev) => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  // SEO Schema.org JSON-LD — Google rich results
  const schemaData = {
    '@context': 'https://schema.org',
    '@type':    'FAQPage',
    mainEntity: FAQS.map((faq) => ({
      '@type': 'Question',
      name:    faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text:    faq.answer,
      },
    })),
  };

  return (
    <section
      className="py-16 sm:py-20 bg-gradient-to-b from-white to-gray-50"
      aria-labelledby="faq-heading"
    >
      {/* SEO: structured data for Google */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(schemaData) }}
      />

      <div className="container-custom">
        {/* ============ HEADER ============ */}
        <div className="text-center max-w-2xl mx-auto mb-10">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-brand-orange-100 text-xs font-bold uppercase tracking-wider text-brand-orange-700">
            <HelpCircle className="h-3.5 w-3.5" />
            Help Center
          </div>
          <h2
            id="faq-heading"
            className="mt-3 text-3xl sm:text-4xl font-bold text-brand-dark"
          >
            Frequently Asked Questions
          </h2>
          <p className="mt-3 text-gray-600">
            Everything you need to know about booking, payments, and travel.
            Can't find the answer? Our 24/7 support team is here to help.
          </p>
        </div>

        {/* ============ SEARCH BAR ============ */}
        <div className="max-w-2xl mx-auto mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400 pointer-events-none" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search for answers..."
              aria-label="Search FAQs"
              className="w-full pl-12 pr-12 py-4 rounded-2xl border-2 border-gray-200 bg-white shadow-sm focus:border-brand-orange-500 focus:outline-none focus:ring-4 focus:ring-brand-orange-100 transition-all text-base"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                aria-label="Clear search"
                className="absolute right-4 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-gray-100 text-gray-400 hover:text-gray-600"
              >
                <X className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>

        {/* ============ CATEGORY TABS ============ */}
        <div className="flex flex-wrap items-center justify-center gap-2 mb-8">
          {FAQ_CATEGORIES.map((cat) => {
            const isActive = activeCategory === cat.id;
            return (
              <button
                key={cat.id}
                type="button"
                onClick={() => setActiveCategory(cat.id)}
                aria-pressed={isActive}
                className={`px-4 py-2 rounded-full text-sm font-semibold transition-all ${
                  isActive
                    ? 'bg-brand-orange-500 text-white shadow-md'
                    : 'bg-white text-gray-700 border border-gray-200 hover:border-brand-orange-300 hover:text-brand-orange-600'
                }`}
              >
                {cat.label}
              </button>
            );
          })}
        </div>

        {/* ============ FAQ LIST ============ */}
        <div className="max-w-3xl mx-auto">
          {filteredFaqs.length === 0 ? (
            <EmptyState onClear={() => { setSearchQuery(''); setActiveCategory('all'); }} />
          ) : (
            <ul className="space-y-3" role="list">
              {filteredFaqs.map((faq) => (
                <FAQItem
                  key={faq.id}
                  faq={faq}
                  isOpen={openItems.has(faq.id)}
                  onToggle={() => toggleItem(faq.id)}
                />
              ))}
            </ul>
          )}
        </div>

        {/* ============ STILL NEED HELP CTA ============ */}
        <div className="mt-12 max-w-3xl mx-auto bg-gradient-to-br from-brand-orange-500 to-brand-orange-600 rounded-2xl p-6 sm:p-8 text-white shadow-xl">
          <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4">
            <div>
              <h3 className="text-xl sm:text-2xl font-bold">Still have questions?</h3>
              <p className="mt-1 text-white/90 text-sm">
                Our support team is available 24/7 to help with anything you need.
              </p>
            </div>
            <div className="flex flex-wrap gap-2">
              
              <a href={`tel:${SITE_CONFIG.phone}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white text-brand-orange-600 font-bold text-sm hover:bg-gray-50 transition-colors"
              >
                <Phone className="h-4 w-4" />
                Call
              </a>
              
               <a href={`mailto:${SITE_CONFIG.email}`}
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/20 backdrop-blur-sm text-white font-bold text-sm hover:bg-white/30 transition-colors"
              >
                <Mail className="h-4 w-4" />
                Email
              </a>
              
                <a href="/chat"
                className="inline-flex items-center gap-2 px-4 py-2.5 rounded-lg bg-white/20 backdrop-blur-sm text-white font-bold text-sm hover:bg-white/30 transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
                Chat
              </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

/* ==========================================================
   Single FAQ Item with smooth accordion animation
   ========================================================== */
function FAQItem({ faq, isOpen, onToggle }) {
  const headingId = useId();
  const panelId   = useId();

  return (
    <li className="bg-white rounded-2xl border border-gray-200 hover:border-brand-orange-300 shadow-sm transition-colors overflow-hidden">
      <h3>
        <button
          type="button"
          id={headingId}
          aria-expanded={isOpen}
          aria-controls={panelId}
          onClick={onToggle}
          className="w-full flex items-center justify-between gap-4 px-5 py-4 sm:px-6 sm:py-5 text-left group"
        >
          <span className="text-base sm:text-lg font-bold text-brand-dark group-hover:text-brand-orange-600 transition-colors">
            {faq.question}
          </span>
          <span
            className={`flex-shrink-0 w-8 h-8 rounded-full bg-brand-orange-50 flex items-center justify-center transition-all ${
              isOpen ? 'bg-brand-orange-500 rotate-180' : ''
            }`}
            aria-hidden="true"
          >
            <ChevronDown
              className={`h-4 w-4 transition-colors ${
                isOpen ? 'text-white' : 'text-brand-orange-500'
              }`}
            />
          </span>
        </button>
      </h3>

      {/* Animated accordion panel using grid-rows-[0fr/1fr] trick — better than max-height */}
      <div
        id={panelId}
        role="region"
        aria-labelledby={headingId}
        className={`grid transition-all duration-300 ease-in-out ${
          isOpen ? 'grid-rows-[1fr] opacity-100' : 'grid-rows-[0fr] opacity-0'
        }`}
      >
        <div className="overflow-hidden">
          <div className="px-5 pb-5 sm:px-6 sm:pb-6 text-sm sm:text-base text-gray-600 leading-relaxed">
            {faq.answer}
          </div>
        </div>
      </div>
    </li>
  );
}

/* ==========================================================
   Empty state — when search finds nothing
   ========================================================== */
function EmptyState({ onClear }) {
  return (
    <div className="text-center py-12 bg-white rounded-2xl border border-gray-200">
      <Search className="mx-auto h-12 w-12 text-gray-300" />
      <h3 className="mt-4 text-lg font-bold text-brand-dark">No matching questions found</h3>
      <p className="mt-2 text-sm text-gray-600 max-w-sm mx-auto">
        Try different keywords, or browse all categories to find what you're looking for.
      </p>
      <button
        type="button"
        onClick={onClear}
        className="mt-4 px-5 py-2 rounded-lg bg-brand-orange-500 text-white text-sm font-bold hover:bg-brand-orange-600 transition-colors"
      >
        Clear Search
      </button>
    </div>
  );
}