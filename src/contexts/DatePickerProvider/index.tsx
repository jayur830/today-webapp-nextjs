'use client';

import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs/AdapterDayjs';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider/LocalizationProvider';
import type { PropsWithChildren } from 'react';

export default function DatePickerProvider({ children }: PropsWithChildren) {
  return (
    <LocalizationProvider adapterLocale="ko" dateAdapter={AdapterDayjs}>
      {children}
    </LocalizationProvider>
  );
}
