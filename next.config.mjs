/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  images: {
    formats: ['image/avif', 'image/webp'],  // Auto-convert to modern formats

     remotePatterns: [
      { protocol: 'https', hostname: 'images.unsplash.com' },
      { protocol: 'https', hostname: 'i.pravatar.cc' },
    ],
  },
  compiler: {
    removeConsole: process.env.NODE_ENV === 'production',  // No console.log in prod
  },
  poweredByHeader: false,  // Security: hide "X-Powered-By" header
};

export default nextConfig;