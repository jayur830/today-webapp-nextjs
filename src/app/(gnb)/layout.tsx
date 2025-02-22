import Grid from '@mui/material/Grid2';
import type { PropsWithChildren } from 'react';

import BottomNavigationBar from '@/components/BottomNavigationBar';

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <Grid container width="100%" paddingBottom="60px">
        {children}
      </Grid>
      <BottomNavigationBar />
    </>
  );
}
