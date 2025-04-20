'use client';

import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import { useRouter } from 'next/navigation';
import type { ComponentProps } from 'react';

export interface BackProps extends ComponentProps<typeof Button> {
  iconButton?: boolean;
}

export default function Back({ onClick, iconButton = false, ...props }: BackProps) {
  const router = useRouter();

  if (iconButton) {
    return (
      <IconButton
        {...props}
        onClick={(e) => {
          router.back();
          onClick?.(e);
        }}
      />
    );
  }

  return (
    <Button
      {...props}
      onClick={(e) => {
        router.back();
        onClick?.(e);
      }}
    />
  );
}
