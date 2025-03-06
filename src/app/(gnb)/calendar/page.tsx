'use client';

import 'dayjs/locale/ko';

import Cached from '@mui/icons-material/Cached';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import grey from '@mui/material/colors/grey';
import Grid from '@mui/material/Grid2';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker/MobileDatePicker';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import type { PropsWithChildren } from 'react';
import { useState } from 'react';

import { isServer, STORAGE_KEY, STORAGE_KEY_OOTD } from '@/constants';
import type { OotdType, TodayClothingData } from '@/types';

import { sections } from '../clothes/_resources/constants';
import DatePicker from './_resources/components/DatePicker';
import useCalendar from './_resources/hooks/useCalendar';
import { getOOTD, mergeOOTD } from './_resources/utils';

function DateCell({ children }: PropsWithChildren) {
  return (
    <Box
      minHeight={100}
      borderRight={`1px solid ${grey['400']}`}
      borderBottom={`1px solid ${grey['400']}`}
      padding={{
        xs: '15%',
        md: 2,
      }}
    >
      {children}
    </Box>
  );
}

export default function Page() {
  const [
    startDate,
    setStartDate,
  ] = useState<Dayjs>(dayjs());
  const [
    endDate,
    setEndDate,
  ] = useState<Dayjs>(dayjs());
  const [
    ootdList,
    setOotdList,
  ] = useState<{
    date: string;
    clothingList: TodayClothingData[];
  }[]>(JSON.parse(localStorage.getItem(STORAGE_KEY_OOTD) || '[]'));

  const { date, calendar, onChange, onPrev, onNext } = useCalendar();

  const storageData: TodayClothingData[] = JSON.parse(isServer ? '[]' : localStorage.getItem(STORAGE_KEY) || '[]');
  const data = storageData.reduce((result, { sectionId, ...rest }) => (sectionId in result
    ? {
        ...result,
        [sectionId]: [
          ...result[sectionId],
          {
            sectionId,
            ...rest,
          },
        ],
      }
    : {
        ...result,
        [sectionId]: [
          {
            sectionId,
            ...rest,
          },
        ],
      }), {} as { [sectionId: string]: TodayClothingData[] });

  const ootdMap = ootdList.reduce((result, { date, clothingList }) => ({
    ...result,
    [date]: clothingList,
  }), {} as Record<string, TodayClothingData[]>);

  return (
    <Stack alignItems="center" gap={2} width="100%" padding={2}>
      <DatePicker
        date={date}
        onChange={onChange}
        onPrev={onPrev}
        onNext={onNext}
      />
      <Grid display="grid" gridTemplateColumns="repeat(7, 1fr)" width="100%" maxWidth={1024} borderTop={`1px solid ${grey['400']}`} borderLeft={`1px solid ${grey['400']}`}>
        {calendar.map((d, i) => {
          if (d.isSame(date, 'month')) {
            return (
              <DateCell key={i}>
                {dayjs().isSame(d, 'day')
                  ? (
                      <Box
                        position="relative"
                        top={-4}
                        left={-6}
                        display="flex"
                        justifyContent="center"
                        alignItems="center"
                        bgcolor="primary.main"
                        width={30}
                        height={30}
                        borderRadius={99}
                        sx={{ aspectRatio: 1 }}
                      >
                        <Typography color="common.white">{d.format('D')}</Typography>
                      </Box>
                    )
                  : (
                      <Typography>{d.format('D')}</Typography>
                    )}
                {d.format('YYYY-MM-DD') in ootdMap && (
                  <Stack direction="row" flexWrap="wrap" gap={1}>
                    {ootdMap[d.format('YYYY-MM-DD')].map((clothing, j) => (
                      <Chip
                        key={j}
                        label={(
                          <Stack direction="row" alignItems="center" gap={1}>
                            {(sections.find(({ id }) => clothing.sectionId === id)?.items || []).find(({ id }) => id === clothing.clothingId)?.title || ''}
                            <Box bgcolor={clothing.color} width={16} border={`1px solid ${grey['400']}`} borderRadius={1} sx={{ aspectRatio: 1 }} />
                          </Stack>
                        )}
                      />
                    ))}
                  </Stack>
                )}
              </DateCell>
            );
          }

          return (
            <DateCell key={i}>
              {dayjs().isSame(d, 'day')
                ? (
                    <Box
                      position="relative"
                      top={-4}
                      left={-6}
                      display="flex"
                      justifyContent="center"
                      alignItems="center"
                      bgcolor={grey['500']}
                      width={30}
                      height={30}
                      borderRadius={99}
                      sx={{ aspectRatio: 1 }}
                    >
                      <Typography color="common.white">{d.format('D')}</Typography>
                    </Box>
                  )
                : (
                    <Typography color="textDisabled">{d.format('D')}</Typography>
                  )}
              {d.format('YYYY-MM-DD') in ootdMap && (
                <Stack direction="row" flexWrap="wrap" gap={1} sx={{ opacity: 0.5 }}>
                  {ootdMap[d.format('YYYY-MM-DD')].map((clothing, j) => (
                    <Chip
                      key={j}
                      label={(
                        <Stack direction="row" alignItems="center" gap={1}>
                          {(sections.find(({ id }) => clothing.sectionId === id)?.items || []).find(({ id }) => id === clothing.clothingId)?.title || ''}
                          <Box bgcolor={clothing.color} width={16} border={`1px solid ${grey['400']}`} borderRadius={1} sx={{ aspectRatio: 1 }} />
                        </Stack>
                      )}
                    />
                  ))}
                </Stack>
              )}
            </DateCell>
          );
        })}
      </Grid>
      <Stack direction="column" alignItems="center" gap={1} width="100%">
        <Box display="flex" alignItems="center" gap={1} width="100%">
          <Typography variant="h5" fontWeight={700} width={70}>START</Typography>
          <MobileDatePicker
            format="YYYY-MM-DD"
            closeOnSelect
            value={startDate}
            onChange={(value) => {
              if (value) {
                setStartDate(value);
                if (value.isAfter(endDate)) {
                  setEndDate(value);
                }
              }
            }}
            slotProps={{
              toolbar: {
                hidden: true,
              },
              actionBar: {
                hidden: true,
              },
              textField: {
                fullWidth: true,
                size: 'small',
                sx: {
                  flex: 1,
                },
              },
            }}
          />
        </Box>
        <Box display="flex" alignItems="center" gap={1} width="100%">
          <Typography variant="h5" fontWeight={700} width={70}>END</Typography>
          <MobileDatePicker
            format="YYYY-MM-DD"
            closeOnSelect
            minDate={startDate}
            value={endDate}
            onChange={(value) => {
              if (value) {
                setEndDate(value);
              }
            }}
            slotProps={{
              toolbar: {
                hidden: true,
              },
              actionBar: {
                hidden: true,
              },
              textField: {
                fullWidth: true,
                size: 'small',
                sx: {
                  flex: 1,
                },
              },
            }}
          />
        </Box>
        <Button
          fullWidth
          variant="contained"
          endIcon={<Cached />}
          onClick={() => {
            const oldList: OotdType[] = JSON.parse(localStorage.getItem(STORAGE_KEY_OOTD) || '[]');
            const newList = getOOTD(data, startDate, endDate);
            const mergedList = mergeOOTD(oldList, newList);
            console.log(mergedList);

            localStorage.setItem(STORAGE_KEY_OOTD, JSON.stringify(mergedList));
            setOotdList(mergedList);
          }}
        >
          OOTD 생성
        </Button>
      </Stack>
    </Stack>
  );
}
