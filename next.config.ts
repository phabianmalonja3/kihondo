/** @type {import('next').NextConfig} */
const nextConfig = {
  reactStrictMode: true,
  poweredByHeader: false,

  // Logging (optional)
  logging: {
    fetches: {
      fullUrl: true,
    },
  },

  images: {
    // Allow images served through your domain via NGINX
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'mikumisafari.co.tz',
        port: '', // leave blank for default HTTPS port 443
        pathname: '/storage/**',
      },
    ],
  },
};

export default nextConfig;
