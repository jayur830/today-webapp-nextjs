import Grid from '@mui/material/Grid';
import type { PropsWithChildren } from 'react';

import BottomNavigationBar from '@/components/BottomNavigationBar';
import SideMenu from '@/components/SideMenu';

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <>
      <SideMenu />
      <Grid
        component="main"
        container
        flexGrow={1}
        width={{
          xs: '100%',
          md: 'calc(100% - 240px)',
        }}
        marginLeft={{
          xs: 0,
          md: 30,
        }}
        paddingBottom="calc(100px + env(safe-area-inset-bottom))"
      >
        {children}
      </Grid>
      <BottomNavigationBar />
    </>
  );
}
