/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      
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
