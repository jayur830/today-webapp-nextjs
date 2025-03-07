'use client';

import CalendarMonth from '@mui/icons-material/CalendarMonth';
import Checkroom from '@mui/icons-material/Checkroom';
import BottomNavigation from '@mui/material/BottomNavigation';
import BottomNavigationAction from '@mui/material/BottomNavigationAction';
import { usePathname } from 'next/navigation';

const navigations = [
  {
    href: '/calendar',
    label: '캘린더',
    icon: <CalendarMonth />,
  },
  {
    href: '/clothes',
    label: '옷장',
    icon: <Checkroom />,
  },
];

export default function BottomNavigationBar() {
  const pathname = usePathname();

  return (
    <BottomNavigation
      showLabels
      value={navigations.findIndex(({ href }) => href === pathname)}
      sx={{
        position: 'fixed',
        bottom: 0,
        display: {
          xs: 'flex',
          md: 'none',
        },
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
      {navigations.map((props, i) => (
        <BottomNavigationAction key={i} {...props} />
      ))}
    </BottomNavigation>
  );
}
