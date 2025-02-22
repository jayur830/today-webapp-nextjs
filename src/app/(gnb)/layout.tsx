import type { PropsWithChildren } from 'react';

import BottomNavigationBar from '@/components/BottomNavigationBar';

export default async function Layout({ children }: PropsWithChildren) {
  return (
    <>
      {children}
      <BottomNavigationBar />
    </>
  );
}
