'use client';

import EditIcon from '@mui/icons-material/Edit';
import ZoomOutMap from '@mui/icons-material/ZoomOutMap';
import { Typography } from '@mui/material';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { grey } from '@mui/material/colors';
import Dialog from '@mui/material/Dialog';
import IconButton from '@mui/material/IconButton';
import Stack from '@mui/material/Stack';
import Link from 'next/link';
import { useState } from 'react';

import { sections } from '@/constants/clothing';
import type { TodayClothingData } from '@/types';

export interface MobileOotdDialogProps {
  date: string;
  ootdList: TodayClothingData[];
}

export default function MobileOotdDialog({ date, ootdList }: MobileOotdDialogProps) {
  const [open, setOpen] = useState(false);

  return (
    <>
      <Box display="flex" flexDirection="column" justifyContent="center" alignItems="center">
        <IconButton
          onClick={() => {
            setOpen(true);
          }}
          sx={{
            alignSelf: 'center',
            width: 40,
            aspectRatio: 1,
          }}
        >
          <ZoomOutMap />
        </IconButton>
        <IconButton
          LinkComponent={Link}
          href={`/calendar/${date}`}
          sx={{
            alignSelf: 'center',
            width: 40,
            aspectRatio: 1,
          }}
        >
          <EditIcon />
        </IconButton>
      </Box>
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
                  <Box bgcolor={clothing.color} data-testid="clothing-color" width={16} border={`1px solid ${grey['400']}`} borderRadius={1} sx={{ aspectRatio: 1 }} />
                </Stack>
              }
            />
          ))}
        </Stack>
      </Dialog>
    </>
  );
}
