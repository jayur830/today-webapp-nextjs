'use client';

import CalendarMonth from '@mui/icons-material/CalendarMonth';
import Checkroom from '@mui/icons-material/Checkroom';
import { ListItem, ListItemButton, ListItemIcon, ListItemText, svgIconClasses, typographyClasses } from '@mui/material';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
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

export default function SideMenu() {
  const pathname = usePathname();

  return (
    <Drawer
      variant="permanent"
      anchor="left"
      PaperProps={{
        sx: {
          width: 240,
        },
      }}
      sx={{
        display: {
          xs: 'none',
          md: 'flex',
        },
      }}
    >
      <List>
        {navigations.map(({ href, icon, label }, i) => (
          <ListItem key={i}>
            <ListItemButton
              href={href}
              sx={{
                [`.${typographyClasses.root}, .${svgIconClasses.root}`]: {
                  color: href === pathname ? 'primary.main' : 'default',
                },
              }}
            >
              <ListItemIcon>{icon}</ListItemIcon>
              <ListItemText primary={label} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Drawer>
  );
}
