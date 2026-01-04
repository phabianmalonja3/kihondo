/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
  experimental: {
    allowedDevOrigins: ['127.0.0.1:3000', 'localhost:3000']
  },
  
  
  images: {
    remotePatterns: [
      {
        protocol: 'http',
        hostname: '188.245.179.190',
        port: '8000',
        pathname: '/storage/**', // Allows all paths from this host
      },
    ],
  },
};

export default nextConfig;


