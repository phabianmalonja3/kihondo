/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,
  images: {
    remotePatterns: [
      {
        protocol: 'http', // Allowed because your error log shows http
        hostname: 'mikumisafari.co.tz',
        pathname: '/storage/**',
      },
      {
        protocol: 'https', // Future-proofing for when SSL is forced
        hostname: 'mikumisafari.co.tz',
        pathname: '/storage/**',
      },
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