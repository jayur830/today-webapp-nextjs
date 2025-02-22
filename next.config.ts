import type { NextConfig } from 'next';

const nextConfig: NextConfig = {
  /* config options here */
  output: 'standalone',
  experimental: {
    optimizePackageImports: [
      '@mui/material',
      '@mui/icons-material',
    ],
  },
  async redirects() {
    return [
      {
        source: '/',
        destination: '/calendar',
        permanent: false,
      },
    ];
  },
};

export default nextConfig;
