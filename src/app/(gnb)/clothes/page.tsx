'use client';

import { Box, Divider } from '@mui/material';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { grey } from '@mui/material/colors';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useState } from 'react';

import { toast } from '@/components/ToastContainer/toast';
import { STORAGE_KEY } from '@/constants';
import type { TodayClothingData } from '@/types';

import ColorPicker from './_resources/components/ColorPicker';
import { sections } from './_resources/constants';

export default function Page() {
  const [
    data,
    setData,
  ] = useState(() => sections.reduce((result, { id: sectionId, items }) => ({
    ...result,
    [sectionId]: {
      selected: items[0].id,
      color: '#FFFFFF',
    },
  }), {} as {
    [sectionId in (typeof sections)[number]['id']]: {
      selected: (typeof sections)[number]['items'][number]['id'];
      color: `#${string}`;
    };
  }));
  const [
    savedData,
    setSavedData,
  ] = useState<TodayClothingData[]>(JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]'));

  return (
    <Stack divider={<Divider />} gap={5} width="100%" padding={2}>
      {sections.map(({ id: sectionId, title, items }, i) => (
        <Grid key={i}>
          <Typography variant="h1" fontWeight={700}>
            {title}
          </Typography>
          <Stack direction="row" flexWrap="wrap" gap={2} marginTop={2} marginBottom={3}>
            {items.map(({ id, title }, j) => (
              <Chip
                key={j}
                label={title}
                color={data[sectionId as keyof typeof data].selected === id ? 'primary' : 'default'}
                onClick={() => {
                  setData((state) => ({
                    ...state,
                    [sectionId]: {
                      ...state[sectionId as keyof typeof state],
                      selected: id,
                    },
                  }));
                }}
              />
            ))}
          </Stack>
          <ColorPicker
            value={data[sectionId].color || '#FFFFFF'}
            onChange={(color) => {
              setData((state) => ({
                ...state,
                [sectionId]: {
                  ...state[sectionId as keyof typeof state],
                  color,
                },
              }));
            }}
          />
          <Button
            fullWidth
            variant="contained"
            onClick={() => {
              const storage = localStorage.getItem(STORAGE_KEY);
              const addedData = [
                ...(storage ? JSON.parse(storage) : []),
                {
                  sectionId,
                  clothingId: data[sectionId].selected,
                  color: data[sectionId].color,
                },
              ];
              setSavedData(addedData);
              localStorage.setItem(STORAGE_KEY, JSON.stringify(addedData));
              toast.info('의류가 추가되었습니다.');
            }}
            sx={{
              marginTop: 2,
            }}
          >
            추가
          </Button>
          <Typography variant="h4" fontWeight={700} marginY={2}>목록</Typography>
          <Stack
            direction="row"
            flexWrap="wrap"
            gap={2}
            borderColor={grey[400]}
            borderRadius={2}
            padding={2}
            sx={{
              borderWidth: 1,
              borderStyle: 'solid',
            }}
          >
            {savedData.filter(({ sectionId: targetSectionId }) => sectionId === targetSectionId)
              .map(({ sectionId, clothingId, color }, i) => (
                <Chip
                  key={i}
                  label={(
                    <Stack direction="row" alignItems="center" gap={1}>
                      {(sections.find(({ id }) => sectionId === id)?.items || []).find(({ id }) => id === clothingId)?.title || ''}
                      <Box bgcolor={color} width={16} border={`1px solid ${grey['400']}`} borderRadius={1} sx={{ aspectRatio: 1 }} />
                    </Stack>
                  )}
                  onDelete={() => {
                    const filteredData = savedData.filter((item) => {
                      return sectionId !== item.sectionId || clothingId !== item.clothingId;
                    });
                    localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredData));
                    setSavedData(filteredData);
                    toast.success('의류가 삭제되었습니다.');
                  }}
                />
              ))}
          </Stack>
        </Grid>
      ))}
    </Stack>
  );
}
