/** @type {import('next').NextConfig} */
const nextConfig = {
  compress: true,
  typescript: {
    ignoreBuildErrors: true,
  },
  allowedDevOrigins: [
    "http://localhost:3000",
    "http://192.168.29.226:3000",
  ],
  images: {
    formats: ['image/webp'],
    deviceSizes: [640, 750, 828, 1080, 1200, 1920],
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'cdn.sanity.io',
      },
    ],
  },
  async headers() {
    return [
      {
        source: '/:path*',
        headers: [
          { key: 'X-Frame-Options', value: 'DENY' },
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          { key: 'X-XSS-Protection', value: '1; mode=block' },
        ],
      },
    ];
  },
};

// ✅ ESM export syntax
export default nextConfig;
// module.exports = nextConfig;