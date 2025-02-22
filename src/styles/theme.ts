'use client';

import createPalette from '@mui/material/styles/createPalette';
import createTheme from '@mui/material/styles/createTheme';
import createTypography from '@mui/material/styles/createTypography';

export const palette = createPalette({});

export const typography = createTypography(palette, {});

export const theme = createTheme();
