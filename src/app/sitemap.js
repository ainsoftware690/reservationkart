export default function sitemap() {
  const baseUrl = 'https://reservationkart.com';

  // Static pages
  const staticPages = [
    { url: baseUrl,              priority: 1.0,  changeFrequency: 'daily'   },
    { url: `${baseUrl}/flights`, priority: 0.9,  changeFrequency: 'daily'   },
    { url: `${baseUrl}/hotels`,  priority: 0.9,  changeFrequency: 'daily'   },
    { url: `${baseUrl}/holidays`,priority: 0.8,  changeFrequency: 'weekly'  },
    { url: `${baseUrl}/offers`,  priority: 0.8,  changeFrequency: 'daily'   },
    { url: `${baseUrl}/about`,   priority: 0.6,  changeFrequency: 'monthly' },
    { url: `${baseUrl}/contact`, priority: 0.7,  changeFrequency: 'monthly' },
    { url: `${baseUrl}/privacy`, priority: 0.4,  changeFrequency: 'monthly' },
    { url: `${baseUrl}/terms`,   priority: 0.4,  changeFrequency: 'monthly' },
    { url: `${baseUrl}/refund`,  priority: 0.4,  changeFrequency: 'monthly' },
  ].map((page) => ({
    ...page,
    lastModified: new Date(),
  }));

  // Popular destination routes — high SEO value
  const popularRoutes = [
    { from: 'new-york',   to: 'london',    fromCode: 'JFK', toCode: 'LHR' },
    { from: 'new-york',   to: 'dubai',     fromCode: 'JFK', toCode: 'DXB' },
    { from: 'los-angeles',to: 'tokyo',     fromCode: 'LAX', toCode: 'NRT' },
    { from: 'london',     to: 'singapore', fromCode: 'LHR', toCode: 'SIN' },
    { from: 'new-york',   to: 'mumbai',    fromCode: 'JFK', toCode: 'BOM' },
    { from: 'dubai',      to: 'bangkok',   fromCode: 'DXB', toCode: 'BKK' },
    { from: 'new-york',   to: 'paris',     fromCode: 'JFK', toCode: 'CDG' },
    { from: 'london',     to: 'dubai',     fromCode: 'LHR', toCode: 'DXB' },
  ].map((route) => ({
    url:             `${baseUrl}/flights/${route.from}-to-${route.to}`,
    lastModified:    new Date(),
    changeFrequency: 'daily',
    priority:        0.85,
  }));

  return [...staticPages, ...popularRoutes];
}