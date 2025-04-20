'use client';

import DeleteIcon from '@mui/icons-material/Delete';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import Box from '@mui/material/Box';
import Chip from '@mui/material/Chip';
import { grey } from '@mui/material/colors';
import Grid from '@mui/material/Grid';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { useParams } from 'next/navigation';

import { STORAGE_KEY, STORAGE_KEY_OOTD } from '@/constants';
import type { OotdType, TodayClothingData } from '@/types';

import { sections } from '../../clothes/_resources/constants';
import useLocalStorageState from '../_resources/hooks/useLocalStorageState';

export default function Page() {
  const { date } = useParams<{ date: string }>();

  const [storageData] = useLocalStorageState<TodayClothingData[]>(STORAGE_KEY, []);
  const [ootdList, setOotdList] = useLocalStorageState<OotdType[]>(STORAGE_KEY_OOTD, []);
  const ootd = ootdList.find(({ date: d }) => d === date);

  const onAddOotdItem = (sectionId: string, clothingId: string, color: string) => {
    const newOotdList = ootdList.map((item) => {
      if (item.date === date) {
        return {
          ...item,
          clothingList: item.clothingList.some((clothing) => clothing.sectionId === sectionId && clothing.clothingId === clothingId && clothing.color === color)
            ? item.clothingList
            : [...item.clothingList, { sectionId, clothingId, color }],
        };
      }

      return item;
    });
    setOotdList(newOotdList);
    localStorage.setItem(STORAGE_KEY_OOTD, JSON.stringify(newOotdList));
  };

  const onDeleteOotdItem = (clothingId: string) => {
    const newOotdList = ootdList.map((item) => {
      if (item.date === date) {
        return {
          ...item,
          clothingList: item.clothingList.filter(({ clothingId: id }) => id !== clothingId),
        };
      }

      return item;
    });
    setOotdList(newOotdList);
    localStorage.setItem(STORAGE_KEY_OOTD, JSON.stringify(newOotdList));
  };

  return (
    <Grid container width="100%" height="100%">
      <Grid flex={1} padding={2}>
        <Typography variant="h2" marginBottom={2}>
          의류 목록
        </Typography>
        {sections.map(({ id, title, items }) => (
          <Accordion key={id}>
            <AccordionSummary>
              <Typography variant="h5">{title}</Typography>
            </AccordionSummary>
            <AccordionDetails>
              <Stack spacing={2}>
                {items
                  .filter(({ id: itemId }) => {
                    const data = storageData.filter(({ sectionId, clothingId }) => sectionId === id && clothingId === itemId);
                    return data.length > 0;
                  })
                  .map(({ id: itemId, title }) => (
                    <Box key={itemId}>
                      <Typography variant="h6" marginBottom={1}>
                        {title}
                      </Typography>
                      <Stack direction="row" flexWrap="wrap" gap={1}>
                        {storageData
                          .filter(({ sectionId, clothingId }) => sectionId === id && clothingId === itemId)
                          .map(({ sectionId, clothingId, color }) => (
                            <Chip
                              component="button"
                              key={`${sectionId}-${clothingId}-${color}`}
                              label={color}
                              onClick={() => {
                                onAddOotdItem(sectionId, clothingId, color);
                              }}
                              sx={{
                                bgcolor: color,
                                color: 'common.white',
                                transition: 'all 0.3s ease',
                                ':hover': {
                                  bgcolor: color,
                                  filter: 'brightness(1.2)',
                                  cursor: 'pointer',
                                },
                              }}
                            />
                          ))}
                      </Stack>
                    </Box>
                  ))}
              </Stack>
            </AccordionDetails>
          </Accordion>
        ))}
      </Grid>
      <Grid flex={1} padding={2}>
        <Typography variant="h2" marginBottom={2}>
          오늘의 옷
        </Typography>
        <Stack
          direction="row"
          flexWrap="wrap"
          flex={1}
          gap={2}
          minHeight={100}
          borderColor={grey[400]}
          borderRadius={2}
          padding={2}
          sx={{
            borderWidth: 1,
            borderStyle: 'solid',
          }}
        >
          {ootd?.clothingList.map(({ sectionId, clothingId, color }) => (
            <Chip
              component="button"
              key={`${sectionId}-${clothingId}-${color}`}
              label={sections.find(({ id }) => id === sectionId)?.items.find(({ id: itemId }) => itemId === clothingId)?.title}
              onDelete={() => {
                onDeleteOotdItem(clothingId);
              }}
              deleteIcon={<DeleteIcon sx={{ fill: 'white' }} />}
              onClick={() => {
                onDeleteOotdItem(clothingId);
              }}
              sx={{
                bgcolor: color,
                color: 'common.white',
                ':hover': {
                  bgcolor: color,
                  filter: 'brightness(1.2)',
                  cursor: 'pointer',
                },
              }}
            />
          ))}
        </Stack>
      </Grid>
    </Grid>
  );
}
