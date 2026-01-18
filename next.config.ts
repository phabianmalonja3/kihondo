/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  experimental: {
    allowedDevOrigins: ["http://localhost:3000", "http://127.0.0.1:3000"],
  },
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '188.245.179.190',
        port: '8000',
        pathname: '/storage/**',
      },
      // ADD THIS SECTION FOR LOCALHOST
      {
        protocol: 'http',
        hostname: 'localhost',
        port: '8000',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;