'use client';

import { bottomNavigationActionClasses } from '@mui/material';
import createPalette from '@mui/material/styles/createPalette';
import createTheme from '@mui/material/styles/createTheme';
import createTypography from '@mui/material/styles/createTypography';

import { fonts } from '@/assets/fonts';

export const palette = createPalette({
  common: {
    white: '#FFFFFF',
    black: '#000000',
  },
});

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
    MuiButton: {
      styleOverrides: {
        root: {
          boxShadow: 'none',
          ':hover': {
            boxShadow: 'none',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        label: {
          lineHeight: 1,
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        label: {
          [`&.${bottomNavigationActionClasses.selected}`]: {
            fontSize: '0.75rem',
          },
        },
      },
    },
  },
  typography,
});
