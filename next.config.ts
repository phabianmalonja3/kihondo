/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
  experimental: {
    // This allows you to access the dev server via 127.0.0.1 without warnings
    allowedDevOrigins: ["http://localhost:3000", "http://127.0.0.1:3000"],
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


