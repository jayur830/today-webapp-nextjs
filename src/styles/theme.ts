'use client';

import { bottomNavigationActionClasses } from '@mui/material';
import { blueGrey, deepOrange, grey, indigo, lightGreen, lime, red } from '@mui/material/colors';
import createPalette from '@mui/material/styles/createPalette';
import createTheme from '@mui/material/styles/createTheme';
import createTypography from '@mui/material/styles/createTypography';

import { fonts } from '@/assets/fonts';

export const palette = createPalette({
  common: {
    white: '#FFFFFF',
    black: '#000000',
  },
  primary: {
    main: deepOrange[600],
    light: deepOrange[500],
    dark: deepOrange[800],
  },
  secondary: {
    main: lightGreen[600],
    light: lightGreen[400],
    dark: lightGreen[800],
  },
  grey,
  success: {
    main: indigo[600],
    light: indigo[400],
    dark: indigo[800],
  },
  info: {
    main: blueGrey[600],
    light: blueGrey[400],
    dark: blueGrey[800],
  },
  warning: {
    main: lime[600],
    light: lime[500],
    dark: lime[800],
  },
  error: {
    main: red[600],
    light: red[400],
    dark: red[900],
  },
  text: {
    primary: '#1D1E1F',
    secondary: grey['900'],
    disabled: grey['A700'],
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
  h2: {
    fontSize: 28,
  },
  h3: {
    fontSize: 24,
  },
  h4: {
    fontSize: 20,
  },
  h5: {
    fontSize: 18,
  },
  h6: {
    fontSize: 16,
  },
  body1: {
    fontSize: 16,
  },
  body2: {
    fontSize: 16,
  },
  button: {
    fontSize: 16,
  },
  subtitle1: {
    fontSize: 16,
  },
  subtitle2: {
    fontSize: 14,
  },
});

export const theme = createTheme({
  palette,
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
      },
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
        colorDefault: {
          backgroundColor: deepOrange[50],
          ':hover': {
            backgroundColor: deepOrange[100],
          },
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
