import '@/styles/globals.css';

import { ThemeProvider } from '@mui/material/styles';
import { AppRouterCacheProvider } from '@mui/material-nextjs/v15-appRouter';
import type { Metadata } from 'next';
import type { PropsWithChildren } from 'react';

import { fonts } from '@/assets/fonts';
import ToastContainer from '@/components/ToastContainer';
import DatePickerProvider from '@/contexts/DatePickerProvider';
import { theme } from '@/styles/theme';

export const metadata: Metadata = {
  title: 'Create Next App',
  description: 'Generated by create next app',
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
