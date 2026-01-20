/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      // Frontend images (optional if stored on frontend)
      {
        protocol: 'https',
        hostname: 'mikumisafari.co.tz',
        pathname: '/storage/**',
      },
      // Backend API images
      {
        protocol: 'https', // SSL for api
        hostname: 'api.mikumisafari.co.tz',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
