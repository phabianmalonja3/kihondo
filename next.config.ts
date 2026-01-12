/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
  // 1. ADD REWRITES SECTION HERE
  async rewrites() {
    return [
      {
        source: '/api-proxy/:path*',
        destination: 'http://188.245.179.190:8000/api/:path*',
      },
    ]
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
    ],
  },
};

export default nextConfig;