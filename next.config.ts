/** @type {import('next').NextConfig} */
const nextConfig = {
  logging: {
    fetches: {
      fullUrl: true,
    },
  },
  
    allowedDevOrigins: ["*"], // dev only
  
  images: {
  remotePatterns: [
    {
      protocol: "http",
      hostname: "localhost",
      port: "8000",
      pathname: "/storage/**",
    },
    {
      protocol: "http",
      hostname: "127.0.0.1",
      port: "8000",
      pathname: "/storage/**",
    },
  ],
},
};

export default nextConfig;


