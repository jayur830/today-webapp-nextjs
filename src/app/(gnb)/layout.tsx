import CalendarMonth from '@mui/icons-material/CalendarMonth';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import Link from 'next/link';
import type { PropsWithChildren } from 'react';

export default function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <BottomNavigation
        showLabels
        sx={{
          position: 'fixed',
          bottom: 0,
          width: '100%',
          height: 60,
          boxShadow: '0 -5px 15px 0 rgba(0, 0, 0, 0.2)',
          '.MuiBottomNavigationAction-root': {
            flex: 1,
            minWidth: 0,
            maxWidth: '100%',
            gap: 1,
          },
        }}
      >
        <BottomNavigationAction LinkComponent={Link} href="/calendar" label="캘린더" icon={<CalendarMonth />} />
      </BottomNavigation>
    </>
  );
}
