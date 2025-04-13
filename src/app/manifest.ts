import type { MetadataRoute } from 'next';

export default function manifest(): MetadataRoute.Manifest {
  return {
    short_name: '오늘 뭐 입지?',
    name: '오늘 뭐 입지?',
    icons: [
      {
        src: './favicon.ico',
        sizes: '64x64 32x32 24x24 16x16',
        type: 'image/x-icon',
      },
      {
        src: './favicon.ico',
        sizes: '192x192',
        type: 'image/png',
      },
    ],
    start_url: '.',
    display: 'standalone',
    theme_color: '#FFFFFF',
    background_color: '#FFFFFF',
  };
}
