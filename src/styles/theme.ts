'use client';

import createPalette from '@mui/material/styles/createPalette';
import createTheme from '@mui/material/styles/createTheme';
import createTypography from '@mui/material/styles/createTypography';

import { fonts } from '@/assets/fonts';

export const palette = createPalette({});

export const typography = createTypography(palette, {
  fontFamily: fonts.style.fontFamily,
  allVariants: {
    letterSpacing: -0.5,
  },
  h1: {
    fontSize: 32,
  },
});

export const theme = createTheme({
  palette,
  components: {
    MuiChip: {
      styleOverrides: {
        label: {
          lineHeight: 1,
        },
      },
    },
  },
  typography,
});
