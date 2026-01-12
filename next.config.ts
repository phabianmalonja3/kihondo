/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
  async rewrites() {
    return [
      {
        // For API calls
        source: '/api-proxy/:path*',
        destination: 'http://188.245.179.190:8000/api/:path*',
      },
      {
        // For Images/Storage
        source: '/storage-proxy/:path*',
        destination: 'http://188.245.179.190:8000/storage/:path*',
      },
    ]
  },

  experimental: {
    allowedDevOrigins: ["http://localhost:3000", "http://127.0.0.1:3000"],
  },
  
  images: {
    remotePatterns: [
      {
        // Keep this, but you'll likely use relative paths now
        protocol: 'http',
        hostname: '188.245.179.190',
        port: '8000',
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;