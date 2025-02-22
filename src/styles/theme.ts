'use client';

import createPalette from '@mui/material/styles/createPalette';
import createTheme from '@mui/material/styles/createTheme';
import createTypography from '@mui/material/styles/createTypography';

import { fonts } from '@/assets/fonts';

export const palette = createPalette({});

export const typography = createTypography(palette, {
  allVariants: {
    fontFamily: fonts.style.fontFamily,
    letterSpacing: -0.5,
  },
});

export const theme = createTheme({
  palette,
  components: {
    MuiTypography: {
      styleOverrides: {
        root: {
          // fontFamily: fonts.style.fontFamily,
        },
      },
    },
  },
  typography,
});
