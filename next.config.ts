import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'images.unsplash.com',
        port: '',
        pathname: '/**',
      },
      {
        protocol: 'https',
        hostname: 'via.placeholder.com',
        port: '',
        pathname: '/**',
      },
       
    ],
  },
  eslint: {
       // Ignore ESLint errors during build
       ignoreDuringBuilds: true,
      },
      typescript: {
    // Ignore TypeScript errors during build (optional)
    ignoreBuildErrors: true,
   },
};

export default nextConfig;
