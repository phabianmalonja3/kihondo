/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mikumisafari.co.tz',
        pathname: '/storage/**',
      },
      // ADD THIS: Allow the backend IP specifically
      {
        protocol: 'http',
        hostname: '188.245.179.190',
        port: '8000',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;