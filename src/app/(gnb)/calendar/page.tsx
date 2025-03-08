'use client';

import 'dayjs/locale/ko';

import Cached from '@mui/icons-material/Cached';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Chip from '@mui/material/Chip';
import { grey } from '@mui/material/colors';
import Stack from '@mui/material/Stack';
import Typography from '@mui/material/Typography';
import { MobileDatePicker } from '@mui/x-date-pickers/MobileDatePicker/MobileDatePicker';
import type { Dayjs } from 'dayjs';
import dayjs from 'dayjs';
import { useState } from 'react';

import { isServer, STORAGE_KEY, STORAGE_KEY_OOTD } from '@/constants';
import type { OotdType, TodayClothingData } from '@/types';

import { sections } from '../clothes/_resources/constants';
import Calendar from './_resources/components/Calendar';
import DatePicker from './_resources/components/DatePicker';
import useCalendar from './_resources/hooks/useCalendar';
import { getOOTD, groupBySectionId, mergeOOTD } from './_resources/utils';

export default function Page() {
  const [startDate, setStartDate] = useState<Dayjs>(dayjs());
  const [endDate, setEndDate] = useState<Dayjs>(dayjs());
  const [ootdList, setOotdList] = useState<OotdType[]>(() => JSON.parse(isServer ? '[]' : localStorage.getItem(STORAGE_KEY_OOTD) || '[]'));

  const { date, calendar, onChange, onPrev, onNext } = useCalendar();

  const storageData: TodayClothingData[] = JSON.parse(isServer ? '[]' : localStorage.getItem(STORAGE_KEY) || '[]');
  const data = groupBySectionId(storageData);

  const ootdMap = ootdList.reduce(
    (result, { date, clothingList }) => ({
      ...result,
      [date]: clothingList,
    }),
    {} as Record<string, TodayClothingData[]>,
  );

  return (
    <Stack alignItems="center" gap={2} width="100%" padding={2}>
      <DatePicker date={date} onChange={onChange} onPrev={onPrev} onNext={onNext} />
      <Calendar
        calendarList={calendar}
        today={date}
        renderCell={(date) => {
          if (date.format('YYYY-MM-DD') in ootdMap) {
            return (
              <Stack direction="row" flexWrap="wrap" gap={1}>
                {ootdMap[date.format('YYYY-MM-DD')].map((clothing, j) => (
                  <Chip
                    key={j}
                    label={
                      <Stack direction="row" alignItems="center" gap={1}>
                        {(sections.find(({ id }) => clothing.sectionId === id)?.items || []).find(({ id }) => id === clothing.clothingId)?.title || ''}
                        <Box bgcolor={clothing.color} width={16} border={`1px solid ${grey['400']}`} borderRadius={1} sx={{ aspectRatio: 1 }} />
                      </Stack>
                    }
                  />
                ))}
              </Stack>
            );
          }

          return null;
        }}
      />
      <Stack direction="column" alignItems="center" gap={1} width="100%">
        <Box display="flex" alignItems="center" gap={1} width="100%">
          <Typography variant="h5" fontWeight={700} width={70}>
            START
          </Typography>
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
          <Typography variant="h5" fontWeight={700} width={70}>
            END
          </Typography>
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
