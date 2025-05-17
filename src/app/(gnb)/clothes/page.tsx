'use client';

import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { grey } from '@mui/material/colors';
import Divider from '@mui/material/Divider';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useLayoutEffect, useState } from 'react';

import { toast } from '@/components/ToastContainer/toast';
import { STORAGE_KEY } from '@/constants';
import { sections } from '@/constants/clothing';
import type { TodayClothingData } from '@/types';

import ColorPicker from './_components/ColorPicker';
import WearingCard, { PreviewPrepare } from './_components/WearingCard';

export default function Page() {
  const [data, setData] = useState(() =>
    sections.reduce(
      (result, { id: sectionId, items }) => ({
        ...result,
        [sectionId]: {
          selected: items[0].id,
          color: '#FFFFFF',
        },
      }),
      {} as {
        [sectionId in (typeof sections)[number]['id']]: {
          selected: (typeof sections)[number]['items'][number]['id'];
          color: `#${string}`;
        };
      },
    ),
  );
  const [savedData, setSavedData] = useState<TodayClothingData[]>([]);

  useLayoutEffect(() => {
    const storage = localStorage.getItem(STORAGE_KEY);
    if (storage) {
      setSavedData(JSON.parse(storage));
    }
  }, []);

  return (
    <Stack divider={<Divider />} gap={5} width="100%" padding={2}>
      {sections.map(({ id: sectionId, title, items }) => (
        <Grid key={sectionId} container direction="column" gap={{ xs: 1, md: 2 }} width="calc(100% - 32px)">
          <Box>
            <Typography variant="h3" fontWeight={700}>
              {title}
            </Typography>
            <Stack direction="row" flexWrap="wrap" gap={2} marginTop={2} marginBottom={3}>
              {items.map(({ id, title }, j) => (
                <Chip
                  key={`${sectionId}-${id}`}
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
          </Box>
          <Box display="flex" flexDirection="column" width="100%">
            <Typography variant="h4" fontWeight={700} marginTop={{ xs: 2, md: 0 }} marginBottom={2}>
              목록
            </Typography>
            <Stack
              direction="row"
              flex={1}
              gap={2}
              minHeight={100}
              borderColor={grey[400]}
              borderRadius={2}
              padding={2}
              overflow="scroll"
              sx={{
                borderWidth: 1,
                borderStyle: 'solid',
              }}
            >
              {savedData
                .filter(({ sectionId: targetSectionId }) => sectionId === targetSectionId)
                .map(({ sectionId, clothingId, color }) => {
                  const value = (sections.find(({ id }) => sectionId === id)?.items || []).find(({ id }) => id === clothingId);
                  const title = value?.title;
                  const Paint = value?.paint;
                  return (
                    <WearingCard
                      key={`${sectionId}-${clothingId}-${color}`}
                      title={title || ''}
                      onDelete={() => {
                        const filteredData = savedData.filter((item) => {
                          return sectionId !== item.sectionId || clothingId !== item.clothingId || color !== item.color;
                        });
                        localStorage.setItem(STORAGE_KEY, JSON.stringify(filteredData));
                        setSavedData(filteredData);
                        toast.success('의류가 삭제되었습니다.');
                      }}
                    >
                      {Paint ? <Paint fill={color} /> : <PreviewPrepare color={color} />}
                    </WearingCard>
                  );
                })}
            </Stack>
          </Box>
        </Grid>
      ))}
    </Stack>
  );
}
