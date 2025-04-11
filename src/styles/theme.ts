'use client';

import { bottomNavigationActionClasses } from '@mui/material/BottomNavigationAction';
import { blueGrey, deepOrange, grey, indigo, lightGreen, lime, red } from '@mui/material/colors';
import { createTheme } from '@mui/material/styles';
import Link from 'next/link';

import { fonts } from '@/assets/fonts';

export const theme = createTheme({
  palette: {
    common: {
      white: '#FFFFFF',
      black: '#000000',
    },
    primary: {
      main: deepOrange[500],
      light: deepOrange[300],
      dark: deepOrange[700],
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: lightGreen[500],
      light: lightGreen[300],
      dark: lightGreen[700],
      contrastText: '#FFFFFF',
    },
    grey,
    success: {
      main: indigo[500],
      light: indigo[300],
      dark: indigo[700],
      contrastText: '#FFFFFF',
    },
    info: {
      main: blueGrey[500],
      light: blueGrey[300],
      dark: blueGrey[700],
      contrastText: '#FFFFFF',
    },
    warning: {
      main: lime[500],
      light: lime[300],
      dark: lime[700],
      contrastText: '#000000',
    },
    error: {
      main: red[500],
      light: red[300],
      dark: red[700],
      contrastText: '#FFFFFF',
    },
    text: {
      primary: '#1A1A1A',
      secondary: grey[800],
      disabled: grey[400],
    },
    background: {
      default: '#F8F9FA',
      paper: '#FFFFFF',
    },
  },
  shape: {
    borderRadius: 8,
  },
  components: {
    MuiButton: {
      defaultProps: {
        variant: 'contained',
        LinkComponent: Link,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          padding: '8px 16px',
          boxShadow: 'none',
          textTransform: 'none',
          background: 'linear-gradient(45deg, #FF5722 30%, #FF7043 90%)',
          ':hover': {
            boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
            background: 'linear-gradient(45deg, #FF7043 30%, #FF5722 90%)',
          },
        },
        contained: {
          '&:hover': {
            boxShadow: '0 4px 8px rgba(0,0,0,0.15)',
          },
        },
      },
    },
    MuiSelect: {
      styleOverrides: {
        root: {
          '&:hover': {
            '& .MuiOutlinedInput-notchedOutline': {
              borderColor: deepOrange[300],
            },
          },
        },
      },
    },
    MuiMenu: {
      styleOverrides: {
        paper: {
          background: 'linear-gradient(-45deg, #FFF3E0 0%, #FFFFFF 100%)',
          boxShadow: '0 4px 20px rgba(0,0,0,0.08)',
        },
        list: {
          padding: '8px 0',
          background: 'transparent',
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          position: 'relative',
          overflow: 'hidden',
          transition: 'all 0.2s ease',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            background: 'linear-gradient(-90deg, rgba(255, 87, 34, 0.08) 0%, rgba(255, 112, 67, 0.08) 100%)',
            opacity: 0,
            transition: 'opacity 0.2s ease',
          },
          '&:hover': {
            backgroundColor: 'transparent',
            '&:before': {
              opacity: 1,
            },
          },
          '&.Mui-selected': {
            backgroundColor: 'transparent',
            '&:before': {
              opacity: 1,
              background: 'linear-gradient(-90deg, rgba(255, 87, 34, 0.15) 0%, rgba(255, 112, 67, 0.15) 100%)',
            },
            '&:hover': {
              backgroundColor: 'transparent',
              '&:before': {
                background: 'linear-gradient(-90deg, rgba(255, 87, 34, 0.2) 0%, rgba(255, 112, 67, 0.2) 100%)',
              },
            },
          },
        },
      },
    },
    MuiListItemButton: {
      defaultProps: {
        LinkComponent: Link,
      },
      styleOverrides: {
        root: {
          borderRadius: 8,
          '&:hover': {
            background: 'linear-gradient(45deg, rgba(255, 87, 34, 0.08) 30%, rgba(255, 112, 67, 0.08) 90%)',
          },
        },
      },
    },
    MuiChip: {
      styleOverrides: {
        root: {
          borderRadius: 6,
          height: 32,
        },
        label: {
          lineHeight: 1,
          padding: '0 12px',
        },
        colorDefault: {
          background: 'linear-gradient(45deg, rgba(255, 87, 34, 0.12) 30%, rgba(255, 112, 67, 0.12) 90%)',
          color: deepOrange[700],
          '&:hover': {
            background: 'linear-gradient(45deg, rgba(255, 87, 34, 0.16) 30%, rgba(255, 112, 67, 0.16) 90%)',
          },
        },
      },
    },
    MuiBottomNavigation: {
      styleOverrides: {
        root: {
          height: 'calc(67px + env(safe-area-inset-bottom))',
          paddingBottom: 'calc(env(safe-area-inset-bottom))',
        },
      },
    },
    MuiBottomNavigationAction: {
      styleOverrides: {
        root: {
          padding: '8px 0',
        },
        label: {
          fontSize: '0.75rem',
          [`&.${bottomNavigationActionClasses.selected}`]: {
            fontSize: '0.75rem',
            fontWeight: 600,
            color: deepOrange[500],
          },
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          boxShadow: '0 2px 8px rgba(0,0,0,0.08)',
        },
      },
    },
    MuiCard: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #FFFFFF 30%, #F8F9FA 90%)',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          background: 'linear-gradient(45deg, #FF5722 30%, #FF7043 90%)',
        },
      },
    },
    MuiDialog: {
      defaultProps: {
        slotProps: {
          paper({ open }) {
            return {
              animation: open ? 'fadeIn 0.3s ease-in-out' : 'fadeOut 0.3s ease-in-out',
            };
          },
        },
      },
      styleOverrides: {
        paper: {
          '@keyframes fadeIn': {
            from: {
              transform: 'scale(0.9)',
              opacity: 0,
            },
            to: {
              transform: 'scale(1)',
              opacity: 1,
            },
          },
          '@keyframes fadeOut': {
            from: {
              transform: 'scale(1)',
              opacity: 1,
            },
            to: {
              transform: 'scale(0.7)',
              opacity: 0,
            },
          },
        },
      },
    },
    MuiSwitch: {
      styleOverrides: {
        root: {
          width: 44,
          height: 24,
          padding: 0,
          '& .MuiSwitch-switchBase': {
            padding: 0,
            margin: 2,
            transitionDuration: '300ms',
            '&.Mui-checked': {
              transform: 'translateX(20px)',
              color: '#fff',
              '& + .MuiSwitch-track': {
                background: 'linear-gradient(45deg, #FF5722 30%, #FF7043 90%)',
                opacity: 1,
                border: 0,
              },
            },
          },
          '& .MuiSwitch-thumb': {
            boxSizing: 'border-box',
            width: 20,
            height: 20,
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            backgroundColor: '#fff',
            '&:before': {
              content: '""',
              position: 'absolute',
              width: '100%',
              height: '100%',
              left: 0,
              top: 0,
              background: 'linear-gradient(45deg, rgba(255, 87, 34, 0.1) 30%, rgba(255, 112, 67, 0.1) 90%)',
              borderRadius: '50%',
            },
          },
          '& .MuiSwitch-track': {
            borderRadius: 12,
            backgroundColor: '#e0e0e0',
            opacity: 1,
            transition: 'background-color 0.3s ease',
          },
        },
      },
    },
    MuiSlider: {
      styleOverrides: {
        root: {
          height: 5,
          '& .MuiSlider-track': {
            height: 5,
            borderRadius: 99,
            background: 'linear-gradient(90deg, #FF5722 0%, #FF7043 50%, #FF8A65 100%)',
            border: 'none',
          },
          '& .MuiSlider-rail': {
            height: 5,
            borderRadius: 99,
            backgroundColor: '#e0e0e0',
            border: 'none',
          },
          '& .MuiSlider-thumb': {
            width: 24,
            height: 24,
            backgroundColor: '#fff',
            border: '1px solid #e0e0e0',
            boxShadow: '0 1px 2px rgba(0,0,0,0.1)',
            '&:hover, &.Mui-focusVisible': {
              boxShadow: '0 2px 4px rgba(0,0,0,0.15)',
              backgroundColor: '#fff',
            },
            '&.Mui-active': {
              boxShadow: '0 2px 4px rgba(0,0,0,0.2)',
            },
          },
          '& .MuiSlider-valueLabel': {
            background: 'linear-gradient(90deg, #FF5722 0%, #FF7043 50%, #FF8A65 100%)',
            color: '#fff',
            '&:before': {
              display: 'none',
            },
            '& *': {
              background: 'transparent',
              color: '#fff',
            },
          },
        },
      },
    },
  },
  typography: {
    fontFamily: fonts.style.fontFamily,
    allVariants: {
      letterSpacing: -0.5,
      lineHeight: 1.5,
    },
    h1: {
      fontSize: 40,
      fontWeight: 700,
    },
    h2: {
      fontSize: 32,
      fontWeight: 700,
    },
    h3: {
      fontSize: 28,
      fontWeight: 600,
    },
    h4: {
      fontSize: 24,
      fontWeight: 600,
    },
    h5: {
      fontSize: 20,
      fontWeight: 600,
    },
    h6: {
      fontSize: 18,
      fontWeight: 600,
    },
    body1: {
      fontSize: 16,
      fontWeight: 400,
    },
    body2: {
      fontSize: 14,
      fontWeight: 400,
    },
    button: {
      fontSize: 14,
      fontWeight: 600,
      textTransform: 'none',
    },
    subtitle1: {
      fontSize: 16,
      fontWeight: 500,
    },
    subtitle2: {
      fontSize: 14,
      fontWeight: 500,
    },
  },
});
