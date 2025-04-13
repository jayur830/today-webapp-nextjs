import '@/styles/globals.css';

import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Metadata, Viewport } from 'next';
import type { PropsWithChildren } from 'react';

import { fonts } from '@/assets/fonts';
import ToastContainer from '@/components/ToastContainer';
import DatePickerProvider from '@/contexts/DatePickerProvider';
import { theme } from '@/styles/theme';

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 1,
  viewportFit: 'cover',
  userScalable: false,
};

export const metadata: Metadata = {
  title: '오늘 뭐 입지?',
  description:
    '내 옷장에 있는 옷들을 등록하고 관리하며, 원하는 기간 동안 매일 어떤 옷을 입을지 다양한 착장 조합을 자동으로 생성해주는 서비스입니다. 더 이상 매일 아침 옷 고민으로 시간을 낭비하지 마세요.',
};

export default function RootLayout({ children }: Readonly<PropsWithChildren>) {
  return (
    <html lang="ko">
      <body className={fonts.className}>
        <AppRouterCacheProvider>
          <ThemeProvider theme={theme}>
            <DatePickerProvider>
              {children}
              <ToastContainer />
            </DatePickerProvider>
          </ThemeProvider>
        </AppRouterCacheProvider>
      </body>
    </html>
  );
}
