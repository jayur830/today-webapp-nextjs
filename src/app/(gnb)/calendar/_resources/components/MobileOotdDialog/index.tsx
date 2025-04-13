'use client';

import ZoomOutMap from '@mui/icons-material/ZoomOutMap';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { grey } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import { useState } from 'react';

import { sections } from '@/app/(gnb)/clothes/_resources/constants';
import type { TodayClothingData } from '@/types';

export interface MobileOotdDialogProps {
  ootdList: TodayClothingData[];
}

export default function MobileOotdDialog({ ootdList }: MobileOotdDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <IconButton
        onClick={() => {
          setOpen(true);
        }}
      >
        <ZoomOutMap />
      </IconButton>
      <Dialog
        open={open}
        onClose={() => {
          setOpen(false);
        }}
        slotProps={{
          paper: {
            sx: {
              padding: 2,
              animation: open ? 'fadeIn 0.3s ease-in-out' : 'fadeOut 0.3s ease-in-out',
            },
          },
        }}
      >
        <Typography variant="h6" fontWeight={700}>
          오늘의 착장
        </Typography>
        <Stack direction="row" flexWrap="wrap" gap={1} marginTop={2}>
          {ootdList.map((clothing) => (
            <Chip
              key={`${clothing.sectionId}-${clothing.clothingId}`}
              label={
                <Stack direction="row" alignItems="center" gap={1}>
                  {(sections.find(({ id }) => clothing.sectionId === id)?.items || []).find(({ id }) => id === clothing.clothingId)?.title || ''}
                  <Box bgcolor={clothing.color} width={16} border={`1px solid ${grey['400']}`} borderRadius={1} sx={{ aspectRatio: 1 }} />
                </Stack>
              }
            />
          ))}
        </Stack>
      </Dialog>
    </>
  );
}
