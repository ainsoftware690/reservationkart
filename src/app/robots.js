// Next.js automatically serves this at /robots.txt

export default function robots() {
  return {
    rules: [
      {
        userAgent: '*',
        allow:     '/',
        disallow: [
          '/flights/booking',     // Don't index checkout pages
          '/flights/confirmation',// Don't index personal pages
          '/api/',                // Don't index API routes
          '/_next/',              // Next.js internals
        ],
      },
      {
        // Block AI scrapers
        userAgent: ['GPTBot', 'ChatGPT-User', 'CCBot', 'anthropic-ai'],
        disallow:  '/',
      },
    ],
    sitemap: 'https://reservationkart.com/sitemap.xml',
    host:    'https://reservationkart.com',
  };
}